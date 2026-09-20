# China Going Global Tracker

China Going Global Tracker is a source-verifiable dataset and research workflow for tracking overseas direct-investment projects and newly awarded contracted-construction projects involving mainland Chinese companies.

中国出海项目追踪器用于持续整理、核实和分析中国大陆企业的海外直接投资项目，以及中国企业在海外新近中标的承包工程项目。

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

The included dashboard is a previous visualisation build. Its embedded data should be regenerated from the latest workbook before external publication. The workbook is the authoritative current dataset.

## Methodology

Detailed discovery, language coverage, source hierarchy, award-evidence, deduplication, FX and stopping rules are documented under `skill/references/`.

## Disclaimer

The tracker is compiled from public sources on a best-effort basis. Project announcements, values, dates and implementation status may subsequently change. Inclusion does not constitute an endorsement, investment recommendation or legal conclusion. Users should consult the cited primary sources before relying on an individual record.

## Access and licensing

This initial repository is intended to be private. No public reuse licence is granted at this stage. A separate code and data licence should be selected before making the repository public.

