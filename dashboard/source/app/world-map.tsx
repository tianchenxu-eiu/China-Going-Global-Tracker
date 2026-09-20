'use client';

import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import atlas from 'world-atlas/countries-110m.json';
import { LocateFixed, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type MapProject = {
  id: number; investor: string; date: string; month: string; country: string; project: string;
  valueUsd: number | null; primaryCategory: string; secondaryCategory: string; note: string;
  lon: number; lat: number; locationLabel: string; locationPrecision: string;
};

const topology = atlas as unknown as { objects: { countries: object } };
const world = feature(topology as never, topology.objects.countries as never) as unknown as GeoJSON.FeatureCollection;
const projection = geoNaturalEarth1().fitExtent([[16, 18], [984, 482]], world);
const path = geoPath(projection);

const formatUsd = (value: number | null) => value == null
  ? 'Not disclosed'
  : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 2 }).format(value);

export function WorldMap({ projects }: { projects: MapProject[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const [hovered, setHovered] = useState<{ project: MapProject; x: number; y: number } | null>(null);
  const countries = useMemo(() => world.features.map((shape, i) => <path key={i} d={path(shape) || ''} className="map-country" />), []);
  const plotted = useMemo(() => projects.map(project => ({ project, point: projection([project.lon, project.lat]) })), [projects]);

  const moveTooltip = (event: React.MouseEvent, project: MapProject) => {
    const box = containerRef.current?.getBoundingClientRect();
    if (!box) return;
    setHovered({ project, x: Math.min(event.clientX - box.left + 14, box.width - 390), y: Math.min(event.clientY - box.top + 14, box.height - 310) });
  };
  const zoom = (factor: number) => setView(v => ({ ...v, k: Math.max(1, Math.min(8, v.k * factor)) }));
  const onWheel = (event: WheelEvent<SVGSVGElement>) => { event.preventDefault(); zoom(event.deltaY < 0 ? 1.16 : 0.86); };
  const onPointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, tx: view.x, ty: view.y };
  };
  const onPointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current;
    if (drag) setView(v => ({ ...v, x: drag.tx + event.clientX - drag.x, y: drag.ty + event.clientY - drag.y }));
  };

  return (
    <div ref={containerRef} className="relative h-[clamp(430px,62vw,690px)] overflow-hidden rounded-xl bg-[#eaf3f4]">
      <svg viewBox="0 0 1000 500" className="h-full w-full cursor-grab touch-none active:cursor-grabbing" role="img" aria-label={`World map showing ${projects.length} projects`} onWheel={onWheel} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={() => dragRef.current = null} onPointerCancel={() => dragRef.current = null}>
        <rect width="1000" height="500" fill="#eaf3f4" />
        <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
          <g>{countries}</g>
          <g>
            {plotted.map(({ project, point }) => point && (
              <circle key={project.id} cx={point[0]} cy={point[1]} r={Math.max(1.3, 3.3 / Math.sqrt(view.k))} className={project.primaryCategory === 'Direct Investment' ? 'marker marker-di' : 'marker marker-cc'} onMouseEnter={e => moveTooltip(e, project)} onMouseMove={e => moveTooltip(e, project)} onMouseLeave={() => setHovered(null)} />
            ))}
          </g>
        </g>
      </svg>

      <div className="absolute left-4 top-4 flex flex-col gap-1 rounded-xl border border-white/80 bg-white/90 p-1 shadow-lg backdrop-blur">
        <Button size="icon-sm" variant="ghost" aria-label="Zoom in" onClick={() => zoom(1.35)}><Plus /></Button>
        <Button size="icon-sm" variant="ghost" aria-label="Zoom out" onClick={() => zoom(0.74)}><Minus /></Button>
        <Button size="icon-sm" variant="ghost" aria-label="Reset map" onClick={() => setView({ x: 0, y: 0, k: 1 })}><LocateFixed /></Button>
      </div>
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 rounded-full border border-white/80 bg-white/90 px-4 py-2 text-xs font-medium shadow-lg backdrop-blur">
        <span className="flex items-center gap-2"><i className="size-2.5 rounded-full bg-[#e14d43]" />Direct investment</span>
        <span className="flex items-center gap-2"><i className="size-2.5 rounded-full bg-[#2671b8]" />Contracted construction</span>
      </div>

      {hovered && (
        <div className="pointer-events-none absolute z-20 w-[min(370px,calc(100%-24px))] rounded-xl border border-slate-200 bg-white/97 p-4 text-[12px] leading-relaxed shadow-2xl backdrop-blur" style={{ left: Math.max(12, hovered.x), top: Math.max(12, hovered.y) }}>
          <div className="mb-2 flex items-start justify-between gap-3"><strong className="text-[13px] leading-snug text-slate-900">{hovered.project.project}</strong><span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${hovered.project.primaryCategory === 'Direct Investment' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>{hovered.project.primaryCategory}</span></div>
          <dl className="grid grid-cols-[102px_1fr] gap-x-3 gap-y-1.5 text-slate-600">
            <dt>Investor</dt><dd className="font-medium text-slate-800">{hovered.project.investor}</dd>
            <dt>Announcement</dt><dd>{hovered.project.date.replaceAll('-', '/')}</dd>
            <dt>Destination</dt><dd>{hovered.project.country}</dd>
            <dt>Map location</dt><dd>{hovered.project.locationLabel}</dd>
            <dt>Primary value</dt><dd>{formatUsd(hovered.project.valueUsd)}</dd>
            <dt>Categories</dt><dd>{hovered.project.primaryCategory} · {hovered.project.secondaryCategory}</dd>
          </dl>
          <p className="mt-3 border-t border-slate-100 pt-3 text-slate-600">{hovered.project.note || 'No additional note.'}</p>
        </div>
      )}
    </div>
  );
}
