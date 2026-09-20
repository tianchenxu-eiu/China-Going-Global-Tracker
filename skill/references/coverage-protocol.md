# Coverage Protocol

Measure search effort and expose likely omissions. Result count is not a coverage metric.

## Coverage matrix

Create one row for each `country/territory × source family` combination. Use these source families: Chinese government/industry portals; Chinese company newsrooms; Chinese/Hong Kong exchange filings; host government/procurement; host investment/competition/securities regulators; project owner/counterparty; local-language media/trade press; MDB/lender/ECA/adviser.

Record region, country, source family, language/script, domains searched, query count, pages opened, archive/date coverage, candidates found, search time, status (`Done`, `Blocked`, `Not applicable`), and limitation.

## Ledgers

Candidate ledger fields: ID, country, company and aliases, project and aliases, category hypothesis, event wording, event date, publication date, amount, discovery URL, decisive URL, corroborating URL, downstream milestone type/date, backtraced event/date, status, exclusion reason, duplicate ID, and notes.

Query log fields: country, axis (`destination`, `company`, `sector`, `source`, `post-event-backtrace`), language, exact query, search engine/site, searched date window, milestone type when applicable, result pages reviewed, candidates found, disposition, and timestamp. Preserve exact queries so zero-result claims are auditable.

## Minimum country gates

For every mapped country/territory:

- run construction-award and direct-investment queries in English;
- run both categories in at least one official or widely used local language when different from English;
- search at least one host official/procurement source and one local news/trade source;
- search discovered Chinese company names without requiring the word `China`;
- search 15 days before month-start through 60 days after month-end; use later sources only when they prove an in-month event;
- separately search from month-end through the research date for later signing, land, approval, EIA/ESIA, financing, notice-to-proceed, construction, commissioning, production and retrospective-report milestones that may reveal an earlier missed project;
- run at least two materially different downstream-backtrace query families per country—one company/project/sector family and one official/owner/procurement/environmental/lender/local-media family—and record them with the `post-event-backtrace` axis;
- inspect the first two result pages, or all results when fewer, for each productive query family;
- rerun without negative keywords because qualifying pages may also mention progress or completion.

For microstates or poorly indexed territories, mark a gate `Not applicable` only with a reason.

## Company-first gates

Scan central SOEs, provincial SOEs, and relevant private firms by sector. Expand every discovered company into parent, subsidiary, former name, Chinese name, English name, acronym, and local transliteration. Search newsroom archives and exchange filings directly.

Do not use a fixed company list as a closed universe. Add each newly encountered Chinese participant to the alias ledger and search it across the target window.

## Workload and recall gates

- Execute at least 100 independent queries per target month; normally expect 100-150 or more. Country/source gates may require substantially more.
- Record query language, exact query, engine/site, result pages reviewed, and candidates found in `Search_Log`.
- Do not stop after reviewing only the first result page for productive query families.
- If confirmed output is small, require a visibly larger candidate pool and explain the funnel. If confirmed rows and total discovered leads are nearly identical, run another broad discovery pass because discovery was probably too strict.
- Check at least two sources per confirmed project when practical. Treat two-source corroboration as mandatory for unclear ownership, event timing, consortium value, or non-primary evidence.
- Run a negative-search test using broad award/investment phrases to find companies outside the alias ledger.
- Review the previous six target months for delayed disclosures. Add qualifying late discoveries to the proper historical month or document them for backfill; do not misdate them into the current month.
- Downstream-backtrace queries are additional to the 100-query monthly floor and ordinary adjacent-month searches; do not relabel ordinary discovery queries to satisfy this gate.
- Reconcile every later-milestone lead. It must become a verified historical inclusion, an existing-row follow-up/duplicate, a dated candidate for cross-month review, or a documented exclusion. Physical progress alone never proves the original announcement or award date.

## Saturation and omission audit

A region is `Saturated-best-effort` only when:

- every matrix row is `Done`, `Blocked`, or justified `Not applicable`;
- overlapping Chinese weekly/biweekly roundups are reviewed;
- all candidate statuses reconcile;
- three consecutive residual batches using materially different axes produce no new qualifying row;
- one batch omits China/Chinese/中国/中企 and searches counterparties, project names, sectors, and award registers;
- every zero-candidate country receives an alternate-language/script and sector-term second pass;
- delayed-reporting and adjacent-month pages are checked;
- downstream milestones are searched through the research date using both company/project/sector and official/owner/procurement/environmental/lender/local-media source families;
- every downstream lead is reconciled and no later-stage signing, permit, construction, commissioning or operation item remains silently unclassified;
- the previous six months receive a delayed-disclosure backscan;
- no unexplained high-yield source, company, or country remains blocked.

Report limitations by country and source. Never claim literal completeness; use `comprehensive best effort`.
