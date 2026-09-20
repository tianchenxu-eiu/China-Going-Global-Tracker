# Sources, URL Rules, and FX Conversion

## Source rules

Every included row needs at least one decisive webpage URL in the main table. Use the actual article, filing, notice, or PDF URL—not a search result, homepage, cached page, or footnote marker.

When a source is a PDF, link the PDF URL directly. Record page/section details in `Source_Log`, not in the URL cell.

If several URLs are needed, place complete URLs on separate lines in the same `Source Webpage URL` cell. Put the strongest source first.

### Mandatory Chinese source family

Review the Belt and Road Portal's `中企海外项目周报/双周报` archive for every period overlapping the month. It covers the full project lifecycle, so do not copy progress, start, completion, or operation items unless they contain a separately qualifying new award/investment.

Treat `bhi.com.cn` as a lead generator when the non-member view is truncated, summary-only, image-only, or otherwise insufficient for enrichment. A BHI mention does not waive normal verification or field-enrichment work. For every BHI lead:

- search outside `bhi.com.cn` by project name, company aliases/subsidiaries, owner/counterparty, destination/locality, capacity, package/lot number, and distinctive wording;
- prefer accessible primary sources or decisive host-country sources for event date, Chinese-company role, binding stage, scope, amount, and completion timing;
- put the strongest accessible verification source first in `Source Webpage URL`, and retain the BHI URL in `Source_Log` as the discovery source;
- never fill a field from an inaccessible snippet or inference;
- if no alternative source can be found, keep only directly visible facts, leave unsupported fields blank, document the limitation and search attempts, and retain the project when it is otherwise verified and in scope.

### Primary-source examples

- official Chinese company newsroom or securities filing;
- host procurement award notice or ministry statement;
- project owner/client release;
- investment-promotion or competition-regulator filing;
- exchange announcement;
- lender/MDB/ECA project notice that clearly states award/ownership.

## URL hygiene

Accept only URLs that:

- start with `http://` or `https://`;
- resolve to the source page/document;
- are not URL shorteners;
- are not a search-results page;
- are not a local file path;
- do not contain tracking parameters when a clean canonical URL is available.

Strip common tracking parameters such as `utm_source`, `utm_medium`, `utm_campaign`, `fbclid`, and `gclid` while preserving parameters required to reach the document.

## FX hierarchy

Convert a non-USD original value to USD using this order:

1. an explicit USD equivalent supplied in the same authoritative announcement/filing;
2. the destination/source central bank's official daily rate or an official USD reference rate;
3. ECB reference data for supported currencies;
4. IMF representative exchange-rate data;
5. another reputable, date-specific market-data source when official data are unavailable.

Use the announcement date. If it is a weekend/holiday or no rate is published, use the closest preceding business day. Do not use today's rate for a historical announcement.

## Rate convention and calculation

Record in `FX_Log`:

- project name;
- announcement date;
- original currency code;
- original numeric amount;
- FX rate date;
- rate convention, e.g. `1 EUR = 1.0854 USD` or `1 USD = 7.10 CNY`;
- USD calculation;
- rounded USD result;
- FX source URL;
- notes.

Examples:

- If `1 EUR = 1.0854 USD`, then `USD = EUR amount × 1.0854`.
- If `1 USD = 7.10 CNY`, then `USD = CNY amount ÷ 7.10`.

Round the final primary value to the nearest whole USD. Do not imply extra precision in the note; for very large approximate values, describe them sensibly (for example, `about US$1.2bn`).

## Special cases

- If the authoritative source already gives local currency and an approximate USD equivalent, use its USD equivalent and record `Source-provided conversion` in `FX_Log`.
- If the original amount is USD, no FX-log row is required, but preserve the original USD expression in the secondary-value cell if useful.
- If the source gives a range and no single USD number, leave the primary numeric cell blank; preserve the range in the secondary-value cell.
- If the source gives `up to`, `at least`, or `more than`, the numeric primary cell may contain the disclosed bound after conversion, while the qualifier remains explicit in the secondary cell and note.
- Use ISO currency codes (`EUR`, `GBP`, `CNY`, `SAR`, etc.) where identifiable. For obsolete/redenominated currencies, use the contemporaneous code and explain.
- Never convert capacity, financing envelopes, revenue forecasts, or total programme budgets as though they were the project award/investment amount.
