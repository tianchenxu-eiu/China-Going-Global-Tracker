---
name: china-overseas-projects-monthly
description: Compile a high-coverage, source-verifiable monthly Excel dataset of newly announced overseas direct-investment projects and newly awarded contracted-construction projects involving mainland Chinese companies. Use when the user supplies a month and wants exhaustive-best-effort multilingual research, later-milestone backtracing, country-by-country and company-by-company discovery, classification, USD conversion, deduplication, coverage auditing, and a validated .xlsx output.
---

# Monthly Chinese Overseas Projects

## Required input
Obtain one target month in `YYYY-MM` format. Accept a custom output path if supplied; otherwise save:

`outputs/china_overseas_projects_YYYY-MM.xlsx`

The default research universe is announcements dated from `2023-01-01` through `2025-12-31`. Run another month only when the user explicitly requests it.

## Non-negotiable output
Create a real Excel workbook from `assets/monthly-projects-template.xlsx`. Populate `Projects` with confirmed rows using exactly the 17 required columns. Preserve and populate `Candidates`, `Search_Log`, and the other audit sheets. Use actual Excel dates and numeric USD values, not display-only text. Put complete raw webpage URLs directly in source cells; never use footnotes, citation labels, search-result URLs, or shortened links.

### Non-negotiable missing-amount rule

- Never exclude, downgrade, or move an otherwise verified in-scope project out of `Projects` solely because no source discloses an investment or contract value.
- Treat project eligibility and amount availability as independent questions. Determine eligibility from the Chinese-company role, qualifying event stage, destination, and announcement date—not from whether a monetary value is available.
- When no defensible amount is disclosed, leave `Primary Investment/Contract Value`, `Secondary Investment/Contract Value`, and `Secondary Investment/Contract Value Note` blank. State briefly in `Note` that the amount was not disclosed when useful for auditability.
- Never write zero, estimate an amount from capacity or project scale, or substitute financing, total programme cost, expected revenue, or another non-equivalent figure.

Before researching, read these files:

1. `references/methodology.md`
2. `references/output-schema.md`
3. `references/search-playbook.md`
4. `references/query-templates.md`
5. `references/sources-and-fx.md`
6. `references/region-country-map.csv`
7. `references/taxonomies.csv`
8. `references/coverage-protocol.md`
9. `references/china-provinces.csv`

## Operating principles

- Conduct a comprehensive best-effort web search. Never claim literal completeness; demonstrate coverage and search saturation in `Coverage_Log`.
- Search one region at a time, but use countries/territories as the atomic coverage unit. Never treat one regional query as coverage of its countries.
- Within the active region, search in Chinese, English, and relevant local languages. Use local-language country names and award/investment terminology.
- Treat the requested region/subregion taxonomy and `region-country-map.csv` as controlling. Do not invent a new geography label.
- Prefer primary sources and decisive host-country sources. Aggregators and social posts are leads only.
- Treat `bhi.com.cn` and Belt and Road Portal weekly/biweekly project pages as discovery indexes when their accessible text is limited. Do not stop enrichment at the BHI entry or treat a paywalled/summary-only BHI page as sufficient merely because it names a project. For every BHI-discovered lead, search the project name, Chinese company and aliases, owner/counterparty, destination, sector, capacity, package/lot number, and distinctive wording across accessible company, government, procurement, exchange, owner, lender, trade-media, and local-language sources. Use those sources to complete and verify the row whenever available; preserve BHI in `Source_Log` as the discovery source.
- Do not fill gaps by inference. Leave unknown amounts and exact completion dates blank and explain useful partial timing in `Note`.
- Maintain a coverage matrix, candidate ledger, query log, and exclusion ledger. Every country/source-family cell must have a status, and every plausible candidate must end as included, duplicate, or excluded with a reason.
- Separate broad discovery from strict verification. Capture weak-source leads first, then verify them; do not demand primary-source quality at discovery time.
- Apply no minimum value threshold. Keep small, undisclosed-value, subcontract, local-media, private-company, and unfamiliar-company leads when otherwise in scope.
- Keep incomplete, preliminary, or unconfirmed leads in `Candidates`; never silently discard them because amount, exact date, ownership link, or binding status is missing.
- Never exclude a plausible project solely because amount, category, industry, completion date, Chinese-company province, or another output field is missing. Confirmed projects may have blank non-essential fields; keep projects with unresolved eligibility/category in `Candidates` until resolved.

