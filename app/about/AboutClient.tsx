"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

const expertise = [
  {
    title: "Web Scraping",
    description:
      "Selenium, BeautifulSoup, Scrapy, Playwright — dynamic sites, login-walled pages, IP and CAPTCHA protected targets. Any website, at any scale.",
    items: ["Dynamic JS rendering", "Anti-bot bypass", "CAPTCHA solving", "Residential proxy rotation", "Large-scale pipelines"],
  },
  {
    title: "Agentic AI",
    description:
      "LangChain, LangGraph, CrewAI, AutoGen, N8N — multi-agent systems integrated with OpenAI, Anthropic, Gemini, and LLaMA that think, plan, and act autonomously.",
    items: ["Multi-agent orchestration", "RAG pipelines", "Tool use & function calling", "Long-running agents", "LLM integration"],
  },
  {
    title: "Data Engineering",
    description:
      "End-to-end data pipelines from extraction to storage to delivery. PostgreSQL, MongoDB, Redis, Pandas — structured and unstructured data at scale.",
    items: ["ETL pipeline design", "Data validation", "API integration", "Real-time data streams", "Custom data formats"],
  },
  {
    title: "Full-Stack Dev",
    description:
      "Django and React JS for building data-powered web applications — dashboards, admin panels, APIs, and client-facing products.",
    items: ["Django REST APIs", "React dashboards", "FastAPI backends", "Docker deployment", "Database design"],
  },
];

const industries = [
  { name: "Real Estate", note: "Property listings, market data, lead gen" },
  { name: "E-commerce", note: "Product catalogs, pricing intelligence, reviews" },
  { name: "Legal & Court Data", note: "Case records, docket scraping, compliance data" },
  { name: "Fintech", note: "Market data, financial indicators, crypto" },
  { name: "Job Boards", note: "Indeed, LinkedIn, Glassdoor talent data" },
  { name: "Business Directories", note: "Yellow Pages, Google Maps, local leads" },
  { name: "Healthcare", note: "Provider directories, clinical trials, research" },
  { name: "NFT & Crypto", note: "OpenSea, CoinMarketCap, on-chain data" },
];

const timeline = [
  { year: "2018", event: "Started Python freelancing — first web scraping gigs" },
  { year: "2020", event: "Top Rated on Fiverr; 200+ projects completed" },
  { year: "2021", event: "Expanded into Agentic AI and LLM integrations" },
  { year: "2022", event: "Fiverr Pro Vetted status; joined Upwork Top Rated" },
  { year: "2023", event: "Built multi-agent systems with LangGraph & CrewAI" },
  { year: "2024", event: "625+ reviews, 1500+ projects, clients in 40+ countries" },
];

