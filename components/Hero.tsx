"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const NeuralNetwork = dynamic(() => import("./NeuralNetwork"), { ssr: false });

const roles = [
  "Python Developer",
  "Web Scraping Expert",
  "Agentic AI Engineer",
  "AI Workflow Architect",
];

function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <span className="text-[#E11D48] font-mono font-semibold">
      {displayed}
      <span className="cursor-blink text-[#E11D48]">|</span>
    </span>
  );
}

function ProfilePhoto({ size = "w-64 h-64 md:w-80 md:h-80" }: { size?: string }) {
  return (
    <div className={`relative ${size}`}>
      <div className="absolute inset-0 rounded-full bg-[#E11D48]/10 animate-[spin_12s_linear_infinite]">
        <div className="absolute inset-4 rounded-full border border-dashed border-[#E11D48]/20" />
      </div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E11D48]/20 to-transparent animate-pulse" />

      <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-2 border-[#E11D48]/40 shadow-[0_0_60px_rgba(225,29,72,0.2)]">
        <Image
          src="/assets/img/porifle_v1.png"
          alt="Talha Pythoneer - Python Developer and Web Scraping Expert"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 256px, 320px"
        />
      </div>
    </div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative flex-1 flex items-center justify-center bg-[#000000] overflow-hidden">
      <NeuralNetwork />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(225,29,72,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7 }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.div variants={item} className="mb-4">
            <span className="section-label">Available for Projects</span>
            <span className="ml-3 inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[0.7rem] text-emerald-400 font-mono tracking-widest uppercase">Online</span>
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-[#FAFAFA] leading-[1.05] tracking-tight mb-6"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient">Talha</span>
          </motion.h1>

          {/* Mobile-only photo — visible on first render right under the name */}
          <motion.div variants={item} className="lg:hidden flex justify-center my-8">
            <ProfilePhoto size="w-44 h-44 sm:w-52 sm:h-52" />
          </motion.div>

          <motion.div variants={item} className="text-xl md:text-2xl text-[#A3A3A3] mb-8 h-8">
            <TypingText />
          </motion.div>

          <motion.p
            variants={item}
            className="text-[#A3A3A3] text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0"
          >
            6+ years building production-grade Python systems. From extracting data on any website —
            dynamic JS, login-walls, IP-blocked — to multi-agent AI pipelines with LangChain, CrewAI,
            and AutoGen. I solve the problems others turn down.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
            <a
              href="https://www.fiverr.com/talhapythoneer"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(225,29,72,0.4)] text-sm"
            >
              Hire on Fiverr
            </a>
            <a
              href="/portfolio"
              className="px-7 py-3.5 border border-[#262626] hover:border-[#E11D48] text-[#FAFAFA] hover:text-[#E11D48] font-semibold rounded-full transition-all duration-300 text-sm"
            >
              View Portfolio →
            </a>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-6 justify-center lg:justify-start">
            <a
              href="https://www.fiverr.com/talhapythoneer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fiverr profile"
              className="opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <svg width="80" height="24" viewBox="0 0 89 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g fill="#FAFAFA">
                  <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z" />
                </g>
                <g fill="#1dbf73">
                  <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z" />
                </g>
              </svg>
            </a>
            <span className="w-px h-6 bg-[#262626]" />
            <a
              href="https://www.upwork.com/freelancers/~01b746699831a5bb51"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Upwork profile"
              className="opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102 28" height="18" fill="#FAFAFA">
                <path d="M28.18,19.06A6.54,6.54,0,0,1,23,16c.67-5.34,2.62-7,5.2-7s4.54,2,4.54,5-2,5-4.54,5m0-13.34a7.77,7.77,0,0,0-7.9,6.08,26,26,0,0,1-1.93-5.62H12v7.9c0,2.87-1.3,5-3.85,5s-4-2.12-4-5l0-7.9H.49v7.9A8.61,8.61,0,0,0,2.6,20a7.27,7.27,0,0,0,5.54,2.35c4.41,0,7.5-3.39,7.5-8.24V8.77a25.87,25.87,0,0,0,3.66,8.05L17.34,28h3.72l1.29-7.92a11,11,0,0,0,1.36,1,8.32,8.32,0,0,0,4.14,1.28h.34A8.1,8.1,0,0,0,36.37,14a8.12,8.12,0,0,0-8.19-8.31"/>
                <path d="M80.8,7.86V6.18H77.2V21.81h3.65V15.69c0-3.77.34-6.48,5.4-6.13V6c-2.36-.18-4.2.31-5.45,1.87"/>
                <polygon points="55.51 6.17 52.87 17.11 50.05 6.17 45.41 6.17 42.59 17.11 39.95 6.17 36.26 6.17 40.31 21.82 44.69 21.82 47.73 10.71 50.74 21.82 55.12 21.82 59.4 6.17 55.51 6.17"/>
                <path d="M67.42,19.07c-2.59,0-4.53-2.05-4.53-5s2-5,4.53-5S72,11,72,14s-2,5-4.54,5m0-13.35A8.1,8.1,0,0,0,59.25,14,8.18,8.18,0,1,0,75.6,14a8.11,8.11,0,0,0-8.18-8.31"/>
                <path d="M91.47,14.13h.84l5.09,7.69h4.11l-5.85-8.53a7.66,7.66,0,0,0,4.74-7.11H96.77c0,3.37-2.66,4.65-5.3,4.65V0H87.82V21.82h3.64Z"/>
              </svg>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          className="relative flex-shrink-0 hidden lg:block"
        >
          <ProfilePhoto />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#A3A3A3] text-[0.65rem] uppercase tracking-widest font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#E11D48]/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