### Mandatory cross-month candidate closure

- Treat `Candidates` and every historical/legacy `Exclusion_Log` as persistent ledgers, not disposable monthly scratch sheets. A consolidation or rerun must ingest both schemas, including older nine-column exclusion logs.
- Before exporting a consolidated tracker, identify every row marked `Route to YYYY-MM`, `Backfill`, `Cross-month`, `Outside month`, or equivalent. Each such row must end in exactly one auditable state: included in the correct month's `Projects`, matched to an existing project/deal/event as a duplicate, clearly excluded with an eligibility reason, or retained as unresolved in the consolidated `Candidates` sheet.
- Do not treat a row as resolved merely because it was excluded from the month in which it was discovered. The target-month handoff must be verified explicitly.
- The consolidation QA must report counts for standard candidates, legacy exclusion leads, routed leads, included rows, duplicates, exclusions, and unresolved rows. Derive these counts from the actual ledgers; never hard-code them.
- Block final export when a routed lead has no target-month disposition. This applies even when the amount, project category, exact event day, or another enrichment field is missing.

## Workflow

### 1. Initialize the run

- Parse the month and calculate its first and last calendar dates.
- Copy the workbook template to the final output path.
- Create a scratch directory such as `work/2024-03/`.
- Create one scratch CSV per region with the exact Projects headers.
- Create `coverage_matrix.csv`, `candidate_ledger.csv`, `query_log.csv`, and `exclusion_ledger.csv` using `references/coverage-protocol.md`. Assign Project ID, Deal/Contract ID, and Event ID before deduplication.
- Record the target month, run date, methodology version, and output path on `Instructions`.

### 2. Discover candidates

For each region, follow all passes in `references/search-playbook.md`. Complete every mapped country and run independent destination-first, company-first, sector-first, and source-first discovery axes.

1. Chinese discovery pass, including every Belt and Road Portal overseas-project weekly/biweekly update that overlaps the target month. Treat BHI entries as leads and run mandatory off-BHI enrichment searches for each one.
2. Chinese company and securities-filing pass.
3. Host-government, procurement, regulator, stock-exchange, and investment-agency pass.
4. Local-language media and trade-publication pass, country by country.
5. Lender/MDB/ECA and counterparty pass.
6. Reverse-verification pass for every candidate.
7. Adjacent-month and delayed-reporting pass.
8. Mandatory downstream-milestone backtrace from the end of the target month through the research date. Search later contract signing, land acquisition/allocation, EIA/ESIA or permit approval, financing/financial close, notice to proceed, groundbreaking, construction, commissioning, production, operation, annual-report and retrospective disclosures; use every resulting lead to trace the project back to its earliest qualifying public investment commitment or construction award.
9. Residual pass with alternative terms, without negative keywords, and with known-project exclusions.
10. Omission audit covering zero-result countries, company aliases, counterparties, source gaps, and projects first visible through later milestones.

Do not start the next region until every country is searched or explicitly marked blocked/not applicable, candidates reconcile, and the quantitative gates in `references/coverage-protocol.md` pass. A low result count is never evidence of saturation.

### 3. Verify and enrich candidates

For every lead, search separately for company control, qualifying event stage, event date, project owner, location, scope, amount, completion timing, and the earliest announcement. For contracted construction, explicitly locate bid-award evidence rather than treating contract execution as sufficient. For every lead discovered through `bhi.com.cn`, explicitly search outside that domain and record the attempted alternative-source queries in `Search_Log`. Require two independent sources when practical; require corroboration for unclear ownership, event timing, consortium attribution, or a non-primary decisive source. Move verified in-scope events to `Projects`; retain unresolved plausible leads in `Candidates`; move clearly out-of-scope leads to `Exclusion_Log`.

For every lead first discovered through a later milestone, search backward using the exact project name and variants, Chinese parent and local subsidiary, owner/counterparty, location, capacity, package/lot or permit number, and wording such as `previously announced`, `awarded in`, `investment approved in`, `since`, `commenced after`, and local-language equivalents. Search company and owner archives, exchange filings, annual/interim reports, host investment approvals, land and environmental records, procurement registers, lender documents, and archived media. A later source may prove an earlier event, but it must not be used to invent an unreported event date.

