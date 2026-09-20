# Publication pipeline

## Canonical and generated files

| Role | Path |
|---|---|
| Canonical publication workbook | `data/ODI_Tracker_latest.xlsx` |
| Excel-to-JSON converter | `scripts/build_dashboard_data.py` |
| Conversion report | `dashboard/source/data/build-report.json` |
| Raw dashboard data | `dashboard/source/data/raw-projects.json` |
| Geocoded dashboard data | `dashboard/source/app/data/projects.json` |
| Coordinate builder | `dashboard/source/scripts/build-data.mjs` |
| Standalone HTML exporter | `scripts/export_dashboard_standalone.mjs` |
| Standalone dashboard | `dashboard/index.html` |
| Reconciliation check | `scripts/verify_dashboard.py` |
| Cloud rebuild workflow | `.github/workflows/rebuild-dashboard.yml` |
| Streamlit entrypoint | `streamlit_app.py` |

## Local rebuild

Use the available bundled Python and Node runtimes when system launchers are unavailable.

```text
python scripts/build_dashboard_data.py
cd dashboard/source
npm ci
node scripts/build-data.mjs
cd ../..
node scripts/export_dashboard_standalone.mjs dashboard/index.html
python scripts/verify_dashboard.py
```

The final verification must report `PASS`, with identical project counts across the workbook, both JSON files and HTML.

## GitHub Action

The workflow runs when `data/ODI_Tracker_latest.xlsx` changes on `main`, and it also supports manual dispatch. It installs pinned Python workbook support and locked Node dependencies, regenerates all downstream files, verifies them, and commits only generated artifacts. Its bot commit does not retrigger the workbook path filter.

If the action cannot push, check repository Actions settings for workflow write permission and branch protection requirements. Do not weaken branch protection without user authorization; use a pull-request variant instead when direct bot commits are prohibited.

## Streamlit password

Configure this in the deployed app's Settings → Secrets panel:

```toml
APP_PASSWORD = "<private password>"
```

`.streamlit/secrets.toml` is ignored locally. `.streamlit/secrets.toml.example` contains only a placeholder. Never commit the real value.

## Recovery

- Schema, date, category, duplicate or direct-investment industry errors: correct the workbook and rerun from the converter.
- Project count falls by more than 10%: review deletions. Use `ALLOW_LARGE_PROJECT_DROP=1` only after the decrease is confirmed.
- Incorrect map location: update deterministic country/city handling in `dashboard/source/scripts/build-data.mjs`, rebuild, and add a verifier when the error could recur.
- Push rejected because the remote advanced: fetch, inspect the remote diff, merge without discarding either side, rerun verification if generated inputs changed, then push.
- Streamlit reports a missing password: add `APP_PASSWORD` in Streamlit Secrets; do not add a source-code fallback.
