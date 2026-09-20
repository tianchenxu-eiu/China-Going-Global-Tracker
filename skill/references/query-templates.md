# Multilingual Query Templates

Replace placeholders and use local month names plus numeric dates. Run investment and construction queries separately. Search exact phrases and looser combinations; search engines interpret Boolean syntax inconsistently.

## Axis templates

```text
destination: "{MONTH_LOCAL} {YEAR}" {LOCAL_CHINA_TERM} ({LOCAL_AWARD_TERM} OR {LOCAL_INVEST_TERM}) {LOCAL_COUNTRY}
company: "{COMPANY_OR_ALIAS}" ({AWARD_TERM} OR {INVEST_TERM}) {COUNTRY} {YEAR}
sector: {LOCAL_PROJECT_TYPE} ({AWARDED_TERM} OR {INVESTMENT_TERM}) {LOCAL_COUNTRY} {MONTH_LOCAL} {YEAR}
source: site:{DOMAIN} ({COMPANY_OR_ALIAS} OR {LOCAL_CHINA_TERM}) ({AWARD_TERM} OR {INVEST_TERM})
no-China: site:{PROCUREMENT_OR_OWNER_DOMAIN} ({AWARDED_TERM} OR {SIGNED_TERM}) {SECTOR_OR_PROJECT_TYPE}
post-event-backtrace: "{PROJECT_OR_COMPANY_OR_SECTOR}" ({SIGNED_OR_LAND_OR_EIA_OR_FINANCING_OR_CONSTRUCTION_OR_OPERATION_TERM}) {COUNTRY} after:{MONTH_END}
backtrace-to-target: "{PROJECT_OR_COMPANY}" ("announced in {TARGET_MONTH_YEAR}" OR "awarded in {TARGET_MONTH_YEAR}" OR "approved in {TARGET_MONTH_YEAR}" OR "since {TARGET_MONTH_YEAR}")
official-backtrace: site:{GOV_OWNER_PROCUREMENT_EIA_LENDER_DOMAIN} ({CONSTRUCTION_OR_OPERATION_TERM}) ({PROJECT_OR_LOCATION_OR_CAPACITY})
```

Use date operators only as hints. Inspect actual page and event dates. Run one unfiltered batch before applying `-completed`, `-opened`, or similar exclusions.

## English

Qualifying award: `awarded`, `contract award`, `successful bidder`, `won the bid`, `won the tender`, `letter of award`, `notice of award`, `中标`, `授标`, `中标通知书`.

Discovery-only construction follow-up: `appointed contractor`, `signed EPC`, `contract signing`, `notice to proceed`, `design-build`, `turnkey`, `concession`, `PPP`. These terms may find leads but do not establish inclusion without separate bid-award evidence.

Downstream backtrace: `land acquired`, `site allocated`, `investment registered`, `permit approved`, `EIA approved`, `financial close`, `notice to proceed`, `construction started`, `groundbreaking`, `under construction`, `equipment installation`, `trial production`, `commissioned`, `completed`, `opened`, `operational`, `annual report`, `previously announced`, `awarded in`, `approved in`, `since`. Search these from month-end through the research date, then trace each lead backward to the qualifying commitment or award.

Investment: `invest`, `greenfield`, `factory`, `plant`, `acquire`, `takeover`, `stake purchase`, `joint venture`, `capital injection`, `capacity expansion`, `new phase`.

## Chinese

```text
{YEAR}年{MONTH}月 {COUNTRY} 中企 中标 项目
{YEAR}年{MONTH}月 {COUNTRY} 中国企业 签约 合同
{YEAR}年{MONTH}月 {COUNTRY} 投资 建厂 收购 增资 扩建
site:yidaiyilu.gov.cn {YEAR} {MONTH} 中企海外项目周报
site:sasac.gov.cn {COUNTRY} 中标 签约 投资 收购
"{COMPANY}" {COUNTRY} 中标 OR 签约 OR 投资 OR 收购
"{COMPANY_OR_PROJECT}" {COUNTRY} 签约 OR 拿地 OR 环评 OR 融资 OR 开工 OR 建设 OR 投产 OR 运营
"{COMPANY_OR_PROJECT}" 于{YEAR}年{MONTH}月 宣布 OR 获批 OR 中标 OR 授标
site:{GOV_OWNER_PROCUREMENT_EIA_DOMAIN} "{PROJECT_OR_LOCATION}" 开工 OR 投产 OR 运营 OR 年报
```