### 4. Apply the inclusion test

Include only events whose earliest verifiable public announcement date falls inside the target month, subject to these rules:

- **Direct Investment:** a mainland-China-controlled company announces a new overseas equity investment, acquisition, greenfield asset, joint venture, concession investment, or incremental reinvestment/expansion. Exclude mere completion, commissioning, construction progress, financing without investment, routine sales activity, distributorships, and repeated descriptions of an already announced commitment.
- **Contracted Construction:** a mainland-China-controlled company must be newly confirmed as the successful bidder or award recipient for an overseas construction/engineering project. Accept explicit evidence such as `won the bid/tender`, `successful bidder`, `contract awarded`, `notice/letter of award`, `中标`, `授标`, or `中标通知书`. Include prime contracts and substantive subcontracts only when their package was awarded. **A signed EPC/works/design-build/turnkey contract, contract execution, contractor appointment, notice to proceed, or commencement does not by itself qualify and must not substitute for bid-award evidence.** A signing source may corroborate a row only after the same or another reliable source proves the award. If award evidence cannot be found, keep a plausible signed-contract lead in `Candidates`; do not put it in `Projects`.
- A report published after month-end may be used if it explicitly proves that the award/investment announcement occurred within the target month.
- A later milestone such as signing, land allocation, EIA approval, financing, groundbreaking, construction, commissioning, production or operation is a mandatory discovery lead. It belongs in the target month's `Projects` only when reliable evidence explicitly establishes a qualifying target-month investment commitment or construction award. If the project clearly exists but the qualifying event date or stage remains unresolved, retain it in `Candidates`; do not discard it and do not backdate it by inference.
- If the underlying event day is not stated, the first verifiable publication date may serve as the announcement date only when the source itself is the first public announcement; disclose this in `Note`.

### 5. Resolve mixed and complex cases

- Use one row per economic event, not one row per article.
- If several Chinese companies jointly win the same package, use one row and separate company names with semicolons.
- If the same project contains separately awarded packages or separately announced investments, use separate rows.
- For a project with both equity investment and EPC roles, create two rows only when the roles and amounts are separately identifiable. Otherwise choose the primary category by economic substance and explain the dual role in `Note`.
- When a Chinese company is part of a consortium, use the Chinese attributable value if disclosed. If only the full consortium/project value is known, use that value and state that the Chinese share is undisclosed.
- For M&A, use the consideration announced at definitive agreement/offer stage. Do not add a later completion row unless it contains a genuinely new investment commitment.
- For reinvestment, report only the newly announced incremental amount, not the cumulative historic project cost.

### 6. Normalize and export

Follow `references/output-schema.md` exactly.

- Standardize company names to their official English names; add the Chinese name in parentheses only when useful for identification.
- Record `Chinese Company Home Province` using the qualifying mainland parent company's registered/headquarters province and an exact value from `references/china-provinces.csv`. Exclude Hong Kong, Macao, and Taiwan. For multiple Chinese companies, separate province values with semicolons in company-name order; leave blank when not verifiable and retain the row.
- Standardize destinations using `region-country-map.csv`.
- Classify industries and categories using only values in `taxonomies.csv`.
- Contracted-construction rows must have a blank `Secondary Industry`.
- Completion date must be blank unless an exact day is supported. Put quarter/year or duration-only information in `Note`.
- Write `Primary Investment/Contract Value` as a numeric USD amount. Use `sources-and-fx.md` for conversions and document every conversion in `FX_Log`.
- Put a compact original-currency amount in `Secondary Investment/Contract Value` using `CCC<number>m`, where `CCC` is the three-letter currency code and `m` means million (for example `CNY277m`, `USD1687m`, or `EUR659m`). Use no spaces, commas, words, or qualifiers. Convert billions to millions. For a range, use `CCC<number>-<number>m`; if two currencies are disclosed, use the original transaction currency only.
- Put qualifiers, attribution, amount basis, alternative-currency equivalents, and other explanatory wording in `Secondary Investment/Contract Value Note`. Example: write `CNY277m` in the value column and `about CNY 277 million in Phase I total investment` in the note column. Leave both blank when no amount is disclosed.
- Use one concise paragraph in `Note` covering location, asset/scope, Chinese role, counterparty, stage, amount basis, timing, and material uncertainty.
- Put the decisive URL first in `Source Webpage URL`. Multiple complete URLs may be separated by line breaks in the same cell.

