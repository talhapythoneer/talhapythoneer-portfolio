"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "./SectionHeading";

const featured = [
  {
    id: 1,
    title: "Real Estate Scraper",
    category: "Web Scraping",
    description: "Extracting comprehensive property data from Redfin — prices, locations, historical trends — at scale with anti-bot bypass.",
    stack: ["Scrapy", "Selenium", "PostgreSQL", "GeoPandas"],
    imagePath: "/assets/img/projects/redfin.png",
    stat: "50k+ listings/day",
  },
  {
    id: 8,
    title: "AI Research Assistant",
    category: "Agentic AI",
    description: "Multi-agent system that reads research papers, extracts findings, maps connections, and generates literature reviews autonomously.",
    stack: ["LangChain", "OpenAI API", "Pinecone", "FastAPI"],
    imagePath: "/assets/img/projects/cake.png",
    stat: "Weeks → Hours",
  },
  {
    id: 4,
    title: "Yellowpages Scraper",
    category: "Web Scraping",
    description: "B2B lead generation engine extracting business contact data, hours, reviews, and categories across any geographic area.",
    stack: ["BeautifulSoup", "Requests", "MongoDB", "Redis"],
    imagePath: "/assets/img/projects/yellowpages.png",
    stat: "90% time saved",
  },
];

function Card({ item, index }: { item: (typeof featured)[0]; index: number }) {
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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative bg-[#0A0A0A] rounded-2xl overflow-hidden border border-[#171717]/60 cursor-pointer"
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
            <Card key={item.id} item={item} index={i} />
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
    </section>
  );
}
