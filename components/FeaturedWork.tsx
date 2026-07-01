"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import ProjectModal from "./portfolio/ProjectModal";
import { projects, type Project } from "@/data/projects";


const featured = [
  {
    id: 1,
    title: "Pima County Legal AI Agent",
    category: "Agentic AI",
    description: "Daily automated agent pulling distressed property signals from county public records.",
    stack: ["Python", "Playwright", "Groq API", "GPT-OSS-120B", "Pandas", "Google Sheets API"],
    imagePath: "/assets/img/projects/pima-county.png",
    stat: "Daily → Automated",
  },
  {
    id: 5,
    title: "400+ Law Firm Websites Pipeline",
    category: "Web Scraping",
    description: "Structured data extraction pipeline across 400 individual law firm websites for a legal intelligence company.",
    stack: ["Python", "BeautifulSoup", "Scrapy", "Proxy Rotation", "Pandas", "Excel"],
    imagePath: "/assets/img/projects/law-firms.png",
    stat: "400+ Sources",
  },
  {
    id: 12,
    title: "Indeed, LinkedIn and ZipRecruiter Jobs Scraper",
    category: "Web Scraping",
    description: "Multi-platform job aggregation scraper with keyword filtering and deduplication across three major job boards.",
    stack: ["Python", "Playwright", "Keyword Filtering", "Deduplication Logic", "Pandas"],
    imagePath: "/assets/img/projects/indeed.png",
    stat: "3 Platforms",
  },
];

function Card({ item, index, onOpen }: { item: (typeof featured)[0]; index: number; onOpen: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative bg-[#0A0A0A] rounded-2xl overflow-hidden border border-[#171717]/60 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
    >
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-br from-[#E11D48]/10 to-transparent z-0 pointer-events-none"
      />

      <div className="relative h-44 overflow-hidden">
        <Image
          src={item.imagePath}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-[0.6rem] font-mono font-semibold uppercase tracking-wider bg-[#E11D48]/90 text-white rounded-md">
            {item.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 text-[0.6rem] font-mono text-[#E11D48] bg-[#0A0A0A]/80 border border-[#E11D48]/30 rounded-md">
            {item.stat}
          </span>
        </div>
      </div>

      <div className="p-6 relative z-10">
        <h3 className="font-heading font-bold text-lg text-[#FAFAFA] mb-2 group-hover:text-[#E11D48] transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-[#A3A3A3] text-sm leading-relaxed mb-4">{item.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {item.stack.map((s) => (
            <span key={s} className="px-2 py-0.5 text-[0.65rem] font-mono text-[#A3A3A3] bg-[#0A0A0A] border border-[#171717] rounded">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-[#E11D48] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View details
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </div>
      </div>

      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E11D48] to-[#F43F5E] origin-left"
      />
    </motion.div>
  );
}

export default function FeaturedWork() {
  const [selected, setSelected] = useState<Project | null>(null);

  const openProject = (id: number) => {
    const match = projects.find((p) => p.id === id);
    if (match) setSelected(match);
  };

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Selected Work"
          title="Featured Projects"
          description="A handful of projects from 1500+ deliveries. Each one solved a real business problem."
        />

        <div
          className="grid md:grid-cols-3 gap-6 mb-12"
          style={{ perspective: "1200px" }}
        >
          {featured.map((item, i) => (
            <Card key={item.id} item={item} index={i} onOpen={() => openProject(item.id)} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#171717] hover:border-[#E11D48] text-[#A3A3A3] hover:text-[#E11D48] font-semibold rounded-full transition-all duration-300 text-sm group"
          >
            View All Projects
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
