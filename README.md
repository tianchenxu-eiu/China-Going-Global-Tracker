# China Going Global Tracker

China Going Global Tracker is a source-verifiable dataset and research workflow for tracking overseas direct-investment projects and newly awarded contracted-construction projects involving mainland Chinese companies.

## Repository contents

- `data/ODI_Tracker_latest.xlsx` — latest reviewed master workbook, covering January 2023 through August 2026.
- `skill/` — reusable monthly multilingual discovery, verification, classification and export workflow.
- `dashboard/` — interactive dashboard source and a standalone local HTML export.
- `docs/data-dictionary.md` — key workbook fields and status definitions.
- `scripts/` — supporting export utilities.

## Core inclusion rules

1. Direct-investment projects may include greenfield investment, acquisitions, equity or joint-venture investment, reinvestment, concessions and other concrete overseas commitments.
2. Contracted-construction projects require evidence of an award, successful bid, letter of award or equivalent selection decision. Contract signing alone is not sufficient.
3. No project is excluded solely because its investment or contract value is undisclosed.
4. Discovery prioritises recall. Incomplete but plausible records are retained as candidates until they can be verified or excluded.
5. Project, contract and milestone events are distinguished to avoid deleting separate lots, phases or awards as duplicates.

## Status definitions

- `Completed` — explicit evidence shows the tracked project or contract has been completed, commissioned or placed into operation.
- `Cancelled` — explicit evidence shows cancellation, termination or abandonment.
- `In progress` — explicit post-announcement evidence shows construction, implementation or another substantive milestone.
- `Doubtful` — more than one year has elapsed since announcement or award and the renewed search found no qualifying public follow-up.
- blank — no explicit status conclusion, including projects less than one year old without a verified milestone.

`Doubtful` does not prove that a project failed. It means that no qualifying public follow-up was located under the stated review protocol.

## Current release

- Dataset version: v7
- Review date: 18 September 2026
- Coverage: January 2023–August 2026
- Project rows: 1,466
- Direct-investment industry fields: complete
- Missing-value rule: projects are retained when amounts are unavailable

## Dashboard note

The dashboard is regenerated from the authoritative `data/ODI_Tracker_latest.xlsx` workbook. Its time controls expand automatically to the earliest and latest announcement months in the database.

## Automated dashboard publication

A push that changes `data/ODI_Tracker_latest.xlsx` triggers `.github/workflows/rebuild-dashboard.yml`. The workflow validates the `Projects` worksheet, rebuilds the dashboard JSON, regenerates `dashboard/index.html`, reconciles record counts and coordinates, and commits the generated files back to `main`. Streamlit Community Cloud then refreshes the deployed app from the updated repository.

The Streamlit app reads its access password from the private `APP_PASSWORD` setting in Streamlit Secrets. Do not commit `.streamlit/secrets.toml`; use `.streamlit/secrets.toml.example` only as a field-name reference.

## Methodology

Detailed discovery, language coverage, source hierarchy, award-evidence, deduplication, FX and stopping rules are documented under `skill/references/`.

## Disclaimer

The tracker is compiled from public sources on a best-effort basis. Project announcements, values, dates and implementation status may subsequently change. Inclusion does not constitute an endorsement, investment recommendation or legal conclusion. Users should consult the cited primary sources before relying on an individual record.

## Access and licensing

The repository may be publicly viewable, but no public reuse licence is granted at this stage. A separate code and data licence should be selected before permitting reuse.

