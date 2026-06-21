"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
}

export default function ProjectCard({ project, index, onClick }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 400, damping: 40 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 400, damping: 40 });

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
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 6) * 0.07, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative bg-[#0A0A0A] rounded-2xl overflow-hidden border border-[#171717]/60 cursor-pointer hover:border-[#E11D48]/40 transition-colors duration-300"
    >
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-br from-[#E11D48]/8 to-transparent z-0 pointer-events-none"
      />

      <div className="relative h-40 overflow-hidden">
        <Image
          src={project.imagePath}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
      </div>

      <div className="p-5 relative z-10">
        <h3 className="font-heading font-bold text-base text-[#FAFAFA] mb-2 group-hover:text-[#E11D48] transition-colors duration-300 leading-tight">
          {project.title}
        </h3>
        <p className="text-[#525252] text-xs leading-relaxed mb-4 line-clamp-2">{project.shortDescription}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.toolsStack.slice(0, 3).map((t) => (
            <span key={t} className="px-2 py-0.5 text-[0.6rem] font-mono text-[#A3A3A3] bg-[#0A0A0A] border border-[#171717] rounded">
              {t}
            </span>
          ))}
          {project.toolsStack.length > 3 && (
            <span className="px-2 py-0.5 text-[0.6rem] font-mono text-[#E11D48] bg-[#E11D48]/10 border border-[#E11D48]/20 rounded">
              +{project.toolsStack.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="px-5 pb-4 relative z-10">
        <span className="text-[0.65rem] font-mono text-[#E11D48] uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
          View Details <span>→</span>
        </span>
      </div>

      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E11D48] to-[#F43F5E] origin-left"
      />
    </motion.div>
  );
}
