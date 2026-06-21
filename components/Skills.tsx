"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const stacks = [
  {
    category: "Web Scraping",
    color: "#E11D48",
    tools: [
      { name: "Selenium", level: 98 },
      { name: "Playwright", level: 96 },
      { name: "Scrapy", level: 94 },
      { name: "BeautifulSoup", level: 99 },
      { name: "Puppeteer", level: 88 },
      { name: "Requests", level: 99 },
    ],
  },
  {
    category: "Agentic AI",
    color: "#E11D48",
    tools: [
      { name: "LangChain", level: 95 },
      { name: "LangGraph", level: 90 },
      { name: "CrewAI", level: 88 },
      { name: "AutoGen", level: 85 },
      { name: "OpenAI API", level: 97 },
      { name: "Anthropic API", level: 92 },
    ],
  },
  {
    category: "Data & Backend",
    color: "#E11D48",
    tools: [
      { name: "Python", level: 99 },
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB", level: 87 },
      { name: "FastAPI", level: 88 },
      { name: "Django", level: 85 },
      { name: "Pandas", level: 96 },
    ],
  },
];

const techPills = [
  "Python", "Selenium", "Playwright", "Scrapy", "BeautifulSoup",
  "LangChain", "LangGraph", "CrewAI", "AutoGen", "N8N",
  "OpenAI", "Anthropic Claude", "Gemini", "LLaMA",
  "Pinecone", "ChromaDB", "FastAPI", "Django", "React",
  "PostgreSQL", "MongoDB", "Redis", "Docker", "Pandas", "GeoPandas",
  "Proxies", "Anti-bot Bypass", "CAPTCHA Solving", "GraphQL", "Puppeteer",
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-mono text-[#A3A3A3] group-hover:text-[#FAFAFA] transition-colors">{name}</span>
        <span className="text-xs font-mono text-[#E11D48]">{level}%</span>
      </div>
      <div className="h-[3px] bg-[#171717] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full bg-gradient-to-r from-[#E11D48] to-[#F43F5E] rounded-full"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const pillsRef = useRef(null);
  const pillsInView = useInView(pillsRef, { once: true });

  return (
    <section className="py-24 bg-[#050505] dot-grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Technical Stack"
          title="What I Work With"
          description="Production-grade tools and frameworks across the full data engineering and AI pipeline."
        />

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stacks.map((stack, si) => (
            <motion.div
              key={stack.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: si * 0.12, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="card-glass rounded-2xl p-6 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-[#E11D48] rounded-full" />
                <h3 className="font-heading font-bold text-lg text-[#FAFAFA]">{stack.category}</h3>
              </div>
              <div className="space-y-4">
                {stack.tools.map((tool, ti) => (
                  <SkillBar key={tool.name} name={tool.name} level={tool.level} delay={si * 0.1 + ti * 0.07} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div ref={pillsRef}>
          <p className="text-center section-label mb-6">Full Tech Arsenal</p>
          <motion.div
            initial="hidden"
            animate={pillsInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.025 } }, hidden: {} }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {techPills.map((tech) => (
              <motion.span
                key={tech}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
                }}
                whileHover={{ scale: 1.05, borderColor: "#E11D48", color: "#E11D48" }}
                className="px-3 py-1.5 text-xs font-mono text-[#A3A3A3] border border-[#171717] rounded-full cursor-default transition-all duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
