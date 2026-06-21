"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import ReviewCard from "@/components/ReviewCard";
import { featuredReviews, orderReviews } from "@/data/reviews";
import InteractiveWorldMap from "@/components/InteractiveWorldMap";

const countryName: Record<string, string> = {
  US: "United States", GB: "United Kingdom", NL: "Netherlands", CA: "Canada",
  AU: "Australia", DE: "Germany", AE: "United Arab Emirates", IT: "Italy",
  FR: "France", SI: "Slovenia", IN: "India", SG: "Singapore",
};

export default function TestimonialsClient() {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const ordered = useMemo(() => orderReviews(featuredReviews, activeCountry), [activeCountry]);
  const hasMatch = activeCountry
    ? featuredReviews.some((r) => r.reviewer_country_code === activeCountry)
    : false;

  return (
    <div className="min-h-screen bg-[#050505] dot-grid-bg pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Testimonials"
          title="625+ Verified Reviews"
          description="Every testimonial shown here comes from a real, verified client on Fiverr or Upwork. No cherry-picking — just the pattern of what clients experience."
        />

        <div className="mb-16">
          <InteractiveWorldMap onCountryHover={setActiveCountry} />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="section-label">Client Feedback</p>
            <AnimatePresence>
              {activeCountry && hasMatch && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="text-xs font-mono text-[#E11D48] bg-[#E11D48]/10 border border-[#E11D48]/30 px-2.5 py-1 rounded-full"
                >
                  ↑ {countryName[activeCountry] ?? activeCountry} first
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-2xl text-[#E11D48]">4.9</span>
            <div className="flex flex-col">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="10" height="10" viewBox="0 0 12 12" fill="#E11D48">
                    <path d="M6 0l1.35 4.15H12L8.5 6.7l1.35 4.15L6 8.3l-3.85 2.55L3.5 6.7 0 4.15h4.65z" />
                  </svg>
                ))}
              </div>
              <span className="text-[#525252] text-[0.6rem] font-mono">625 reviews</span>
            </div>
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {ordered.map((review, i) => (
            <ReviewCard key={review.username} review={review} index={i} />
          ))}
        </motion.div>

        <div className="text-center">
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.fiverr.com/talhapythoneer"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-full transition-all duration-300 text-sm"
            >
              See all reviews on Fiverr →
            </a>
            <a
              href="https://www.upwork.com/freelancers/~01b746699831a5bb51"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 border border-[#171717] hover:border-[#E11D48] text-[#A3A3A3] hover:text-[#E11D48] font-semibold rounded-full transition-all duration-300 text-sm"
            >
              See reviews on Upwork →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
