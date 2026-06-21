"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import { featuredReviews, countryStats } from "@/data/reviews";
import InteractiveWorldMap from "@/components/InteractiveWorldMap";

const countryFlagEmoji: Record<string, string> = {
  US: "🇺🇸", GB: "🇬🇧", NL: "🇳🇱", CA: "🇨🇦", AU: "🇦🇺",
  DE: "🇩🇪", AE: "🇦🇪", IT: "🇮🇹", FR: "🇫🇷", SI: "🇸🇮",
  IN: "🇮🇳", SG: "🇸🇬",
};

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#E11D48">
          <path d="M6 0l1.35 4.15H12L8.5 6.7l1.35 4.15L6 8.3l-3.85 2.55L3.5 6.7 0 4.15h4.65z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: (typeof featuredReviews)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 6) * 0.08, duration: 0.6 }}
      className="card-glass rounded-2xl p-6 flex flex-col gap-4 hover:border-[#E11D48]/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <StarRating />
        <span className="text-[#525252] text-[0.6rem] font-mono uppercase tracking-wider">
          {countryFlagEmoji[review.reviewer_country_code] ?? "🌍"} {review.reviewer_country}
        </span>
      </div>

      <p className="text-[#A3A3A3] text-sm leading-relaxed italic flex-1">
        &ldquo;{review.comment}&rdquo;
      </p>

      <div className="flex items-center gap-3 pt-3 border-t border-[#171717]/50">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-[#050505] flex-shrink-0 border border-[#171717]">
          <img
            src={review.user_image_url}
            alt={review.username}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
        <div>
          <p className="text-[#FAFAFA] text-xs font-semibold">@{review.username}</p>
          {review.reviewer_industry && (
            <p className="text-[#525252] text-[0.6rem] font-mono capitalize">
              {review.reviewer_industry.replace(/_/g, " ")}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsClient() {
  return (
    <div className="min-h-screen bg-[#050505] dot-grid-bg pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Testimonials"
          title="625+ Verified Reviews"
          description="Every testimonial shown here comes from a real, verified client on Fiverr or Upwork. No cherry-picking — just the pattern of what clients experience."
        />

        <div className="mb-16">
          <InteractiveWorldMap />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="section-label">Client Feedback</p>
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {featuredReviews.map((review, i) => (
            <ReviewCard key={`${review.username}-${i}`} review={review} index={i} />
          ))}
        </div>

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
