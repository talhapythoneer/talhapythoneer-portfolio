"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { companies } from "@/data/companies";

const doubled = [...companies, ...companies];

export default function TrustedBy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#E11D48] font-bold text-xs tracking-[0.25em] uppercase mb-4">Trusted By</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-[#FAFAFA] mb-6 tracking-tight">
            Clients Across Industries
          </h2>
          <p className="text-[#A3A3A3] text-lg max-w-2xl mx-auto leading-relaxed">
            Universities, startups, SaaS platforms, law firms, and enterprise clients from 40+ countries.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="marquee-track gap-8 py-4"
        >
          {doubled.map((company, i) => (
            <div
              key={`${company.name}-${i}`}
              className="flex-shrink-0 group relative h-20 w-44 bg-white border border-[#E5E5E5] rounded-xl overflow-hidden flex items-center justify-center px-6 mx-4 transition-all duration-300 hover:border-[#E11D48]/40 hover:shadow-[0_0_20px_rgba(225,29,72,0.15)]"
              title={`${company.name} — ${company.industry}`}
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={140}
                height={50}
                className="object-contain max-h-10 w-auto opacity-90 group-hover:opacity-100 transition-all duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-xs font-mono text-[#404040] font-semibold text-center px-1">${company.name}</span>`;
                  }
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
