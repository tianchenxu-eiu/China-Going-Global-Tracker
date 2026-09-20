#!/usr/bin/env python3
"""Merge sequential region CSVs, preserve schema, and remove exact normalized duplicates."""
from __future__ import annotations
import argparse,csv,re
from pathlib import Path
HEADERS=["Investor/Company Name","Chinese Company Home Province","Announcement Date","Expected Completion Date","Destination Country/Territory","Region","Subregion","Project Name","Primary Investment/Contract Value","Secondary Investment/Contract Value","Secondary Investment/Contract Value Note","Primary Industry","Secondary Industry","Primary Category","Secondary Category","Note","Source Webpage URL"]
def norm(s): return re.sub(r"[^a-z0-9]+"," ",(s or "").lower()).strip()
def main():
    ap=argparse.ArgumentParser(); ap.add_argument("output",type=Path); ap.add_argument("inputs",nargs="+",type=Path); args=ap.parse_args()
    rows=[]; seen={}
    for path in args.inputs:
        with path.open(encoding="utf-8-sig",newline="") as f:
            r=csv.DictReader(f)
            if r.fieldnames!=HEADERS: raise SystemExit(f"Bad headers in {path}")
            for row in r:
                if not any((v or "").strip() for v in row.values()): continue
                # Merge only near-exact event rows. Similar project names can represent
                # distinct lots, phases, roles, contracts, or investment tranches.
                key=(
                    norm(row["Destination Country/Territory"]),
                    norm(row["Project Name"]),
                    norm(row["Investor/Company Name"]),
                    row["Announcement Date"].strip(),
                    row["Primary Category"].strip(),
                    row["Secondary Category"].strip(),
                    norm(row["Note"]),
                )
                if key in seen:
                    # Preserve extra URLs on the first row.
                    old=rows[seen[key]]
                    old_urls=[u for u in re.split(r"[\r\n]+",old["Source Webpage URL"]) if u.strip()]
                    new_urls=[u for u in re.split(r"[\r\n]+",row["Source Webpage URL"]) if u.strip()]
                    old["Source Webpage URL"]="\n".join(dict.fromkeys(old_urls+new_urls))
                    continue
                seen[key]=len(rows); rows.append(row)
    rows.sort(key=lambda x:(x["Announcement Date"],x["Region"],x["Destination Country/Territory"],x["Project Name"]))
    args.output.parent.mkdir(parents=True,exist_ok=True)
    with args.output.open("w",encoding="utf-8-sig",newline="") as f:
        w=csv.DictWriter(f,fieldnames=HEADERS); w.writeheader(); w.writerows(rows)
    print(f"Wrote {len(rows)} rows to {args.output}")
if __name__=="__main__": main()
