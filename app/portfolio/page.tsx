"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/portfolio/ProjectCard";
import ProjectModal from "@/components/portfolio/ProjectModal";
import { projects, type Project, type ProjectType } from "@/data/projects";

const tabs: { label: string; value: ProjectType | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Web Scraping", value: "Web Scraping" },
  { label: "Agentic AI", value: "Agentic AI" },
  { label: "Web Development", value: "Web Development" },
];

export default function PortfolioPage() {
  const [active, setActive] = useState<ProjectType | "All">("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.projectType === active);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Portfolio"
          title="1500+ Projects Delivered"
          description="From single-page scrapers to enterprise-grade multi-agent AI systems — here's a snapshot of what I build."
        />

        <div className="flex flex-wrap gap-2 justify-center mb-12" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={active === tab.value}
              onClick={() => setActive(tab.value)}
              className="relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300"
            >
              {active === tab.value && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 bg-[#E11D48] rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  active === tab.value ? "text-white" : "text-[#A3A3A3] hover:text-[#FAFAFA]"
                }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: "1200px" }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} index={i} onClick={setSelected} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#525252] font-mono text-sm">
            No projects found in this category.
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-[#525252] text-sm mb-6 font-mono">
            These are just samples — see 100s more on my freelancing profiles.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com/talhapythoneer"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 border border-[#171717] hover:border-[#E11D48] text-[#A3A3A3] hover:text-[#E11D48] font-semibold rounded-full transition-all duration-300 text-sm"
            >
              GitHub →
            </a>
            <a
              href="https://www.fiverr.com/talhapythoneer"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-full transition-all duration-300 text-sm"
            >
              Hire on Fiverr →
            </a>
          </div>
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
