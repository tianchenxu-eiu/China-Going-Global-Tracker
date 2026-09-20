# Output Schema

The `Projects` sheet must use these columns in exactly this order.

| # | Column | Type and rule |
|---|---|---|
| 1 | Investor/Company Name | Official English name of the qualifying Chinese investor/contractor. Separate multiple Chinese participants with semicolons. |
| 2 | Chinese Company Home Province | Mainland parent company's registered/headquarters province; exact English value from `china-provinces.csv`. Separate multiple values with semicolons in company-name order. Blank if not verifiable. |
| 3 | Announcement Date | Real Excel date displayed `yyyy/mm/dd`. Earliest verifiable qualifying public announcement date. |
| 4 | Expected Completion Date | Real Excel date displayed `yyyy/mm/dd` only when an exact date is supported; otherwise blank. |
| 5 | Destination Country/Territory | Canonical value from `region-country-map.csv`. |
| 6 | Region | Exactly one of the seven allowed values. |
| 7 | Subregion | Exactly one of the allowed values. |
| 8 | Project Name | Concise official English project/transaction name; retain local official name in parentheses when useful. |
| 9 | Primary Investment/Contract Value | Numeric USD amount, no text. Blank if no defensible single amount exists. Format as USD. |
| 10 | Secondary Investment/Contract Value | Compact original-currency amount in `CCC<number>m` format; no spaces, commas, words, or qualifiers. Convert billions to millions. Use `CCC<number>-<number>m` for a range. If two currencies are disclosed, use the original transaction currency only. |
| 11 | Secondary Investment/Contract Value Note | Qualifiers, attribution, amount basis, alternative-currency equivalents, and other explanatory wording. Example: `about CNY 277 million in Phase I total investment`. Blank when no secondary value exists. |
| 12 | Primary Industry | Exact allowed value when classified. |
| 13 | Secondary Industry | Optional second GB/T Level I value for Direct Investment only. Must be blank for Contracted Construction. |
| 14 | Primary Category | `Direct Investment` or `Contracted Construction` for confirmed rows. If unresolved, retain the lead in `Candidates`, not `Exclusion_Log`. |
| 15 | Secondary Category | Direct Investment: `Greenfield Investment`, `Merger & Acquisition`, `Reinvestment`, `Others`. Contracted Construction: `EPC`, `BOT/PPP`, `Others`. |
| 16 | Note | One paragraph, normally 2-4 sentences. Cover location, asset/scope/capacity, Chinese role, counterparty, event stage, value basis, timing, and uncertainty. |
| 17 | Source Webpage URL | One or more complete raw `http://` or `https://` URLs. Decisive source first; separate multiple URLs with line breaks. |

## Allowed Regions

- Europe
- Central Asia
- Asia-Pacific
- North America
- Latin America and the Caribbean
- Africa
- Middle East

## Allowed Subregions

- EU
- non-EU Europe (excl Russia)
- Russia
- Central Asia
- Northeast Asia
- South Asia
- Southeast Asia
- Oceania
- North America
- Central America
- the Caribbean
- South America
- North Africa
- Sub-Saharan Africa
- Middle East

The user's list states 18 subregions but enumerates 15 distinct labels. Use the 15 labels actually supplied; do not create extra labels.

## Direct Investment industries — GB/T 4754-2017 Level I

- A Agriculture, forestry, animal husbandry and fishery
- B Mining
- C Manufacturing
- D Production and supply of electricity, heat, gas and water
- E Construction
- F Wholesale and retail
- G Transport, storage and postal services
- H Accommodation and catering
- I Information transmission, software and information technology services
- J Finance
- K Real estate
- L Leasing and business services
- M Scientific research and technical services
- N Water conservancy, environment and public facilities management
- O Resident services, repairs and other services
- P Education
- Q Health and social work
- R Culture, sports and entertainment
- S Public administration, social security and social organizations
- T International organizations

## Contracted Construction industries

- Transportation
- Building
- Power engineering
- Communications engineering
- Water infrastructure
- Industrial (including industrial parks)
- Non-renewable energy
- Renewable energy
- Waste treatment
- Others

### Construction boundary examples

- roads, bridges, rail, metro, ports, airports: `Transportation`;
- housing, offices, hotels, hospitals, schools, stadium buildings: `Building`;
- grids, substations, transmission lines, distribution systems: `Power engineering`;
- telecom networks, fibre, towers, data communications: `Communications engineering`;
- drinking water, irrigation, drainage, sewerage, flood control: `Water infrastructure`;
- factories, smelters, cement plants, mines' processing facilities, industrial parks: `Industrial (including industrial parks)`;
- oil, gas, coal, refinery, petrochemical feedstock infrastructure, thermal and nuclear generation: `Non-renewable energy`;
- solar, wind, hydro, geothermal, biomass generation: `Renewable energy`;
- landfills, waste sorting, recycling, sewage-sludge treatment, waste-to-energy: `Waste treatment`;
- use `Others` only when none fits and explain it.

Hydropower is `Renewable energy` when generation is the main contracted purpose; water supply or irrigation dams without a primary generation purpose are `Water infrastructure`. Transmission associated with a specific solar/wind plant is `Renewable energy` when inseparable from the generation EPC, but a standalone grid line is `Power engineering`.

## Note template

Direct Investment: `[Chinese company] announced [investment role] for [project] in [location], involving [asset, scope and capacity]. [Counterparty and commitment status]. The disclosed value is [basis and attribution]; [completion/timing]. [Material caveat].`

Contracted Construction: `[Chinese company] won/was awarded [package or contract] for [project] in [location], involving [scope and capacity]. [Owner/procurement authority and award evidence]. The disclosed value is [basis and attribution]; [completion/timing]. [Material caveat].` Do not describe `signed` as the qualifying event. If signing is mentioned, also state the decisive award evidence and award date.

Do not write `N/A`, `unknown`, or fabricated zeros. Leave cells blank and explain only material gaps in `Note`. Missing amount, completion date, province, or another non-eligibility field never justifies exclusion. If category or another eligibility-critical fact remains unresolved, retain the lead in `Candidates` with its missing evidence and next verification query.

An otherwise confirmed project with no disclosed monetary value belongs in `Projects`, not `Candidates`. Leave columns 9-11 blank and, when useful, write `The investment/contract value was not disclosed.` in `Note`. During final QA, scan `Exclusion_Log` and fail validation if missing amount is the sole exclusion reason.

## Candidates sheet

Keep plausible unresolved leads in `Candidates` with these fields: Candidate ID, Project ID, Deal/Contract ID, Event ID, region, destination, Chinese company/alias, parent company, Chinese company home province, project/local name, suspected category, suspected event stage, event date, publication date, amount/currency, discovery URL, corroborating URL, missing evidence, next verification query, confidence, status, and reviewer notes.

Use status values `Unverified`, `Verifying`, `Confirmed`, `Excluded`, `Duplicate`, or `Backfill`. A confirmed candidate must also appear in `Projects`; an excluded candidate must reconcile to `Exclusion_Log`. Do not treat preliminary/MOU or unconfirmed rows as confirmed projects.

## Search_Log sheet

Record one row per independent query with timestamp, target month, region, country, search axis, language/script, engine/site, exact query, result pages reviewed, results reviewed, candidates found, new qualifying rows, source family, and limitation/status. Keep exact queries rather than paraphrases.
