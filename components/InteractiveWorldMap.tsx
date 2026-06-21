"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import * as topojson from "topojson-client";
import { motion, AnimatePresence } from "framer-motion";
import { orderReviews, type Review } from "@/data/reviews";
import { useReviews } from "./useReviews";
import Flag from "./Flag";

// Country ISO code -> the name used by the world-atlas TopoJSON, so we can
// match our review data to the rendered map polygons.
const CODE_TO_TOPONAME: Record<string, string> = {
  US: "United States of America", GB: "United Kingdom", CA: "Canada",
  DE: "Germany", NL: "Netherlands", FR: "France", AU: "Australia",
  BE: "Belgium", NO: "Norway", IL: "Israel", CH: "Switzerland", IT: "Italy",
  AT: "Austria", KR: "South Korea", MX: "Mexico", NZ: "New Zealand",
  ES: "Spain", PK: "Pakistan", TW: "Taiwan", IN: "India", BR: "Brazil",
  AE: "United Arab Emirates", HU: "Hungary", LT: "Lithuania", PL: "Poland",
  IE: "Ireland", LV: "Latvia", SI: "Slovenia", DK: "Denmark",
  BD: "Bangladesh", TR: "Turkey", CZ: "Czechia", VN: "Vietnam",
  ZA: "South Africa", AL: "Albania", CN: "China", SE: "Sweden",
  MY: "Malaysia", NP: "Nepal", AM: "Armenia", FI: "Finland",
  UZ: "Uzbekistan", IS: "Iceland", GR: "Greece", RS: "Serbia", CY: "Cyprus",
  BG: "Bulgaria", KW: "Kuwait", SA: "Saudi Arabia", CL: "Chile",
  SG: "Singapore", PT: "Portugal",
};
const TOPONAME_TO_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(CODE_TO_TOPONAME).map(([code, name]) => [name, code])
);

interface CountryInfo {
  code: string;
  name: string;
  count: number;
  reviews: Review[];
}

interface Centroid {
  code: string;
  x: number;
  y: number;
}

interface PanelState {
  code: string;
  name: string;
  count: number;
  reviews: Review[];
  x: number;
  y: number;
  w: number;
}

const PANEL_W = 320;
const PANEL_H = 280;

