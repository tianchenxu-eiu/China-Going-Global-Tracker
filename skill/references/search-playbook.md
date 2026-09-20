# Country-by-Country Search Playbook

## Sequence and date window

Search regions in this order: Europe; Central Asia; Asia-Pacific; North America; Latin America and the Caribbean; Africa; Middle East. Work country by country inside the active region and complete `coverage-protocol.md` before moving on.

Search pages dated from 15 days before month-start through 60 days after month-end, plus undated archives and later retrospectives that explicitly prove an in-month event. In addition, run the downstream-milestone backtrace described below from month-end through the research date. Inclusion depends on the qualifying event date, not crawler or publication date. During each monthly run, backscan the previous six months for delayed disclosures and log any historical additions.

## Four independent discovery axes

Run all four for each country:

1. **Destination-first:** local country name + award/investment terms + month.
2. **Company-first:** Chinese parent/subsidiary names and aliases + destination/event terms.
3. **Sector-first:** project types and sectors + award/investment terms; include queries without China/Chinese.
4. **Source-first:** search official archives, procurement portals, exchanges, company sites, counterparties, and local trade media directly.

Do not discard weak-source leads during discovery. Add them to the candidate ledger and verify separately.

## Mandatory passes

### A. Chinese discovery

Review every Belt and Road Portal overseas-project weekly/biweekly edition overlapping the month, including cross-month editions. Search MOFCOM and overseas economic offices, SASAC, NDRC, CDB, China Exim, Sinosure, provincial commerce departments, contractor associations, chambers, and industry publications.

Use `bhi.com.cn` entries as a discovery index, not an enrichment endpoint, when the accessible page exposes only a project name or short summary. For every BHI lead, run an off-domain enrichment bundle using: exact and shortened project names; Chinese parent, subsidiary, acronym, former name, and local registered entity; owner/counterparty; country and locality; sector/capacity; package, lot, tender, concession, or contract number; and distinctive phrases from the BHI entry. Search company newsrooms and filings, host governments and procurement portals, owners, exchanges, lenders, embassies/economic offices, trade press, and local-language media. Record the queries and outcomes even when no alternative source is found.

Search Chinese terms for winning bids, award notices, contract signing, investment, acquisition, capital increase, expansion, and overseas projects. Treat contract-signing results as leads only: run reverse searches for the tender, successful bidder, award notice, letter/notice of award, procurement authority, owner, package/lot number, and award date. Do not promote a construction lead unless bid-award evidence is found. Do not copy progress, commencement, completion, or operation items unless they contain a separately qualifying new event.

### B. Company and filing discovery

Search central and provincial SOEs plus private firms across construction, energy, mining, manufacturing, batteries/EV, technology, telecom, logistics, finance, property, healthcare, agriculture, and consumer sectors. Search parent and subsidiary names in Chinese, English, acronym, former name, and local transliteration. Search Shanghai, Shenzhen, Beijing, and Hong Kong exchange filings and company newsroom archives.

### C. Host official and procurement sources

For every country, search procurement awards; transport, energy, public works, housing, water, telecom, industry, mines, and finance ministries; investment agencies and special zones; merger/foreign-investment regulators; stock exchanges; state project owners/utilities; national and municipal press offices.

Search both with Chinese identity terms and without them. Award registers often name only the contractor.

### D. Local-language media and trade press

Search country by country in English and at least one relevant local language/script. Use local terms for award, contract signing, investment, acquisition, stake, factory, expansion, concession, EPC, and PPP. Signing terms are discovery-only for construction; pair them with award/tender/procurement terms and verify the actual award. Search national business media and construction, energy, mining, infrastructure, and M&A trade publications.

### E. Counterparty, lender, and adviser sources

Search project owners, consortium partners, MDBs, lenders, ECAs, law firms, advisers, equipment partners, and financial-close notices. These may reveal an event missed by China-focused queries. Financing alone does not qualify.

### F. Reverse verification

