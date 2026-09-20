#!/usr/bin/env python3
"""Validate a Projects CSV against the bundled monthly-project methodology."""
from __future__ import annotations
import argparse, csv, re, sys
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse

HEADERS = [
    "Investor/Company Name","Chinese Company Home Province","Announcement Date","Expected Completion Date",
    "Destination Country/Territory","Region","Subregion","Project Name",
    "Primary Investment/Contract Value","Secondary Investment/Contract Value","Secondary Investment/Contract Value Note",
    "Primary Industry","Secondary Industry","Primary Category","Secondary Category",
    "Note","Source Webpage URL"
]
REGIONS = {"Europe","Central Asia","Asia-Pacific","North America","Latin America and the Caribbean","Africa","Middle East"}
SUBREGIONS = {"EU","non-EU Europe (excl Russia)","Russia","Central Asia","Northeast Asia","South Asia","Southeast Asia","Oceania","North America","Central America","the Caribbean","South America","North Africa","Sub-Saharan Africa","Middle East"}
DI_INDUSTRIES = {
"A Agriculture, forestry, animal husbandry and fishery","B Mining","C Manufacturing",
"D Production and supply of electricity, heat, gas and water","E Construction","F Wholesale and retail",
"G Transport, storage and postal services","H Accommodation and catering",
"I Information transmission, software and information technology services","J Finance","K Real estate",
"L Leasing and business services","M Scientific research and technical services",
"N Water conservancy, environment and public facilities management",
"O Resident services, repairs and other services","P Education","Q Health and social work",
"R Culture, sports and entertainment","S Public administration, social security and social organizations",
"T International organizations"}
CC_INDUSTRIES = {"Transportation","Building","Power engineering","Communications engineering","Water infrastructure","Industrial (including industrial parks)","Non-renewable energy","Renewable energy","Waste treatment","Others"}
DI_SECONDARY = {"Greenfield Investment","Merger & Acquisition","Reinvestment","Others"}
CC_SECONDARY = {"EPC","BOT/PPP","Others"}
CHINA_PROVINCES = {
"Beijing","Tianjin","Hebei","Shanxi","Inner Mongolia","Liaoning","Jilin","Heilongjiang",
"Shanghai","Jiangsu","Zhejiang","Anhui","Fujian","Jiangxi","Shandong","Henan","Hubei",
"Hunan","Guangdong","Guangxi","Hainan","Chongqing","Sichuan","Guizhou","Yunnan","Tibet",
"Shaanxi","Gansu","Qinghai","Ningxia","Xinjiang"}
PROGRESS_WORDS = re.compile(r"\b(completed|commissioned|inaugurated|opened|handed over|construction progress|under construction|tunnel breakthrough|topped out)\b", re.I)
CONSTRUCTION_AWARD_WORDS = re.compile(
    r"\b(award(?:ed)?|award recipient|letter of award|notice of award|bid-acceptance letter|"
    r"won|winner|winning|successful(?:ly)? bid(?:der)?|successful contractor|"
    r"secured (?:the )?(?:contract|project|package|lot|works)|"
    r"received (?:the )?(?:[\w-]+ )?(?:contract|subcontract|package|lot|award letter|award notice)|"
    r"obtained (?:the )?(?:contract|project|package|lot|phase)|"
    r"competitively selected contractor|bid-winning|tender award)\b|"
    r"中标|授标|中标通知书|中标通知|中标候选人", re.I
)
SIGNING_ONLY_WORDS = re.compile(
    r"\b(signed|signing|signs|executed|entered into|concluded|inked|"
    r"appointed contractor|notice to proceed|commenced|groundbreaking)\b", re.I
)

def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", (s or "").lower()).strip()

def parse_date(value: str, label: str, rowno: int, errors: list[str], allow_blank: bool=False):
    v=(value or "").strip()
    if not v and allow_blank: return None
    if not v:
        errors.append(f"row {rowno}: missing {label}"); return None
    for fmt in ("%Y/%m/%d","%Y-%m-%d"):
        try: return datetime.strptime(v,fmt).date()
        except ValueError: pass
    errors.append(f"row {rowno}: invalid {label} '{v}', use YYYY/MM/DD"); return None

def valid_url(u: str) -> bool:
    try:
        p=urlparse(u.strip())
        return p.scheme in {"http","https"} and bool(p.netloc)
    except Exception:
        return False

