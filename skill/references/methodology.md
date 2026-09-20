# Methodology and Decision Rules

## 1. Research objective

Identify public announcements in one target month concerning:

1. **new overseas direct investment by mainland-China-controlled companies**, and
2. **newly won or awarded overseas contracted-construction projects by mainland-China-controlled companies**.

The dataset is event-based. It is not a stock of all projects under construction and is not a list of completed projects.

## 2. Meaning of a Chinese company

Include an entity when a mainland Chinese corporate parent ultimately controls it, including an overseas subsidiary, locally incorporated project company, or Hong Kong-listed subsidiary controlled by a mainland parent. Include a consortium when at least one qualifying Chinese company is expressly named.

Exclude:

- a Hong Kong, Macao, or Taiwan company with no demonstrated mainland Chinese control;
- a project merely financed by a Chinese bank when no Chinese investor or contractor is involved;
- a foreign company that only sources Chinese equipment;
- a local contractor whose Chinese ownership is speculative.

When ownership is not obvious, verify it through a corporate filing, official group page, exchange filing, or reliable company profile.

## 3. Announcement month

The target month is based on the earliest verifiable public announcement of the qualifying investment commitment or contract award.

Priority for the date:

1. official bid-award date for Contracted Construction, or official investment-commitment date for Direct Investment;
2. official filing or press-release date;
3. first reliable public report date, if the event date is omitted.

A later signing article may prove an earlier in-month award, but the award is the qualifying construction event and controls the month. A page published in-month that describes an award from an earlier month does not qualify. Never infer a day from a month-only statement.

## 4. Direct Investment

### Include

- greenfield factories, mines, power plants, data centres, logistics assets, commercial property, farms, hospitals, and other operating assets;
- acquisitions of companies, equity stakes, concessions, or operating assets;
- newly formed joint ventures with a concrete overseas project or committed capital;
- incremental investment to expand an existing overseas operation;
- a new phase when it has a separately announced commitment, asset scope, or amount.

### Exclude

- completion, commissioning, opening, handover, or production-start announcements where the investment was announced earlier;
- non-binding MoUs, general cooperation agreements, market-entry intentions, feasibility studies, or site searches;
- loans, export credits, grants, or bond financing without a Chinese equity investment;
- routine branch registration, representative offices, distributors, sales agreements, and ordinary retail-store openings unless presented as a material fixed-asset or equity investment project;
- equipment exports, licensing, and technology sales without ownership or capital commitment;
- portfolio purchases without a disclosed strategic/controlling investment project.

### Secondary category

- **Greenfield Investment:** a new operating asset or new project company; a new JV for a concrete project normally belongs here.
- **Merger & Acquisition:** purchase of shares, business, concession, or existing assets.
- **Reinvestment:** incremental capital, capacity expansion, or a separately funded new phase at an existing overseas operation.
- **Others:** a qualifying investment that cannot honestly be assigned above; explain why.

## 5. Contracted Construction

### Include

- confirmed successful bid/tender, contract award, notice of award, letter of award, `中标`, `授标`, or `中标通知书`;
- a substantive construction subcontract when the Chinese company's package is specifically awarded;
- BOT/BOOT/PPP/concession construction awards only when the Chinese company is expressly awarded the construction role/package.

### Exclude

- tender launch, bid submission, prequalification, shortlist, preferred-bidder status without final award, or negotiations;
- a signed works/EPC/design-build/turnkey contract, contract execution, contractor appointment, notice to proceed, or commencement when no reliable source proves the company won or was awarded that construction contract;
- MoU, framework agreement, strategic partnership, or cooperation protocol with no binding project award;
- pure design consultancy, supervision, feasibility study, equipment supply, rolling-stock supply, or O&M unless construction is a material contracted component;
- construction commencement, milestone, tunnel breakthrough, topping-out, delivery, completion, opening, operation, or maintenance update for a previously awarded contract;
- refinancing, variation order, or extension unless it is a distinct newly awarded package with new scope/value.

### Secondary category

- **EPC:** EPC, EPCM with material construction responsibility, turnkey, or design-build.
- **BOT/PPP:** BOT, BOOT, DBFOM, PPP, concession, or similar public-private delivery structure when treated as a contracted-construction event.
- **Others:** conventional construction, works-only, subcontract, or another confirmed award.

## 6. Mixed investment and construction

Use economic substance and prevent double counting:

- If a Chinese entity invests equity and separately receives an EPC contract, create two rows only when the roles/amounts are separately disclosed and analytically useful.
- If the project is a concession led by a Chinese investor but no separate EPC value exists, normally use one Direct Investment row.
- If the Chinese company is only the contractor in a PPP/BOT consortium, use Contracted Construction / BOT/PPP.
- State the other role and any overlap risk in `Note`.

## 7. Values

Amount availability is never part of the inclusion test. If the company role, event stage, destination, and announcement timing establish that an event is in scope, include it even when every available source omits the investment or contract value. Leave all amount fields blank; do not move the event to `Candidates` or `Exclusion_Log` merely to obtain a value.

### Direct investment hierarchy