For each lead, verify earliest event date, mainland control, binding event stage, scope, location, counterparty, value, and whether it is new rather than progress/completion. Obtain a primary or decisive host source when practical and preserve discovery plus verification URLs.

For a BHI-discovered lead, do not infer missing fields from the project title and do not stop after opening the limited BHI page. Prefer a non-BHI decisive source in the main project row. Keep BHI as the discovery source in `Source_Log`; if no accessible alternative is found after the enrichment bundle, retain only facts visible in the accessible source, leave unsupported fields blank, and state the source limitation and searches attempted.

### G. Adjacent-month and delayed reporting

Search previous/following month names, later retrospectives, award registers, company monthly summaries, and project-finance announcements. Include only if evidence fixes the qualifying event inside the target month.

### H. Downstream-milestone backtrace

This pass is mandatory and additional to the adjacent-month window. Its purpose is to find projects that were quiet or poorly indexed at announcement/award stage but became visible later.

For every country, search from the end of the target month through the research date for later milestones in both investment and construction contexts:

- contract or investment-agreement signing;
- land purchase, allocation, lease, zoning or site handover;
- investment registration, merger clearance, concession, licence, EIA/ESIA or permit approval;
- financing, lender commitment or financial close;
- contractor appointment, notice to proceed, mobilisation, groundbreaking or start of construction;
- equipment installation, trial production, commissioning, completion, opening, production or operation;
- annual/interim reports, sustainability reports, government project inventories and later retrospectives that state when the project was originally approved, announced or awarded.

Run at least two materially different backtrace families per country: one company/project/sector family and one host-official, owner, procurement, environmental, lender or local-media family. Use English and a relevant local language when different. Include queries anchored to the target year/month and queries that omit China/Chinese terms.

Every downstream lead must enter the candidate ledger before verification. Search backward using the project name and spelling variants, Chinese parent and local entity, owner/counterparty, location, capacity, permit/tender/lot number and distinctive phrases. Determine whether it links to an existing row, proves a previously missed qualifying event, or remains unresolved.

- **Direct Investment:** promote to the target month only when a reliable later source explicitly establishes a qualifying public commitment, approval or announcement in that month. If the project first became public later and no target-month commitment can be proven, use the first verifiable qualifying month or retain the lead for cross-month reconciliation.
- **Contracted Construction:** a later signing, appointment, notice to proceed or construction report triggers a search for the tender decision, successful bidder notice, letter/notice of award or equivalent owner award. Promote only when award evidence and its month are verified.
- Never infer an event date from physical progress, elapsed construction time or statements such as `already under construction`.

Log these queries with axis `post-event-backtrace`, the later search window, milestone type, source family and disposition. When a later milestone concerns an already included project, attach useful corroboration to its Project/Deal/Contract ID rather than creating a duplicate event.

### I. Residual search

Run at least three materially different batches after the last new item. Rotate synonyms, languages/scripts, companies, sectors, official domains, counterparties, capacity/value, and package numbers. One batch must omit China/Chinese terms; another must remove all negative keywords. Use exclusions for already-found projects only after a broad unfiltered pass.

### J. Omission audit

Revisit every zero-candidate country, weak source family, new company alias, near-match exclusion and downstream lead whose earlier event remains unresolved. Compare company disclosures with host awards, environmental/land records, annual reports and counterparty announcements. Reopen discovery whenever the audit yields a lead.

Run broad negative-search tests (`Chinese contractor awarded`, `selected contractor`, `contract award`, `foreign investor`, and local equivalents) without limiting results to the company alias ledger. Search MOU, preferred bidder, financial close, notice to proceed, groundbreaking, commissioning, and equipment-supply terms as discovery leads; classify rather than automatically include them.

## Completion checkpoint

Before moving to the next region:

- reconcile candidate, exclusion, and duplicate statuses;
- complete or explain every coverage-matrix cell;
- write and validate the region CSV;
- record languages, exact query batches, pages opened, blocked sources, inclusions/exclusions, and limitations;
- document the downstream time window, milestone families searched and disposition of every later-milestone lead;
- satisfy all saturation gates in `coverage-protocol.md`.
