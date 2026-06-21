"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-[#171717] rounded-2xl pointer-events-auto"
            >
              <div className="relative h-52 overflow-hidden rounded-t-2xl">
                <Image
                  src={project.imagePath}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="672px"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
                <div className="absolute bottom-4 left-6 right-14">
                  <span className="px-2.5 py-1 text-[0.6rem] font-mono font-semibold uppercase tracking-wider bg-[#E11D48] text-white rounded-md">
                    {project.projectType}
                  </span>
                  <h2 className="font-heading font-bold text-2xl text-[#FAFAFA] mt-2">{project.title}</h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-[#050505] border border-[#171717] text-[#A3A3A3] hover:text-[#E11D48] hover:border-[#E11D48] transition-all duration-200 z-10"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="1" y1="1" x2="13" y2="13" />
                  <line x1="13" y1="1" x2="1" y2="13" />
                </svg>
              </button>

              <div className="p-6 space-y-6">
                <p className="text-[#A3A3A3] text-sm leading-relaxed">{project.shortDescription}</p>

                <div>
                  <h3 className="section-label mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.toolsStack.map((t) => (
                      <span key={t} className="px-3 py-1 text-xs font-mono text-[#E11D48] bg-[#E11D48]/10 border border-[#E11D48]/30 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="section-label mb-3">Features</h3>
                    <ul className="space-y-2">
                      {project.features.map((f, i) => (
                        <li key={i} className="flex gap-2 text-sm text-[#A3A3A3]">
                          <span className="text-[#E11D48] mt-0.5 flex-shrink-0">→</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="section-label mb-3">Business Benefits</h3>
                    <ul className="space-y-2">
                      {project.businessBenefits.map((b, i) => (
                        <li key={i} className="flex gap-2 text-sm text-[#A3A3A3]">
                          <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#171717]">
                  <a
                    href="https://www.fiverr.com/talhapythoneer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-full transition-all duration-300 text-sm hover:shadow-[0_0_20px_rgba(220,20,60,0.4)]"
                  >
                    Get a Similar Project Built
                    <span>→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
