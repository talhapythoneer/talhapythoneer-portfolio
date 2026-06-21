"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 1500, suffix: "+", label: "Projects Completed" },
  { value: 4.9, suffix: "/5", label: "Avg Rating" },
  { value: 625, suffix: "+", label: "Reviews" },
  { value: 6, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Job Success" },
];

function Counter({ target, suffix, decimals = 0 }: { target: number; suffix: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView, target, decimals]);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="bg-transparent border-y border-[#171717]/60">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-0 md:divide-x md:divide-[#171717]/60">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex flex-col items-center text-center px-4"
            >
              <span className="font-heading font-bold text-3xl md:text-4xl text-[#E11D48] tabular-nums drop-shadow-[0_0_10px_rgba(225,29,72,0.2)]">
                <Counter
                  target={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.value === 4.9 ? 1 : 0}
                />
              </span>
              <span className="text-[#A3A3A3] text-xs uppercase tracking-widest font-mono mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