1. Chinese investor's disclosed committed amount;
2. Chinese attributable amount calculated from a disclosed stake and total consideration;
3. full announced project/transaction value when the Chinese share is unknown, with a clear note;
4. blank when no defensible monetary value is disclosed.

### Contract hierarchy

1. Chinese contractor's awarded contract value;
2. consortium award value if the Chinese share is unknown, with a clear note;
3. full project cost only when the source clearly equates it with the awarded contract; otherwise leave blank.

Do not substitute financing size, market capitalisation, capacity, expected revenue, or an unrelated programme budget for the investment/contract value.

Apply no minimum monetary threshold. A blank or small value, private or unfamiliar company, subcontract, or local-media source is not an exclusion reason.

Missing output fields are not exclusion criteria. A verified in-scope event may have a blank amount, completion date, or mainland parent province. When project category or another fact needed to establish eligibility remains unresolved, keep the lead in `Candidates` and continue verification; do not move it to `Exclusion_Log` merely for incompleteness.

For a range, preserve the range in the original-value column and leave the USD numeric cell blank unless an authoritative source supplies a single USD equivalent. For `up to`, `more than`, or `at least`, the numeric cell may contain the stated bound; preserve the qualifier in the original-value cell and explain it in `Note`.

## 8. Geography and EIU convention

The user's seven regions and 18 subregions are controlling. Public EIU materials use broad labels such as Europe, Asia-Pacific, North America, Latin America and the Caribbean, and Middle East/Africa, but a freely accessible exhaustive country mapping matching the requested taxonomy was not located. The bundled map is therefore an operational crosswalk rather than a claim of proprietary EIU taxonomy.

Key operational decisions:

- Mexico: Latin America and the Caribbean / Central America.
- Turkey: Middle East / Middle East.
- Armenia, Azerbaijan, and Georgia: Europe / non-EU Europe (excl Russia).
- Egypt and Sudan: Africa / North Africa.
- Russia: Europe / Russia.
- Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, Uzbekistan: Central Asia / Central Asia.
- Territories are generally assigned by geographic location rather than metropolitan sovereign.

Do not override the map silently. Log an ambiguous destination in `Coverage_Log` and update the map explicitly if needed.

## 9. Industry classification

For Direct Investment, classify the economic activity of the overseas operating asset—not the construction method—using the Level I section of GB/T 4754-2017. A mine is `B Mining`; a battery factory is `C Manufacturing`; a solar generation asset is `D Production and supply of electricity, heat, gas and water`; a data-centre operator is generally `I Information transmission, software and information technology services`.

Use `Secondary Industry` only when a second Level I activity is material and explicit, such as a mine plus a separately scoped processing plant. Do not use it merely to add detail.

For Contracted Construction, use only the bespoke construction list. See `output-schema.md` for boundary examples.

## 10. Source quality

Use the strongest available evidence. A qualifying row normally needs one decisive source and, for high-risk facts, one independent corroboration.

Source priority:

1. host government/procurement authority, official company release, securities filing, competition/foreign-investment regulator;
2. project owner/counterparty, lender/MDB/ECA, official investment agency;
3. reputable local or international business/news outlet;
4. Chinese government/embassy/industry portal that clearly attributes an underlying source;
5. trade press.

Social media, repost farms, AI summaries, scraped databases, and search snippets may generate leads but must not be the sole evidence.

## 11. Deduplication

Track three identifiers:

- `Project ID`: the overall physical asset, programme, or acquisition target;
- `Deal/Contract ID`: a distinct lot, package, phase, investment tranche, acquisition, or contract;
- `Event ID`: a specific qualifying bid award or investment announcement. Contract signing alone is not a qualifying construction Event ID.

Possible duplicate key within the same event:

`normalized destination + normalized project + normalized Chinese company/consortium + category + event stage`

Dates and transliterations may differ. Compare scope, location, counterparty, capacity, package/lot, contract type, Chinese role, phase, event stage, and value. Keep the earliest qualifying event and strongest URLs. When the same construction contract has both an award and a later signing disclosure, keep the award record/date and treat signing as corroboration rather than a second qualifying event. Never merge separate lots, phases, investors, contractor roles, or investment and EPC transactions solely because the project name matches.

## 12. Candidate retention

Keep plausible but unresolved leads in `Candidates`, including non-binding MOU/framework, preferred bidder, signed construction contract without bid-award evidence, preliminary investment intention, equipment supply with possible construction, missing ownership proof, unclear event month, or insufficient source reliability. Record missing evidence and the next verification query. Do not promote these rows to `Projects` until they pass the inclusion test; do not delete them merely because they are incomplete.

## 13. Search saturation

A region is complete only after:

- all countries/territories in the region map have been considered;
- all mandatory source families have been searched;
- relevant local languages have been used;
- every overlapping Belt and Road Portal weekly/biweekly update has been reviewed;
- three residual query batches using different destination-, company-, sector-, and source-first axes produce no new qualifying projects;
- candidate and exclusion ledgers reconcile.

Record limitations honestly, including blocked websites, paywalls, weak indexing, language gaps, or unavailable archives.

Apply every quantitative gate in `coverage-protocol.md`. Reopen zero-candidate countries unless a second-pass omission audit explains the result. Never infer saturation from a small number of included rows.
