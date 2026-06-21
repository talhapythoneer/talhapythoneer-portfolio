"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import type { Review } from "@/data/reviews";
import Flag from "./Flag";

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 12 12" fill="#E11D48">
          <path d="M6 0l1.35 4.15H12L8.5 6.7l1.35 4.15L6 8.3l-3.85 2.55L3.5 6.7 0 4.15h4.65z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ review }: { review: Review }) {
  const [failed, setFailed] = useState(false);
  if (failed || !review.user_image_url) {
    return (
      <div className="w-10 h-10 rounded-full flex-shrink-0 border border-[#171717] bg-[#E11D48]/15 flex items-center justify-center">
        <span className="text-[#F43F5E] text-sm font-bold uppercase">
          {review.username.charAt(0)}
        </span>
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#050505] flex-shrink-0 border border-[#171717]">
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

export default function ReviewCard({
  review,
  index = 0,
}: {
  review: Review;
  index?: number;
}) {
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
        <span className="flex items-center gap-1.5 text-[#A3A3A3] text-xs font-mono uppercase tracking-wider">
          <Flag code={review.reviewer_country_code} className="w-4 h-3" /> {review.reviewer_country}
        </span>
      </div>

      <p className="text-[#A3A3A3] text-base leading-relaxed italic flex-1">
        &ldquo;{review.comment}&rdquo;
      </p>

      <div className="flex items-center gap-3 pt-3 border-t border-[#171717]/50">
        <Avatar review={review} />
        <div>
          <p className="text-[#FAFAFA] text-sm font-semibold">@{review.username}</p>
          {review.reviewer_industry && (
            <p className="text-[#525252] text-xs font-mono capitalize">
              {review.reviewer_industry.replace(/_/g, " ")}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
