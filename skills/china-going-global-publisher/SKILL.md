---
name: china-going-global-publisher
description: Publish an approved China Going Global Tracker Excel update by validating it, rebuilding dashboard data and standalone HTML, synchronizing GitHub safely, and verifying Streamlit-ready output. Use for tracker publication, dashboard refreshes, or failures in the Excel-to-Streamlit pipeline; do not use for discovering or adjudicating new overseas projects.
---

# China Going Global Publisher

Treat `data/ODI_Tracker_latest.xlsx` as the sole publication source. JSON and HTML are generated artifacts and must never be edited as substitutes for correcting the workbook.

## Publication workflow

1. Identify the approved workbook. Do not publish a draft unless the user explicitly asks for a preview.
2. Replace `data/ODI_Tracker_latest.xlsx` while retaining its canonical filename.
3. Run `scripts/build_dashboard_data.py`. It must retain projects with undisclosed amounts, require industry classification for direct investment, detect exact duplicate records, and stop on schema/date/category errors.
4. From `dashboard/source`, install locked dependencies when needed and run `node scripts/build-data.mjs`.
5. From the repository root, run `node scripts/export_dashboard_standalone.mjs dashboard/index.html`.
6. Run `scripts/verify_dashboard.py`. Workbook, raw JSON, mapped JSON and embedded HTML counts must reconcile; coverage must equal the workbook's earliest and latest project months; Hong Kong markers must remain near Hong Kong.
7. Inspect `dashboard/source/data/build-report.json` and the Git diff. Stop for investigation if the project count unexpectedly falls by more than 10%, validation fails, generated files are empty, or unrelated changes would be overwritten.
8. Commit only the approved workbook, scripts/configuration changes when intended, and generated outputs. Fetch and merge remote work without force-pushing or discarding user changes.
9. Push only when the user has authorized publication. The GitHub Action performs the same rebuild whenever the canonical workbook changes. Streamlit Community Cloud then updates from GitHub.

## Access control

The Streamlit entrypoint must read `APP_PASSWORD` from Streamlit Secrets. Never place the actual password in tracked files, workflow logs, examples, or source code. A missing secret is a deployment blocker, not a reason to add a plaintext fallback.

## Boundaries

- Do not remove projects because an amount or construction secondary industry is blank.
- Do not broaden this publication task into new project research; use the monthly research skill for discovery and verification.
- Do not treat a successful Git push as proof of a valid dashboard. Require the reconciliation script and check the GitHub Actions result when available.
- Preserve remote changes and avoid force pushes.

Read [references/pipeline.md](references/pipeline.md) for the file map, commands, GitHub Action behavior, Streamlit secret setup, and recovery steps.
