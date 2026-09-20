"""Verify that workbook, JSON outputs, and standalone HTML contain the same projects."""

from __future__ import annotations

import json
import re
from pathlib import Path

from openpyxl import load_workbook


ROOT = Path(__file__).resolve().parents[1]
WORKBOOK = ROOT / "data" / "ODI_Tracker_latest.xlsx"
RAW_JSON = ROOT / "dashboard" / "source" / "data" / "raw-projects.json"
MAPPED_JSON = ROOT / "dashboard" / "source" / "app" / "data" / "projects.json"
HTML = ROOT / "dashboard" / "index.html"


def workbook_project_count() -> int:
    workbook = load_workbook(WORKBOOK, read_only=True, data_only=True)
    rows = workbook["Projects"].iter_rows(values_only=True)
    next(rows)
    return sum(1 for row in rows if any(value not in (None, "") for value in row))


def main() -> None:
    raw = json.loads(RAW_JSON.read_text(encoding="utf-8"))
    mapped = json.loads(MAPPED_JSON.read_text(encoding="utf-8"))
    html = HTML.read_text(encoding="utf-8")
    match = re.search(r"const projects=(\[.*?\]);\nconst paths=", html, re.DOTALL)
    if not match:
        raise ValueError("Standalone HTML does not contain an embedded projects array")
    embedded = json.loads(match.group(1))

    counts = {
        "workbook": workbook_project_count(),
        "rawJson": len(raw["projects"]),
        "mappedJson": len(mapped["projects"]),
        "html": len(embedded),
    }
    if len(set(counts.values())) != 1:
        raise ValueError(f"Project counts do not reconcile: {counts}")

    ids = [project["id"] for project in mapped["projects"]]
    if len(ids) != len(set(ids)):
        raise ValueError("Mapped dashboard data contains duplicate project IDs")
    if any(
        not isinstance(project.get("lat"), (int, float))
        or not isinstance(project.get("lon"), (int, float))
        for project in mapped["projects"]
    ):
        raise ValueError("Mapped dashboard data contains invalid coordinates")

    months = sorted(project["month"] for project in raw["projects"])
    expected_coverage = {"start": months[0], "end": months[-1]}
    if mapped.get("coverage") != expected_coverage:
        raise ValueError(
            f"Coverage mismatch: expected {expected_coverage}, got {mapped.get('coverage')}"
        )

    hong_kong = [
        project
        for project in mapped["projects"]
        if project["country"] in {"Hong Kong", "Hong Kong, China"}
    ]
    if any(
        abs(project["lat"] - 22.3193) > 0.2
        or abs(project["lon"] - 114.1694) > 0.2
        for project in hong_kong
    ):
        raise ValueError("At least one Hong Kong project is plotted outside Hong Kong")

    print(
        json.dumps(
            {
                "projectCounts": counts,
                "coverage": expected_coverage,
                "hongKongProjects": len(hong_kong),
                "status": "PASS",
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
