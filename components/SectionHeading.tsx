"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ label, title, description }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="text-center mb-16"
    >
      <span className="section-label block mb-3">{label}</span>
      <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-[#FAFAFA] leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[#A3A3A3] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
      <div className="mt-6 flex items-center justify-center gap-3">
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#E11D48]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#E11D48]" />
      </div>
    </motion.div>
  );
}
