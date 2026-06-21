"use client";

import React, { useEffect, useState, useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import * as topojson from "topojson-client";
import { motion, AnimatePresence } from "framer-motion";
import { countryStats } from "@/data/reviews";

const countryFlagEmoji: Record<string, string> = {
  US: "🇺🇸", GB: "🇬🇧", NL: "🇳🇱", CA: "🇨🇦", AU: "🇦🇺",
  DE: "🇩🇪", AE: "🇦🇪", IT: "🇮🇹", FR: "🇫🇷", SI: "🇸🇮",
  IN: "🇮🇳", SG: "🇸🇬",
};

interface TooltipData {
  name: string;
  count: number;
  code: string;
  x: number;
  y: number;
}

export default function InteractiveWorldMap() {
  const [geographies, setGeographies] = useState<any[]>([]);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((res) => res.json())
      .then((data) => {
        const countries = topojson.feature(data, data.objects.countries) as any;
        setGeographies(countries.features);
      })
      .catch((err) => console.error("Error loading map data:", err));
  }, []);

  const projection = useMemo(() => {
    return geoMercator().scale(130).translate([400, 250]);
  }, []);

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  // Create a fast lookup for country stats
  // The TopoJSON file uses standard country names. We might need to map them slightly,
  // but let's do a simple substring/include match.
  const statsMap = useMemo(() => {
    const map = new Map();
    countryStats.forEach((stat) => {
      // mapping variations (e.g. United States of America -> United States)
      if (stat.name === "United States") map.set("United States of America", stat);
      else if (stat.name === "United Kingdom") map.set("United Kingdom", stat);
      else if (stat.name === "UAE") map.set("United Arab Emirates", stat);
      else map.set(stat.name, stat);
    });
    return map;
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl card-glass p-2 md:p-6 shadow-2xl">
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h3 className="font-heading font-bold text-xl md:text-2xl text-[#FAFAFA] mb-1">
          Global Client Distribution
        </h3>
        <p className="text-[#A3A3A3] text-xs font-mono">
          Hover over highlighted regions
        </p>
      </div>

      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] min-h-[300px] flex items-center justify-center">
        {geographies.length === 0 ? (
          <div className="flex items-center gap-3 text-[#A3A3A3] font-mono text-sm animate-pulse">
            <span className="w-3 h-3 rounded-full border-2 border-[#E11D48] border-t-transparent animate-spin" />
            Loading Map Engine...
          </div>
        ) : (
          <svg viewBox="0 0 800 500" className="w-full h-full stroke-[#171717] stroke-[0.5px]">
            {geographies.map((geo, i) => {
              const stat = statsMap.get(geo.properties.name);
              const hasReviews = !!stat;
              
              return (
                <motion.path
                  key={`geo-${i}`}
                  d={pathGenerator(geo) || ""}
                  className={`transition-colors duration-300 outline-none ${
                    hasReviews ? "cursor-pointer" : ""
                  }`}
                  fill={hasReviews ? "#BE123C" : "#0A0A0A"}
                  whileHover={hasReviews ? { fill: "#F43F5E" } : {}}
                  onMouseMove={(e) => {
                    if (!hasReviews) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltip({
                      name: stat.name,
                      count: stat.count,
                      code: stat.code,
                      x: e.clientX - rect.left + 20, // offset from mouse
                      y: e.clientY - rect.top,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })}
          </svg>
        )}
      </div>

      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute pointer-events-none bg-[#050505]/90 backdrop-blur-md border border-[#171717] px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <span className="text-2xl drop-shadow-lg">{countryFlagEmoji[tooltip.code] ?? "🌍"}</span>
            <div className="flex flex-col">
              <span className="text-[#FAFAFA] text-xs font-semibold">{tooltip.name}</span>
              <span className="text-[#E11D48] text-[0.65rem] font-mono font-bold tracking-widest uppercase">
                {tooltip.count} Reviews
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