def load_map(path: Path):
    by_name={}
    with path.open(encoding="utf-8-sig", newline="") as f:
        for r in csv.DictReader(f):
            canonical=r["Canonical Country/Territory"].strip()
            entry=(canonical,r["Region"].strip(),r["Subregion"].strip())
            by_name[norm(canonical)]=entry
            for alias in (r.get("Aliases") or "").split(";"):
                if alias.strip(): by_name[norm(alias)]=entry
    return by_name

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("csv_file", type=Path)
    ap.add_argument("--month", help="Expected YYYY-MM; flags rows outside the month")
    ap.add_argument("--country-map", type=Path, default=Path(__file__).resolve().parents[1]/"references"/"region-country-map.csv")
    args=ap.parse_args()
    errors=[]; warnings=[]; seen={}
    cmap=load_map(args.country_map)
    with args.csv_file.open(encoding="utf-8-sig", newline="") as f:
        reader=csv.DictReader(f)
        if reader.fieldnames != HEADERS:
            errors.append("headers/order do not exactly match required schema")
        for rowno,row in enumerate(reader,start=2):
            if not any((v or "").strip() for v in row.values()): continue
            for field in ["Investor/Company Name","Destination Country/Territory","Project Name","Primary Industry","Primary Category","Secondary Category","Note","Source Webpage URL"]:
                if not (row.get(field) or "").strip(): errors.append(f"row {rowno}: missing {field}")
            provinces=[x.strip() for x in (row.get("Chinese Company Home Province") or "").split(";") if x.strip()]
            for province in provinces:
                if province not in CHINA_PROVINCES:
                    errors.append(f"row {rowno}: invalid Chinese Company Home Province '{province}'")
            ad=parse_date(row.get("Announcement Date",""),"Announcement Date",rowno,errors)
            parse_date(row.get("Expected Completion Date",""),"Expected Completion Date",rowno,errors,allow_blank=True)
            if args.month and ad and ad.strftime("%Y-%m") != args.month:
                errors.append(f"row {rowno}: announcement date {ad} outside target month {args.month}")
            country=norm(row.get("Destination Country/Territory",""))
            if country not in cmap:
                errors.append(f"row {rowno}: destination not found in country map")
            else:
                canonical,region,subregion=cmap[country]
                if row.get("Destination Country/Territory","").strip()!=canonical:
                    warnings.append(f"row {rowno}: use canonical destination '{canonical}'")
                if row.get("Region","").strip()!=region: errors.append(f"row {rowno}: region should be '{region}'")
                if row.get("Subregion","").strip()!=subregion: errors.append(f"row {rowno}: subregion should be '{subregion}'")
            if row.get("Region","").strip() not in REGIONS: errors.append(f"row {rowno}: invalid Region")
            if row.get("Subregion","").strip() not in SUBREGIONS: errors.append(f"row {rowno}: invalid Subregion")
            cat=row.get("Primary Category","").strip(); sec=row.get("Secondary Category","").strip()
            pi=row.get("Primary Industry","").strip(); si=row.get("Secondary Industry","").strip()
            if cat=="Direct Investment":
                if sec not in DI_SECONDARY: errors.append(f"row {rowno}: invalid Direct Investment secondary category")
                if pi not in DI_INDUSTRIES: errors.append(f"row {rowno}: invalid Direct Investment primary industry")
                if si and si not in DI_INDUSTRIES: errors.append(f"row {rowno}: invalid Direct Investment secondary industry")
            elif cat=="Contracted Construction":
                if sec not in CC_SECONDARY: errors.append(f"row {rowno}: invalid Contracted Construction secondary category")
                if pi not in CC_INDUSTRIES: errors.append(f"row {rowno}: invalid Contracted Construction primary industry")
                if si: errors.append(f"row {rowno}: Secondary Industry must be blank for Contracted Construction")
                note=row.get("Note","")
                if not CONSTRUCTION_AWARD_WORDS.search(note):
                    detail="; signing/appointment/commencement wording is not sufficient" if SIGNING_ONLY_WORDS.search(note) else ""
                    errors.append(f"row {rowno}: Contracted Construction lacks explicit bid-award evidence in Note{detail}")
            else: errors.append(f"row {rowno}: invalid Primary Category")
            usd=(row.get("Primary Investment/Contract Value") or "").strip().replace(",","")
            if usd:
                try:
                    x=float(usd)
                    if x<0: errors.append(f"row {rowno}: USD value cannot be negative")
                except ValueError: errors.append(f"row {rowno}: primary value must be numeric USD or blank")
            secondary=(row.get("Secondary Investment/Contract Value") or "").strip()
            secondary_note=(row.get("Secondary Investment/Contract Value Note") or "").strip()
            if secondary and not re.fullmatch(r"[A-Z]{3}(?:\d+(?:\.\d+)?)(?:-\d+(?:\.\d+)?)?m", secondary):
                errors.append(f"row {rowno}: secondary value must use CCC<number>m format")
            if secondary_note and not secondary:
                errors.append(f"row {rowno}: secondary value note requires a secondary value")
            urls=[]
            for piece in re.split(r"[\r\n]+",row.get("Source Webpage URL", "")):
                piece=piece.strip()
                if piece: urls.append(piece)
            if not urls: errors.append(f"row {rowno}: no source URL")
            for u in urls:
                if not valid_url(u): errors.append(f"row {rowno}: invalid URL '{u}'")
                if "google.com/search" in u or "bing.com/search" in u: errors.append(f"row {rowno}: search-result URL not allowed")
            key=(
                norm(row.get("Destination Country/Territory","")),
                norm(row.get("Project Name","")),
                norm(row.get("Investor/Company Name","")),
                row.get("Announcement Date","").strip(),
                cat,
                sec,
                norm(row.get("Note","")),
            )
            if key in seen: warnings.append(f"row {rowno}: possible duplicate of row {seen[key]}")
            else: seen[key]=rowno
            if PROGRESS_WORDS.search(row.get("Note", "")) and not re.search(r"awarded|won|announced|invest",row.get("Note", ""),re.I):
                warnings.append(f"row {rowno}: note sounds like progress/completion rather than a new event")
    print(f"Validated {args.csv_file}")
    print(f"Errors: {len(errors)}; Warnings: {len(warnings)}")
    for e in errors: print("ERROR:",e)
    for w in warnings: print("WARNING:",w)
    return 1 if errors else 0
if __name__=="__main__": sys.exit(main())
