"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function HomeCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(220,20,60,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label block mb-4">Ready to Start?</span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-[#FAFAFA] leading-tight mb-6">
            Have data to extract or an<br />
            <span className="text-gradient">AI Agent to build?</span>
          </h2>
          <p className="text-[#A3A3A3] text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            I take on complex projects others turn down. Fast turnaround, clear communication,
            production-ready code. Let&apos;s discuss your project.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.fiverr.com/talhapythoneer"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(220,20,60,0.4)] text-sm"
            >
              Hire on Fiverr
            </a>
            <a
              href="https://www.upwork.com/freelancers/~01b746699831a5bb51"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-[#171717] hover:border-[#E11D48] text-[#FAFAFA] hover:text-[#E11D48] font-semibold rounded-full transition-all duration-300 text-sm"
            >
              Hire on Upwork
            </a>
            <a
              href="/contact"
              className="px-8 py-4 border border-[#171717] hover:border-[#E11D48] text-[#A3A3A3] hover:text-[#E11D48] font-semibold rounded-full transition-all duration-300 text-sm"
            >
              Direct Contact
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-[#525252] text-xs font-mono">
            <span className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span> Response within 24h
            </span>
            <span className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span> Free project consultation
            </span>
            <span className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span> 100% satisfaction guarantee
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