function ExpertiseCard({ item, index }: { item: (typeof expertise)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="card-glass rounded-2xl p-7 hover:border-[#E11D48]/30 transition-all duration-300 group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-1 h-12 bg-[#E11D48] rounded-full flex-shrink-0 mt-1 group-hover:h-16 transition-all duration-300" />
        <div>
          <h3 className="font-heading font-bold text-lg text-[#FAFAFA] mb-1">{item.title}</h3>
          <p className="text-[#A3A3A3] text-sm leading-relaxed">{item.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 pl-5">
        {item.items.map((it) => (
          <span key={it} className="px-2.5 py-1 text-xs font-mono text-[#A3A3A3] bg-[#0A0A0A] border border-[#171717] rounded-full">
            {it}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function AboutClient() {
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true });

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="About"
          title="Talha Pythoneer"
          description="Python developer. Data engineer. AI architect. 6 years of getting complex automation done."
        />

        <div className="grid lg:grid-cols-5 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col items-center gap-6"
          >
            <div className="relative w-56 h-56">
              <div className="absolute inset-0 rounded-full border border-dashed border-[#E11D48]/30 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-3 rounded-full overflow-hidden border-2 border-[#E11D48]/40 shadow-[0_0_40px_rgba(220,20,60,0.15)]">
                <Image
                  src="/assets/img/porifle_v1.png"
                  alt="Talha Pythoneer"
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
            </div>

            <div className="w-full card-glass rounded-2xl p-5 space-y-3">
              {[
                { label: "Location", value: "Pakistan (GMT+5)" },
                { label: "Languages", value: "English, French, Spanish" },
                { label: "Experience", value: "6+ Years" },
                { label: "Projects", value: "1500+" },
                { label: "Rating", value: "4.9 / 5.0" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-1.5 border-b border-[#171717]/50 last:border-0">
                  <span className="text-[#525252] text-xs font-mono uppercase tracking-wider">{label}</span>
                  <span className="text-[#FAFAFA] text-xs font-semibold">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 w-full">
              <a
                href="https://www.fiverr.com/talhapythoneer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-4 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-full transition-all duration-300 text-xs"
              >
                Hire on Fiverr
              </a>
              <a
                href="/contact"
                className="flex-1 text-center px-4 py-2.5 border border-[#171717] hover:border-[#E11D48] text-[#A3A3A3] hover:text-[#E11D48] font-semibold rounded-full transition-all duration-300 text-xs"
              >
                Contact Direct
              </a>
            </div>
          </motion.div>

          <div className="lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-invert max-w-none"
            >
              <p className="text-[#A3A3A3] text-base leading-relaxed mb-4">
                Hi, I&apos;m <strong className="text-[#FAFAFA]">Talha Pythoneer</strong>. For the past 6+ years, I&apos;ve been
                building Python systems that extract, process, and act on data — for clients ranging from solo founders
                to universities to enterprise SaaS companies across 40+ countries.
              </p>
              <p className="text-[#A3A3A3] text-base leading-relaxed mb-4">
                My specialization spans two domains that are increasingly converging:{" "}
                <strong className="text-[#E11D48]">web scraping &amp; data extraction</strong> and{" "}
                <strong className="text-[#E11D48]">agentic AI development</strong>. I build custom scrapers for any
                website — dynamic JavaScript, login-required, IP-blocked, CAPTCHA-protected — and I build AI agents
                using LangChain, LangGraph, CrewAI, and AutoGen that don&apos;t just retrieve data but reason about it
                and take actions autonomously.
              </p>
              <p className="text-[#A3A3A3] text-base leading-relaxed">
                On Fiverr I&apos;m a <strong className="text-[#FAFAFA]">Pro Vetted Seller</strong> selected by the Fiverr
                Pro team. On Upwork I hold a <strong className="text-[#FAFAFA]">Top Rated</strong> badge with 100% Job
                Success. I take on the projects other sellers turn down and deliver them ahead of schedule.
              </p>
            </motion.div>

            <motion.div
              ref={timelineRef}
              initial={{ opacity: 0 }}
              animate={timelineInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="relative pl-6 border-l border-[#171717]"
            >
              {timeline.map((entry, i) => (
                <motion.div
                  key={entry.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative mb-5 last:mb-0"
                >
                  <div className="absolute -left-[1.65rem] top-1 w-3 h-3 rounded-full border-2 border-[#E11D48] bg-[#0A0A0A]" />
                  <div className="flex items-start gap-4">
                    <span className="text-[#E11D48] font-mono font-bold text-sm flex-shrink-0 w-10">{entry.year}</span>
                    <span className="text-[#A3A3A3] text-sm leading-relaxed">{entry.event}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mb-24">
          <SectionHeading label="Expertise" title="Core Specializations" />
          <div className="grid md:grid-cols-2 gap-6">
            {expertise.map((item, i) => (
              <ExpertiseCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeading
            label="Industries"
            title="Industries Served"
            description="Delivered web scraping and data automation solutions across a wide range of verticals."
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="card-glass rounded-xl p-5 hover:border-[#E11D48]/40 transition-all duration-300 group"
              >
                <div className="w-2 h-2 rounded-full bg-[#E11D48] mb-3 group-hover:scale-150 transition-transform duration-300" />
                <h4 className="font-heading font-bold text-sm text-[#FAFAFA] mb-1">{industry.name}</h4>
                <p className="text-[#FAFAFA] text-xs leading-relaxed">{industry.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
