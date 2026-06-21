"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import * as topojson from "topojson-client";
import { motion, AnimatePresence } from "framer-motion";
import { orderReviews, type Review } from "@/data/reviews";

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

// Build a flag emoji from any 2-letter ISO country code.
const flagOf = (code: string) =>
  /^[A-Za-z]{2}$/.test(code)
    ? code
        .toUpperCase()
        .replace(/./g, (c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    : "🌍";

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
}

const PANEL_W = 320;
const PANEL_H = 256;

/** Minimal RFC-4180 CSV parser (handles quoted fields, escaped quotes, newlines). */
function parseCSV(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (ch !== "\r") field += ch;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  if (rows.length === 0) return [];
  const header = rows[0];
  return rows
    .slice(1)
    .filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ""))
    .map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
}

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
  const [geographies, setGeographies] = useState<any[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [panel, setPanel] = useState<PanelState | null>(null);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((res) => res.json())
      .then((data) => {
        const countries = topojson.feature(data, data.objects.countries) as any;
        setGeographies(countries.features);
      })
      .catch((err) => console.error("Error loading map data:", err));
  }, []);

  useEffect(() => {
    fetch("/assets/data/reviews.csv")
      .then((res) => res.text())
      .then((text) => setReviews(parseCSV(text) as unknown as Review[]))
      .catch((err) => console.error("Error loading reviews:", err));
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
  const totalReviews = reviews.length;

  const projection = useMemo(() => geoMercator().scale(125).translate([400, 290]), []);
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

  const openPanel = (code: string) => {
    const info = byCode.get(code);
    if (!info) return;
    onCountryHover?.(code);

    const centroid = centroidByCode.get(code);
    const svg = svgRef.current;
    const cont = containerRef.current;
    const base = { code, name: info.name, count: info.count, reviews: orderReviews(info.reviews) };

    if (!centroid || !svg || !cont) {
      setPanel({ ...base, x: 16, y: 64 });
      return;
    }
    const s = svg.getBoundingClientRect();
    const c = cont.getBoundingClientRect();
    const scale = Math.min(s.width / 800, s.height / 500);
    const offX = (s.width - 800 * scale) / 2;
    const offY = (s.height - 500 * scale) / 2;
    let x = s.left - c.left + offX + centroid.x * scale + 14;
    let y = s.top - c.top + offY + centroid.y * scale - PANEL_H / 2;
    x = Math.max(8, Math.min(x, c.width - PANEL_W - 8));
    y = Math.max(8, Math.min(y, c.height - PANEL_H - 8));
    setPanel({ ...base, x, y });
  };

  const closePanel = () => {
    onCountryHover?.(null);
    setPanel(null);
  };

  const loading = geographies.length === 0 || reviews.length === 0;

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-2xl card-glass p-4 md:p-6 shadow-2xl">
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h3 className="font-heading font-bold text-xl md:text-2xl text-[#FAFAFA] mb-1">
          Global Client Distribution
        </h3>
        <p className="text-[#A3A3A3] text-sm font-mono">
          {totalReviews > 0
            ? `${totalReviews} reviews across ${byCode.size} countries — hover a country`
            : "Hover a country to read its reviews"}
        </p>
      </div>

      <div className="relative w-full aspect-[16/9] md:aspect-[2/1] min-h-[320px] flex items-center justify-center">
        {loading ? (
          <div className="flex items-center gap-3 text-[#A3A3A3] font-mono text-sm animate-pulse">
            <span className="w-3 h-3 rounded-full border-2 border-[#E11D48] border-t-transparent animate-spin" />
            Loading Map Engine...
          </div>
        ) : (
          <svg ref={svgRef} viewBox="0 0 800 500" className="w-full h-full">
            <g className="stroke-[#1A1A1A] stroke-[0.5px]">
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
                    onMouseLeave={() => hasReviews && closePanel()}
                  />
                );
              })}
            </g>
          </svg>
        )}
      </div>

      {/* Top countries legend */}
      {!loading && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {countriesByCount.slice(0, 14).map((c) => (
            <button
              key={c.code}
              onMouseEnter={() => openPanel(c.code)}
              onMouseLeave={closePanel}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-200 ${
                panel?.code === c.code
                  ? "border-[#E11D48] bg-[#E11D48]/10 text-[#FAFAFA]"
                  : "border-[#1A1A1A] text-[#A3A3A3] hover:border-[#E11D48]/40"
              }`}
            >
              <span className="text-base leading-none">{flagOf(c.code)}</span>
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
            className="absolute z-30 pointer-events-none bg-[#070707]/95 backdrop-blur-md border border-[#E11D48]/30 rounded-xl shadow-2xl overflow-hidden"
            style={{ left: panel.x, top: panel.y, width: PANEL_W }}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#171717] bg-gradient-to-r from-[#E11D48]/10 to-transparent">
              <span className="text-2xl drop-shadow-lg">{flagOf(panel.code)}</span>
              <div className="flex flex-col">
                <span className="text-[#FAFAFA] text-sm font-semibold leading-tight">{panel.name}</span>
                <span className="text-[#E11D48] text-[0.7rem] font-mono font-bold tracking-widest uppercase">
                  {panel.count} {panel.count === 1 ? "Review" : "Reviews"}
                </span>
              </div>
            </div>

            <div className="p-3 space-y-3">
              {panel.reviews.slice(0, 3).map((r, idx) => (
                <div key={`${r.username}-${idx}`} className="flex gap-2.5">
                  <PanelAvatar review={r} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#FAFAFA] text-xs font-semibold truncate">@{r.username}</span>
                      <span className="flex gap-px">
                        {[...Array(5)].map((_, si) => (
                          <svg key={si} width="9" height="9" viewBox="0 0 12 12" fill="#E11D48">
                            <path d="M6 0l1.35 4.15H12L8.5 6.7l1.35 4.15L6 8.3l-3.85 2.55L3.5 6.7 0 4.15h4.65z" />
                          </svg>
                        ))}
                      </span>
                    </div>
                    <p className="text-[#A3A3A3] text-[0.72rem] leading-snug italic mt-0.5">
                      &ldquo;{r.comment.length > 100 ? r.comment.slice(0, 100) + "…" : r.comment}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
              {panel.count > 3 && (
                <p className="text-[#525252] text-[0.68rem] font-mono text-center pt-1">
                  + {panel.count - 3} more from {panel.name}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
