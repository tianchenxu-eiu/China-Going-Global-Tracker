'use client';

import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { CalendarRange, Database, Globe2, MapPinned, TrendingUp } from 'lucide-react';
import data from './data/projects.json';
import { WorldMap, type MapProject } from './world-map';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

type Category = 'Direct Investment' | 'Contracted Construction';
type Metric = 'Project Count' | 'Project Value';
type MapCategory = 'All' | Category;

const months = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(Date.UTC(2024, i, 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
});
const formatMonth = (value: string) => value.replace('-', '/');
const compactValue = (value: number) => value >= 1e9 ? `$${(value / 1e9).toFixed(1)}bn` : `$${Math.round(value / 1e6)}m`;
const subregions = [...new Set(data.projects.map(project => project.subregion).filter(Boolean))].sort();
const secondaryIndustries = [...new Set(data.projects.map(project => project.secondaryIndustry).filter(Boolean))].sort();

export default function Home() {
  const [category, setCategory] = useState<Category>('Direct Investment');
  const [metric, setMetric] = useState<Metric>('Project Count');
  const [trendRange, setTrendRange] = useState([0, months.length - 1]);
  const [range, setRange] = useState([0, months.length - 1]);
  const [mapCategory, setMapCategory] = useState<MapCategory>('All');
  const [mapSubregion, setMapSubregion] = useState('All');
  const [mapIndustry, setMapIndustry] = useState('All');

  const trend = useMemo(() => months.slice(trendRange[0], trendRange[1] + 1).map(month => {
    const rows = data.projects.filter(p => p.month === month && p.primaryCategory === category);
    return {
      month,
      value: metric === 'Project Count' ? rows.length : rows.reduce((sum, p) => sum + (p.valueUsd || 0), 0) / 1e9,
      disclosed: rows.filter(p => p.valueUsd != null).length,
      records: rows.length,
    };
  }), [category, metric, trendRange]);

  const selectedProjects = useMemo(() => data.projects.filter(project =>
    project.month >= months[range[0]] &&
    project.month <= months[range[1]] &&
    (mapCategory === 'All' || project.primaryCategory === mapCategory) &&
    (mapSubregion === 'All' || project.subregion === mapSubregion) &&
    (mapIndustry === 'All' || (mapIndustry === 'Not classified' ? !project.secondaryIndustry : project.secondaryIndustry === mapIndustry))
  ) as MapProject[], [range, mapCategory, mapSubregion, mapIndustry]);
  const selectedDi = selectedProjects.filter(p => p.primaryCategory === 'Direct Investment').length;
  const selectedCc = selectedProjects.filter(p => p.primaryCategory === 'Contracted Construction').length;
  const selectedValue = selectedProjects.reduce((sum, p) => sum + (p.valueUsd || 0), 0);
  const currentRows = data.projects.filter(p => p.primaryCategory === category && p.month >= months[trendRange[0]] && p.month <= months[trendRange[1]]);
  const currentValueDisclosure = currentRows.filter(p => p.valueUsd != null).length;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1540px] px-4 py-6 sm:px-6 lg:px-9 lg:py-8">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-5 border-b border-border/80 pb-6">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"><Globe2 className="size-4" /> ODI Intelligence</div>
            <h1 className="font-heading text-3xl font-semibold tracking-[-0.045em] md:text-5xl">China Going Global</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">A monthly view of Chinese overseas investment and contracted construction · January 2024–June 2026</p>
          </div>
          <div className="flex gap-7 text-right">
            <div><div className="text-3xl font-semibold tabular-nums">{data.projects.length.toLocaleString()}</div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">project records</div></div>
            <div><div className="text-3xl font-semibold tabular-nums">30</div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">months covered</div></div>
          </div>
        </header>

        <section aria-labelledby="trend-heading">
          <Card className="border-0 shadow-[0_16px_50px_rgba(21,35,50,.07)]">
            <CardHeader className="gap-5 border-b border-border/70 pb-5 xl:grid xl:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary"><TrendingUp className="size-4" /> Module 01</div>
                <CardTitle id="trend-heading" className="text-xl">Overall trend</CardTitle>
                <CardDescription>Switch both dimensions to compare monthly activity and disclosed project value.</CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Tabs value={category} onValueChange={value => setCategory(value as Category)} aria-label="Project category">
                  <TabsList className="h-10 bg-muted/70"><TabsTrigger value="Direct Investment" className="px-4">Direct Investment</TabsTrigger><TabsTrigger value="Contracted Construction" className="px-4">Contracted Construction</TabsTrigger></TabsList>
                </Tabs>
                <Tabs value={metric} onValueChange={value => setMetric(value as Metric)} aria-label="Trend measure">
                  <TabsList className="h-10 bg-muted/70"><TabsTrigger value="Project Count" className="px-4">Project Count</TabsTrigger><TabsTrigger value="Project Value" className="px-4">Project Value</TabsTrigger></TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-5 rounded-xl bg-muted/55 px-4 py-3">
                <div className="mb-3 flex items-center justify-between gap-4 text-xs"><span className="flex items-center gap-2 font-semibold"><CalendarRange className="size-4 text-primary" /> Trend time range</span><span className="font-mono text-[12px] text-muted-foreground">{formatMonth(months[trendRange[0]])} — {formatMonth(months[trendRange[1]])}</span></div>
                <div className="dual-range" aria-label="Trend time range">
                  <div className="dual-range-track" />
                  <div className="dual-range-active" style={{ left: `${trendRange[0] / (months.length - 1) * 100}%`, right: `${100 - trendRange[1] / (months.length - 1) * 100}%` }} />
                  <input type="range" min={0} max={months.length - 1} step={1} value={trendRange[0]} aria-label="Trend start month" onChange={event => setTrendRange([Math.min(Number(event.target.value), trendRange[1]), trendRange[1]])} />
                  <input type="range" min={0} max={months.length - 1} step={1} value={trendRange[1]} aria-label="Trend end month" onChange={event => setTrendRange([trendRange[0], Math.max(Number(event.target.value), trendRange[0])])} />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>2024/01</span><span>2025/01</span><span>2026/06</span></div>
              </div>
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
                <div><span className="text-2xl font-semibold">{category}</span><span className="ml-2 text-sm text-muted-foreground">· {metric}</span></div>
                {metric === 'Project Value' && <div className="text-xs text-muted-foreground">Values shown in USD billions · {currentValueDisclosure}/{currentRows.length} records disclose value</div>}
              </div>
              <ChartContainer config={{ value: { label: metric, color: category === 'Direct Investment' ? 'var(--chart-2)' : 'var(--chart-1)' } }} className="h-[390px] w-full aspect-auto">
                <AreaChart data={trend} margin={{ left: 2, right: 18, top: 14, bottom: 0 }}>
                  <defs><linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-value)" stopOpacity={0.28}/><stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.02}/></linearGradient></defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 6" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} interval={Math.max(0, Math.floor(trend.length / 10) - 1)} minTickGap={24} tickFormatter={formatMonth} />
                  <YAxis tickLine={false} axisLine={false} width={58} tickFormatter={v => metric === 'Project Value' ? `$${v}bn` : String(v)} />
                  <ChartTooltip cursor={{ stroke: 'var(--border)', strokeWidth: 1 }} content={<ChartTooltipContent labelFormatter={label => formatMonth(String(label))} formatter={(value, _name, item) => <div className="flex min-w-44 justify-between gap-4"><span>{metric}</span><strong>{metric === 'Project Value' ? `$${Number(value).toFixed(2)}bn` : `${value} projects`}</strong>{metric === 'Project Value' && <span className="text-muted-foreground">{item.payload.disclosed}/{item.payload.records} disclosed</span>}</div>} />} />
                  <Area type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2.5} fill="url(#trend-fill)" dot={false} activeDot={{ r: 5, strokeWidth: 3 }} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="map-heading" className="mt-6">
          <Card className="border-0 shadow-[0_16px_50px_rgba(21,35,50,.07)]">
            <CardHeader className="gap-5 border-b border-border/70 pb-5 xl:grid xl:grid-cols-[1fr_540px]">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary"><MapPinned className="size-4" /> Module 02</div>
                <CardTitle id="map-heading" className="text-xl">Project map</CardTitle>
                <CardDescription>Hover for project details. Scroll to zoom, drag to pan, or use the map controls.</CardDescription>
              </div>
              <div className="rounded-xl bg-muted/55 px-4 py-3">
                <div className="mb-3 flex items-center justify-between gap-4 text-xs"><span className="flex items-center gap-2 font-semibold"><CalendarRange className="size-4 text-primary" /> Time range</span><span className="font-mono text-[12px] text-muted-foreground">{formatMonth(months[range[0]])} — {formatMonth(months[range[1]])}</span></div>
                <div className="dual-range" aria-label="Map time range">
                  <div className="dual-range-track" />
                  <div className="dual-range-active" style={{ left: `${range[0] / (months.length - 1) * 100}%`, right: `${100 - range[1] / (months.length - 1) * 100}%` }} />
                  <input type="range" min={0} max={months.length - 1} step={1} value={range[0]} aria-label="Start month" onChange={event => setRange([Math.min(Number(event.target.value), range[1]), range[1]])} />
                  <input type="range" min={0} max={months.length - 1} step={1} value={range[1]} aria-label="End month" onChange={event => setRange([range[0], Math.max(Number(event.target.value), range[0])])} />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>2024/01</span><span>2025/01</span><span>2026/06</span></div>
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="mb-4 grid gap-3 rounded-xl border border-border/70 bg-muted/35 p-4 md:grid-cols-3">
                <label className="grid gap-1.5 text-[11px] font-semibold uppercase tracking-[0.11em] text-muted-foreground">
                  Primary category
                  <NativeSelect value={mapCategory} onChange={event => setMapCategory(event.target.value as MapCategory)} className="w-full normal-case tracking-normal text-foreground">
                    <NativeSelectOption value="All">All categories</NativeSelectOption>
                    <NativeSelectOption value="Direct Investment">Direct Investment</NativeSelectOption>
                    <NativeSelectOption value="Contracted Construction">Contracted Construction</NativeSelectOption>
                  </NativeSelect>
                </label>
                <label className="grid gap-1.5 text-[11px] font-semibold uppercase tracking-[0.11em] text-muted-foreground">
                  Region · secondary
                  <NativeSelect value={mapSubregion} onChange={event => setMapSubregion(event.target.value)} className="w-full normal-case tracking-normal text-foreground">
                    <NativeSelectOption value="All">All secondary regions</NativeSelectOption>
                    {subregions.map(subregion => <NativeSelectOption key={subregion} value={subregion}>{subregion}</NativeSelectOption>)}
                  </NativeSelect>
                </label>
                <label className="grid gap-1.5 text-[11px] font-semibold uppercase tracking-[0.11em] text-muted-foreground">
                  Industry · secondary
                  <NativeSelect value={mapIndustry} onChange={event => setMapIndustry(event.target.value)} className="w-full normal-case tracking-normal text-foreground">
                    <NativeSelectOption value="All">All secondary industries</NativeSelectOption>
                    {secondaryIndustries.map(industry => <NativeSelectOption key={industry} value={industry}>{industry}</NativeSelectOption>)}
                    <NativeSelectOption value="Not classified">Not classified</NativeSelectOption>
                  </NativeSelect>
                </label>
              </div>
              <div className="mb-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                <div className="stat"><Database /><span><strong>{selectedProjects.length.toLocaleString()}</strong><small>visible projects</small></span></div>
                <div className="stat"><i className="size-3 rounded-full bg-[#e14d43]" /><span><strong>{selectedDi.toLocaleString()}</strong><small>direct investment</small></span></div>
                <div className="stat"><i className="size-3 rounded-full bg-[#2671b8]" /><span><strong>{selectedCc.toLocaleString()}</strong><small>contracted construction</small></span></div>
                <div className="stat"><TrendingUp /><span><strong>{compactValue(selectedValue)}</strong><small>disclosed value</small></span></div>
              </div>
              <WorldMap projects={selectedProjects} />
              <div className="mt-3 flex flex-wrap justify-between gap-2 text-[11px] text-muted-foreground"><span>Location method: city-name match when available; otherwise deterministic within-country placement.</span><span>{data.coordinateQuality.cityMatched} city-level matches · {data.coordinateQuality.countryPlaced} country-level placements</span></div>
            </CardContent>
          </Card>
        </section>

        <footer className="mt-6 flex flex-wrap justify-between gap-2 px-1 text-[11px] text-muted-foreground"><span>Source: {data.sourceWorkbook}</span><span>Project value uses disclosed primary investment/contract value; blanks are not imputed.</span></footer>
      </div>
    </main>
  );
}