Award terms: `中标`, `成功中标`, `获授合同`, `签署合同`, `签约`, `EPC总承包`. Investment terms: `投资建设`, `拟投资`, `收购`, `增资`, `扩建`, `合资`, `股权交割`. Downstream terms: `拿地`, `供地`, `环评获批`, `获得许可`, `融资关闭`, `开工`, `奠基`, `建设中`, `试生产`, `投产`, `竣工`, `运营`, `年报披露`, `此前宣布`, `于某月中标`.

## French

Award: `contrat attribué`, `adjudication`, `marché remporté`, `attributaire`, `signature du contrat`. Investment: `investissement`, `acquisition`, `prise de participation`, `coentreprise`, `extension`, `nouvelle usine`.

## Spanish

Award: `contrato adjudicado`, `adjudicación`, `licitación ganada`, `empresa adjudicataria`, `contrato firmado`. Investment: `inversión`, `adquisición`, `participación`, `empresa conjunta`, `ampliación`, `nueva planta`.

## Portuguese

Award: `contrato adjudicado`, `venceu a licitação`, `empresa vencedora`, `assinou contrato`. Investment: `investimento`, `aquisição`, `participação`, `joint venture`, `expansão`, `nova fábrica`.

## German

Award: `Zuschlag`, `Auftragsvergabe`, `Ausschreibung gewonnen`, `Vertrag unterzeichnet`. Investment: `Investition`, `Übernahme`, `Beteiligung`, `Gemeinschaftsunternehmen`, `Erweiterung`, `neues Werk`.

## Russian

Award: `китайская компания выиграла тендер`, `контракт присужден`, `победитель тендера`, `подписала контракт`. Investment: `китайские инвестиции`, `приобретение`, `доля`, `совместное предприятие`, `расширение`, `новый завод`.

## Arabic

Award: `شركة صينية تفوز بعقد`, `ترسية العقد`, `فازت بالمناقصة`, `توقيع العقد`. Investment: `استثمار صيني`, `استحواذ`, `حصة`, `مشروع مشترك`, `توسعة`, `مصنع جديد`.

## Turkish

Award: `Çinli şirket ihaleyi kazandı`, `ihale verildi`, `sözleşme imzaladı`. Investment: `Çin yatırımı`, `satın alma`, `hisse`, `ortak girişim`, `kapasite artışı`, `yeni fabrika`.

## Japanese

Award: `中国企業 受注`, `落札`, `契約締結`, `EPC契約`. Investment: `中国企業 投資`, `買収`, `出資`, `合弁会社`, `増設`, `新工場`.

## Korean

Award: `중국 기업 수주`, `낙찰`, `계약 체결`, `EPC 계약`. Investment: `중국 투자`, `인수`, `지분`, `합작회사`, `증설`, `신공장`.

## Vietnamese

Award: `công ty Trung Quốc trúng thầu`, `được trao hợp đồng`, `ký hợp đồng`. Investment: `đầu tư Trung Quốc`, `mua lại`, `góp vốn`, `liên doanh`, `mở rộng`, `nhà máy mới`.

## Indonesian / Malay

Award: `perusahaan China memenangkan tender`, `dianugerahkan kontrak`, `menandatangani kontrak`; `syarikat China memenangi tender`, `dianugerahkan kontrak`. Investment: `investasi/pelaburan`, `akuisisi/pemerolehan`, `usaha sama`, `ekspansi/pengembangan`, `pabrik/kilang baru`.

## Additional languages

For languages not listed, translate the semantic term sets above into the country's official/widely used language. Use both local script and Latin transliteration, keep company names in their original and English forms, and record exact queries in `query_log.csv`.