### 7. Deduplicate and validate

- Normalize company, project, country, date, category, package/lot, contract type, event stage, and value fields.
- Deduplicate at three levels: Project ID identifies the overall asset/programme; Deal/Contract ID identifies a package, investment tranche, acquisition, or contract; Event ID identifies the qualifying award or investment announcement. Contract signing alone is not a qualifying construction Event ID. Do not merge distinct lots, phases, Chinese roles, contracts, or separately qualifying events merely because company, country, and project name match.
- Treat renamed/transliterated projects as possible duplicates.
- Use the earliest qualifying event and strongest source. For the same construction contract, retain the bid/award event and date; treat a later signing record as a duplicate or non-qualifying follow-up, merge useful corroborating URLs into the award row, and never replace the award row with the signing row.
- Merge the region CSVs with `scripts/merge_region_csvs.py`.
- Run `scripts/validate_dataset.py` on the merged CSV before writing the workbook.
- Resolve every error. Warnings may remain only if they are documented in `Instructions` or `Coverage_Log`.
- Run an omission audit over excluded near-matches, delayed reports, subsidiaries, alternate spellings, and sources/countries with zero candidates. Reopen discovery for unexplained zero-result countries.
- Reconcile every project found through downstream milestones: promote it only after the earlier qualifying event is verified, link it to an existing Project/Deal/Contract ID when it is a follow-up, retain it in `Candidates` when timing or eligibility remains unresolved, or document a reason in `Exclusion_Log`. Do not leave a later-milestone lead unclassified.

### 8. Build and verify the workbook

Populate these sheets:

- `Projects`: final dataset only.
- `Candidates`: unresolved but plausible leads, including preliminary/MoU, preferred-bidder, signed-contract-without-award-evidence, equipment-plus-construction, missing-date, missing-ownership-link, or insufficient-source cases.
- `Search_Log`: exact queries, languages, axes, engines/sites, results reviewed, and candidates found. Mark downstream searches with the `post-event-backtrace` axis and identify the milestone type and later-period window in the query/status text.
- `Coverage_Log`: one row per region with countries, languages, query batches, pages reviewed, inclusions, exclusions, downstream-backtrace coverage, and saturation assessment.
- `Exclusion_Log`: plausible candidates rejected and the reason.
- `FX_Log`: every non-USD conversion and calculation.
- `Source_Log`: additional corroborating sources and decisive evidence.

Then verify:

- all 17 headers are present and ordered correctly;
- dates display as `yyyy/mm/dd`;
- USD values are numeric and formatted as USD;
- categories and geographies use exact allowed values;
- no contracted-construction row has a secondary industry;
- every row has at least one `http://` or `https://` source URL;
- every BHI-discovered row has documented off-BHI enrichment attempts; when an accessible alternative source exists, place the strongest alternative first in `Source Webpage URL` and keep BHI in `Source_Log` rather than relying on BHI alone;
- every verified in-scope event is retained even when all amount fields are blank; audit exclusions to confirm that `amount not disclosed`, `value unavailable`, or equivalent wording is never the sole exclusion reason;
- no included row is a progress/completion-only item;
- each region has a documented downstream-milestone backtrace through the research date, and every resulting lead is reconciled to `Projects`, `Candidates`, `Exclusion_Log`, or an existing duplicate ID;
- every Contracted Construction row has decisive bid-award evidence; fail QA when the only event evidence is signing, contract execution, appointment, notice to proceed, groundbreaking, or commencement;
- no obvious duplicates remain;
- filters, frozen header, wrapping, and readable widths are preserved;
- the workbook opens successfully.

### 9. Final response

Return only:

1. a link/path to the completed `.xlsx`;
2. the number of included projects, split by Direct Investment and Contracted Construction;
3. a brief warning about any unresolved coverage limitation.

Do not paste the full dataset into chat.
