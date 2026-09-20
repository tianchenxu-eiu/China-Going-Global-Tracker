import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { feature } from "topojson-client";
import { geoBounds, geoContains } from "d3-geo";

const require = createRequire(import.meta.url);
const raw = JSON.parse(fs.readFileSync(path.resolve("data/raw-projects.json"), "utf8"));
const cities = require("cities.json");
const countries = require("world-countries");
const topology = require("world-atlas/countries-110m.json");
const geo = feature(topology, topology.objects.countries);

const norm = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/gi, " ").trim().toLowerCase();
const alias = {
  "cote d ivoire": "cote d ivoire",
  "republic of the congo": "congo",
  "democratic republic of the congo": "dem rep congo",
  "turkiye": "turkey",
  "united states": "united states of america",
  "south korea": "south korea",
  "north korea": "north korea",
  "russia": "russia",
  "laos": "laos",
  "cabo verde": "cape verde",
  "eswatini": "swaziland",
  "myanmar": "myanmar",
  "timor leste": "timor leste",
  "palestine": "palestine",
  "hong kong": "china",
  "hong kong china": "china",
  "macao": "china"
};

const countryByName = new Map();
for (const c of countries) {
  const names = [c.name?.common, c.name?.official, ...(c.altSpellings || [])];
  for (const name of names) if (name) countryByName.set(norm(name), c);
}
const isoFor = name => countryByName.get(norm(name))?.cca2 || ({ "laos":"LA", "russia":"RU", "south korea":"KR", "north korea":"KP", "cote d ivoire":"CI", "republic of the congo":"CG", "democratic republic of the congo":"CD", "turkiye":"TR", "hong kong":"HK", "hong kong china":"HK", "macao":"MO", "palestine":"PS", "kosovo":"XK" }[norm(name)] || "");

const featuresByName = new Map(geo.features.map(f => [norm(f.properties?.name || ""), f]));
const featureFor = name => featuresByName.get(alias[norm(name)] || norm(name));

const citiesByIso = new Map();
for (const city of cities) {
  const n = norm(city.name);
  if (n.length < 5 || /^(central|airport|station|industrial park|university|factory)$/.test(n)) continue;
  if (!citiesByIso.has(city.country)) citiesByIso.set(city.country, []);
  citiesByIso.get(city.country).push({ ...city, normalized: n });
}
for (const list of citiesByIso.values()) list.sort((a, b) => b.normalized.length - a.normalized.length);

const hash = value => {
  let h = 2166136261;
  for (const c of String(value)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
};
const rngFor = seed => {
  let x = hash(seed) || 1;
  return () => ((x = Math.imul(1664525, x) + 1013904223 >>> 0) / 4294967296);
};

function countryPoint(country, seed) {
  const f = featureFor(country);
  const c = countryByName.get(norm(country));
  const fallback = c?.latlng?.length === 2 ? [Number(c.latlng[1]), Number(c.latlng[0])] : [0, 0];
  if (!f) return fallback;
  const [[minLon, minLat], [maxLon, maxLat]] = geoBounds(f);
  const random = rngFor(seed);
  for (let i = 0; i < 1200; i++) {
    const point = [minLon + random() * (maxLon - minLon), minLat + random() * (maxLat - minLat)];
    if (geoContains(f, point)) return point;
  }
  return fallback;
}

const used = new Map();
let cityMatched = 0;
let countryPlaced = 0;
let hongKongPlaced = 0;
const projects = raw.projects.map(project => {
  const iso = isoFor(project.country);
  const haystack = ` ${norm(`${project.project} ${project.note}`)} `;
  const city = (citiesByIso.get(iso) || []).find(item => haystack.includes(` ${item.normalized} `));
  let lon;
  let lat;
  let locationLabel;
  let locationPrecision;
  if (["hong kong", "hong kong china"].includes(norm(project.country))) {
    const index = hongKongPlaced++;
    const angle = index * 2.399963;
    const radius = index === 0 ? 0 : 0.012 + (index - 1) * 0.003;
    lon = 114.1694 + Math.cos(angle) * radius * 1.3;
    lat = 22.3193 + Math.sin(angle) * radius * 0.7;
    locationLabel = "Hong Kong, Hong Kong";
    locationPrecision = "city";
    cityMatched++;
  } else if (norm(project.country) === "united states" && haystack.includes(" arizona ")) {
    lon = -111.9309;
    lat = 34.0489;
    locationLabel = "Arizona, United States";
    locationPrecision = "region";
    countryPlaced++;
  } else if (city) {
    lon = Number(city.lng); lat = Number(city.lat);
    locationLabel = `${city.name}, ${project.country}`;
    locationPrecision = "city";
    cityMatched++;
  } else {
    [lon, lat] = countryPoint(project.country, `${project.country}-${project.id}`);
    locationLabel = `${project.country} · country-level placement`;
    locationPrecision = "country";
    countryPlaced++;
  }
  const collisionKey = `${lon.toFixed(3)},${lat.toFixed(3)}`;
  const count = used.get(collisionKey) || 0;
  used.set(collisionKey, count + 1);
  if (count) {
    const angle = count * 2.399963;
    const radius = 0.16 * Math.sqrt(count);
    lon += Math.cos(angle) * radius;
    lat += Math.sin(angle) * radius;
  }
  return { ...project, lon: Number(lon.toFixed(5)), lat: Number(lat.toFixed(5)), locationLabel, locationPrecision };
});

const months = projects.map(project => project.month).filter(Boolean).sort();
const output = {
  sourceWorkbook: raw.sourceWorkbook,
  coverage: { start: months[0], end: months.at(-1) },
  coordinateMethod: "GeoNames city-name match against project title and note; deterministic within-country placement otherwise.",
  coordinateQuality: { cityMatched, countryPlaced },
  projects
};
fs.mkdirSync(path.resolve("app/data"), { recursive: true });
fs.writeFileSync(path.resolve("app/data/projects.json"), JSON.stringify(output), "utf8");
console.log(JSON.stringify({ projects: projects.length, cityMatched, countryPlaced, unmatchedCountries: [...new Set(projects.filter(p => !featureFor(p.country)).map(p => p.country))] }, null, 2));
