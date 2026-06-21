"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import Flag from "./Flag";
import { featuredReviews, orderReviews } from "@/data/reviews";
import { useReviews } from "./useReviews";

export default function HomeTestimonialsPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Show real reviews from the CSV (ordered: profile pic + long text first),
  // falling back to the curated set until the CSV loads.
  const csvReviews = useReviews();
  const preview = useMemo(() => {
    const source = csvReviews.length > 0 ? csvReviews : featuredReviews;
    return orderReviews(source).slice(0, 3);
  }, [csvReviews]);

  return (
    <section ref={ref} className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Client Reviews"
          title="What Clients Say"
          description="Every review is from a verified Fiverr or Upwork engagement — no fakes, no cherry-picked."
        />

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {preview.map((review, i) => (
            <motion.div
              key={`${review.username}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="card-glass rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, si) => (
                  <svg key={si} width="12" height="12" viewBox="0 0 12 12" fill="#E11D48">
                    <path d="M6 0l1.35 4.15H12L8.5 6.7l1.35 4.15L6 8.3l-3.85 2.55L3.5 6.7 0 4.15h4.65z" />
                  </svg>
                ))}
              </div>

              <p className="text-[#A3A3A3] text-sm leading-relaxed flex-1 italic">
                &ldquo;{review.comment.length > 180 ? review.comment.slice(0, 180) + "…" : review.comment}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-[#171717]/50">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-[#050505] flex-shrink-0 border border-[#171717]">
                  <img
                    src={review.user_image_url}
                    alt={review.username}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div>
                  <p className="text-[#FAFAFA] text-xs font-semibold">@{review.username}</p>
                  <p className="flex items-center gap-1.5 text-[#525252] text-[0.65rem] font-mono">
                    <Flag code={review.reviewer_country_code} className="w-4 h-3" /> {review.reviewer_country}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#171717] hover:border-[#E11D48] text-[#A3A3A3] hover:text-[#E11D48] font-semibold rounded-full transition-all duration-300 text-sm group"
          >
            See All Reviews on the World Map
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