function PanelAvatar({ review }: { review: Review }) {
  const [failed, setFailed] = useState(false);
  if (failed || !review.user_image_url) {
    return (
      <div className="w-7 h-7 rounded-full flex-shrink-0 bg-[#E11D48]/15 flex items-center justify-center">
        <span className="text-[#F43F5E] text-xs font-bold uppercase">{review.username.charAt(0)}</span>
      </div>
    );
  }
  return (
    <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-[#171717] bg-[#050505]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={review.user_image_url}
        alt={review.username}
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export default function InteractiveWorldMap({
  onCountryHover,
}: {
  onCountryHover?: (code: string | null) => void;
} = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [geographies, setGeographies] = useState<any[]>([]);
  const reviews = useReviews();
  const [panel, setPanel] = useState<PanelState | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);

  const clampPan = (p: { x: number; y: number }, z: number) => ({
    x: Math.max(-(z - 1) * 400, Math.min((z - 1) * 400, p.x)),
    y: Math.max(-(z - 1) * 250, Math.min((z - 1) * 250, p.y)),
  });
  const zoomBy = (factor: number) =>
    setZoom((z) => {
      const nz = Math.max(1, Math.min(5, +(z * factor).toFixed(3)));
      setPan((p) => clampPan(p, nz));
      return nz;
    });
  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const s = svgRef.current?.getBoundingClientRect();
    const scale = s ? Math.min(s.width / 800, s.height / 500) || 1 : 1;
    const ddx = e.clientX - dragRef.current.x;
    const ddy = e.clientY - dragRef.current.y;
    if (Math.hypot(ddx, ddy) > 3) draggingRef.current = true;
    dragRef.current = { x: e.clientX, y: e.clientY };
    setPan((p) => clampPan({ x: p.x + ddx / scale, y: p.y + ddy / scale }, zoom));
  };
  const onPointerUp = () => {
    dragRef.current = null;
    // clear the drag flag next tick so the trailing click/hover is ignored
    setTimeout(() => {
      draggingRef.current = false;
    }, 0);
  };

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((res) => res.json())
      .then((data) => {
        const countries = topojson.feature(data, data.objects.countries) as any;
        // Drop Antarctica: it has no clients and stretches to infinity in Mercator.
        setGeographies(
          countries.features.filter((f: any) => f.properties.name !== "Antarctica")
        );
      })
      .catch((err) => console.error("Error loading map data:", err));
  }, []);

  // Group reviews by country code.
  const byCode = useMemo(() => {
    const map = new Map<string, CountryInfo>();
    reviews.forEach((r) => {
      const code = (r.reviewer_country_code || "").toUpperCase();
      if (!code) return;
      if (!map.has(code)) {
        map.set(code, { code, name: r.reviewer_country || code, count: 0, reviews: [] });
      }
      const info = map.get(code)!;
      info.count += 1;
      info.reviews.push(r);
    });
    return map;
  }, [reviews]);

  const countriesByCount = useMemo(
    () => [...byCode.values()].sort((a, b) => b.count - a.count),
    [byCode]
  );

  // Auto-fit all loaded countries into the viewBox (with padding) so the map is
  // always fully visible and responsive — no manual scale/translate guessing.
  const projection = useMemo(() => {
    const p = geoMercator();
    if (geographies.length > 0) {
      p.fitExtent(
        [
          [24, 20],
          [776, 480],
        ],
        { type: "FeatureCollection", features: geographies } as any
      );
    } else {
      p.scale(120).translate([400, 250]);
    }
    return p;
  }, [geographies]);
  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  // Centroid (viewBox coords) per country code we can place on the map.
  const centroidByCode = useMemo(() => {
    const map = new Map<string, Centroid>();
    if (geographies.length === 0) return map;
    geographies.forEach((geo) => {
      const code = TOPONAME_TO_CODE[geo.properties.name];
      if (!code) return;
      const [x, y] = pathGenerator.centroid(geo);
      if (Number.isNaN(x) || Number.isNaN(y)) return;
      map.set(code, { code, x, y });
    });
    return map;
  }, [geographies, pathGenerator]);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openPanel = (code: string) => {
    if (draggingRef.current) return; // don't pop while panning the map
    cancelClose();
    const info = byCode.get(code);
    if (!info) return;
    onCountryHover?.(code);

    const centroid = centroidByCode.get(code);
    const svg = svgRef.current;
    const cont = containerRef.current;
    const base = { code, name: info.name, count: info.count, reviews: orderReviews(info.reviews) };
    const cont0 = cont?.getBoundingClientRect();
    // Responsive width: never wider than the map (minus margins) — fixes
    // the card overflowing off the right edge on small screens.
    const pw = Math.min(PANEL_W, (cont0?.width ?? 360) - 24);

    if (!centroid || !svg || !cont0) {
      setPanel({ ...base, x: 12, y: 56, w: pw });
      return;
    }
    const s = svg.getBoundingClientRect();
    const scale = Math.min(s.width / 800, s.height / 500);
    const offX = (s.width - 800 * scale) / 2;
    const offY = (s.height - 500 * scale) / 2;
    // apply current zoom/pan to the centroid (same transform as the <g>)
    const tx = (centroid.x - 400) * zoom + 400 + pan.x;
    const ty = (centroid.y - 250) * zoom + 250 + pan.y;
    let x = s.left - cont0.left + offX + tx * scale + 14;
    let y = s.top - cont0.top + offY + ty * scale - PANEL_H / 2;
    x = Math.max(8, Math.min(x, cont0.width - pw - 8));
    y = Math.max(8, Math.min(y, cont0.height - PANEL_H - 8));
    setPanel({ ...base, x, y, w: pw });
  };

  const closePanel = () => {
    cancelClose();
    onCountryHover?.(null);
    setPanel(null);
  };

  // Delay closing so the cursor can travel from the country into the card.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      onCountryHover?.(null);
      setPanel(null);
    }, 180);
  };

  useEffect(() => () => cancelClose(), []);

  // Auto-scroll (ping-pong) through the review list when a panel opens, so all
  // reviews are seen without manual scrolling. Manual wheel/touch pauses it briefly.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !panel) return;
    el.scrollTop = 0;
    let raf = 0;
    let dir = 1;
    let last = performance.now();
    let pausedUntil = 0;
    const bump = () => {
      pausedUntil = performance.now() + 1400;
    };
    el.addEventListener("wheel", bump, { passive: true });
    el.addEventListener("touchmove", bump, { passive: true });

    const step = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      const max = el.scrollHeight - el.clientHeight;
      if (now > pausedUntil && max > 2) {
        el.scrollTop += dir * dt * 0.04;
        if (el.scrollTop >= max) {
          el.scrollTop = max;
          dir = -1;
          pausedUntil = now + 900; // pause at the bottom
        } else if (el.scrollTop <= 0) {
          el.scrollTop = 0;
          dir = 1;
          pausedUntil = now + 900; // pause at the top
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("wheel", bump);
      el.removeEventListener("touchmove", bump);
    };
  }, [panel?.code]);

  const loading = geographies.length === 0 || reviews.length === 0;

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-2xl card-glass p-4 md:p-6 shadow-2xl">
      <div className="relative w-full aspect-[16/9] md:aspect-[2/1] min-h-[320px] flex items-center justify-center">
        {loading ? (
          <div className="flex items-center gap-3 text-[#A3A3A3] font-mono text-sm animate-pulse">
            <span className="w-3 h-3 rounded-full border-2 border-[#E11D48] border-t-transparent animate-spin" />
            Loading Map Engine...
          </div>
        ) : (
          <svg
            ref={svgRef}
            viewBox="0 0 800 500"
            className="w-full h-full touch-none select-none"
            style={{ cursor: zoom > 1 ? (dragRef.current ? "grabbing" : "grab") : "default" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            <g
              className="stroke-[#1A1A1A] stroke-[0.5px]"
              transform={`translate(${pan.x} ${pan.y}) translate(400 250) scale(${zoom}) translate(-400 -250)`}
            >
              {geographies.map((geo, i) => {
                const code = TOPONAME_TO_CODE[geo.properties.name];
                const info = code ? byCode.get(code) : undefined;
                const hasReviews = !!info;
                const isActive = hasReviews && code === panel?.code;
                // colour intensity scales with review volume
                const intensity = info ? Math.min(1, info.count / 60) : 0;
                const fill = hasReviews
                  ? isActive
                    ? "#E11D48"
                    : `rgba(225, 29, 72, ${0.25 + intensity * 0.55})`
                  : "#0E0E0E";
                return (
                  <path
                    key={`geo-${i}`}
                    d={pathGenerator(geo) || ""}
                    className="transition-colors duration-200 outline-none"
                    fill={fill}
                    style={hasReviews ? { cursor: "pointer" } : undefined}
                    onMouseEnter={() => hasReviews && openPanel(code!)}
                    onMouseLeave={() => hasReviews && scheduleClose()}
                    onClick={() => hasReviews && openPanel(code!)}
                  />
                );
              })}
            </g>
          </svg>
        )}

        {/* Zoom controls */}
        {!loading && (
          <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-1.5">
            <button
              onClick={() => zoomBy(1.4)}
              aria-label="Zoom in"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0A0A0A]/90 border border-[#262626] text-[#FAFAFA] text-lg leading-none hover:border-[#E11D48] hover:text-[#E11D48] transition-colors"
            >
              +
            </button>
            <button
              onClick={() => zoomBy(1 / 1.4)}
              aria-label="Zoom out"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0A0A0A]/90 border border-[#262626] text-[#FAFAFA] text-lg leading-none hover:border-[#E11D48] hover:text-[#E11D48] transition-colors"
            >
              −
            </button>
            <button
              onClick={resetView}
              aria-label="Reset view"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0A0A0A]/90 border border-[#262626] text-[#A3A3A3] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.4 2.6L3 8" />
                <path d="M3 4v4h4" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Top countries legend */}
      {!loading && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {countriesByCount.slice(0, 14).map((c) => (
            <button
              key={c.code}
              onMouseEnter={() => openPanel(c.code)}
              onMouseLeave={scheduleClose}
              onClick={() => openPanel(c.code)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-200 ${
                panel?.code === c.code
                  ? "border-[#E11D48] bg-[#E11D48]/10 text-[#FAFAFA]"
                  : "border-[#1A1A1A] text-[#A3A3A3] hover:border-[#E11D48]/40"
              }`}
            >
              <Flag code={c.code} className="w-5 h-3.5 shadow-sm" />
              <span>{c.name}</span>
              <span className="text-[#E11D48] font-bold">{c.count}</span>
            </button>
          ))}
        </div>
      )}

      {/* Review popover card */}
      <AnimatePresence>
        {panel && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            onMouseEnter={cancelClose}
            onMouseLeave={closePanel}
            className="absolute z-30 pointer-events-auto bg-[#070707]/95 backdrop-blur-md border border-[#E11D48]/30 rounded-xl shadow-2xl overflow-hidden flex flex-col"
            style={{ left: panel.x, top: panel.y, width: panel.w, maxHeight: PANEL_H }}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#171717] bg-gradient-to-r from-[#E11D48]/10 to-transparent flex-shrink-0">
              <Flag code={panel.code} className="w-8 h-6 shadow-md" />
              <div className="flex flex-col">
                <span className="text-[#FAFAFA] text-sm font-semibold leading-tight">{panel.name}</span>
                <span className="text-[#E11D48] text-[0.7rem] font-mono font-bold tracking-widest uppercase">
                  {panel.count} {panel.count === 1 ? "Review" : "Reviews"}
                </span>
              </div>
            </div>

            <div ref={scrollRef} className="p-3 space-y-3 overflow-y-auto map-panel-scroll">
              {panel.reviews.map((r, idx) => (
                <div key={`${r.username}-${idx}`} className="flex gap-2.5">
                  <PanelAvatar review={r} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#FAFAFA] text-xs font-semibold truncate">@{r.username}</span>
                      <span className="flex gap-px flex-shrink-0">
                        {[...Array(5)].map((_, si) => (
                          <svg key={si} width="9" height="9" viewBox="0 0 12 12" fill="#E11D48">
                            <path d="M6 0l1.35 4.15H12L8.5 6.7l1.35 4.15L6 8.3l-3.85 2.55L3.5 6.7 0 4.15h4.65z" />
                          </svg>
                        ))}
                      </span>
                    </div>
                    <p className="text-[#A3A3A3] text-[0.72rem] leading-snug italic mt-0.5">
                      &ldquo;{r.comment}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
