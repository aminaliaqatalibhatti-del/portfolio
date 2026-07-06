"use client";

import { useState, useRef } from "react";
import {
  motion, AnimatePresence, useInView,
  useMotionValue, useSpring,
} from "framer-motion";
import {
  Github, ExternalLink, BookOpen,
  Star, ArrowUpRight, Sparkles,
  ChevronRight, Layers,
} from "lucide-react";
import { projects } from "@/lib/data";

/* ─── Types ─────────────────────────────────── */
type Project = (typeof projects)[number];

/* ─── Category config ───────────────────────── */
const CATEGORY_META: Record<string, { icon: string; color: string }> = {
  "All":              { icon: "✦",  color: "#94A3B8" },
  "Generative AI":    { icon: "🧠", color: "#3B82F6" },
  "AI Applications":  { icon: "🤖", color: "#06B6D4" },
  "AI Agents":        { icon: "✈️", color: "#06B6D4" },
  "Machine Learning": { icon: "🎵", color: "#8B5CF6" },
  "Unreal Engine":    { icon: "🎮", color: "#67E8F9" },
  "C++ / Systems":    { icon: "⚙️", color: "#F59E0B" },
  "Web Development":  { icon: "🌐", color: "#FB7185" },
};

const CATEGORIES = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

/* ─── Status badge ──────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { dot: string; text: string; bg: string; border: string }> = {
    "Live":        { dot: "#4ADE80", text: "#4ADE80", bg: "rgba(74,222,128,0.08)",  border: "rgba(74,222,128,0.2)"  },
    "Open Source": { dot: "#60A5FA", text: "#60A5FA", bg: "rgba(96,165,250,0.08)",  border: "rgba(96,165,250,0.2)"  },
    "Hackathon":   { dot: "#06B6D4", text: "#06B6D4", bg: "rgba(6,182,212,0.08)",   border: "rgba(6,182,212,0.2)"   },
    "In Progress": { dot: "#FBBF24", text: "#FBBF24", bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.2)"  },
    "WIP":         { dot: "#FBBF24", text: "#FBBF24", bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.2)"  },
  };
  const s = cfg[status] ?? cfg["Open Source"];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold
                 px-2.5 py-1 rounded-full"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.dot }} />
      {status}
    </span>
  );
}

/* ─── Filter Tabs ───────────────────────────── */
function FilterTabs({
  active, onChange,
}: { active: string; onChange: (c: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5 mb-14">
      {CATEGORIES.map((cat) => {
        const meta    = CATEGORY_META[cat] ?? { icon: "✦", color: "#94A3B8" };
        const isActive = active === cat;
        return (
          <motion.button
            key={cat}
            onClick={() => onChange(cat)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            aria-pressed={isActive}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl
                       text-sm font-medium transition-all duration-200 overflow-hidden
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            style={{
              background: isActive ? `${meta.color}20` : "rgba(255,255,255,0.04)",
              border: `1px solid ${isActive ? meta.color + "50" : "rgba(255,255,255,0.07)"}`,
              color: isActive ? meta.color : "#64748b",
              boxShadow: isActive ? `0 0 20px ${meta.color}20` : "none",
            }}
          >
            {/* animated active underline */}
            {isActive && (
              <motion.div
                layoutId="filter-pill"
                className="absolute inset-0 rounded-xl"
                style={{ background: `${meta.color}10` }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 text-base leading-none">{meta.icon}</span>
            <span className="relative z-10">{cat}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ─── Project image / visual placeholder ───── */
function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${project.accent}18 0%, #0F172A 100%)` }}
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(${project.accent}30 1px, transparent 1px),
                            linear-gradient(90deg, ${project.accent}30 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      {/* Glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-32 h-32 rounded-full opacity-30"
        style={{
          background: `radial-gradient(circle, ${project.accent} 0%, transparent 70%)`,
          filter: "blur(24px)",
        }}
      />
      {/* Central icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl select-none drop-shadow-2xl"
          style={{ filter: `drop-shadow(0 0 20px ${project.accent}80)` }}
        >
          {project.icon}
        </motion.div>
      </div>
      {/* Corner accent lines */}
      {[
        "top-0 left-0 w-8 h-px",
        "top-0 left-0 w-px h-8",
        "top-0 right-0 w-8 h-px",
        "top-0 right-0 w-px h-8",
        "bottom-0 left-0 w-8 h-px",
        "bottom-0 left-0 w-px h-8",
        "bottom-0 right-0 w-8 h-px",
        "bottom-0 right-0 w-px h-8",
      ].map((cls, i) => (
        <div key={i} className={`absolute ${cls}`}
          style={{ background: `${project.accent}60` }} />
      ))}
    </div>
  );
}

/* ─── 3-D tilt card wrapper ─────────────────── */
function TiltCard({ children, className = "" }: {
  children: React.ReactNode; className?: string;
}) {
  const ref  = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 150, damping: 20 });
  const sRotY = useSpring(rotY, { stiffness: 150, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    rotX.set(-y * 10);
    rotY.set( x * 10);
  };

  const handleLeave = () => { rotX.set(0); rotY.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: sRotX,
        rotateY: sRotY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Full project card ─────────────────────── */
function ProjectCard({ project, index, featured }: {
  project: Project; index: number; featured: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={featured ? "md:col-span-2 lg:col-span-1" : ""}
    >
      <TiltCard>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative rounded-2xl overflow-hidden h-full flex flex-col
                     transition-all duration-350 cursor-default"
          style={{
            background: "rgba(15,23,42,0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${hovered ? project.accent + "50" : "rgba(255,255,255,0.07)"}`,
            boxShadow: hovered
              ? `0 0 0 1px ${project.accent}30, 0 20px 60px ${project.accent}18, 0 8px 32px rgba(0,0,0,0.6)`
              : "0 4px 24px rgba(0,0,0,0.4)",
            transform: hovered ? "translateY(-4px)" : "none",
            transition: "all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        >
          {/* ── Image / visual panel ── */}
          <div className="relative h-48 sm:h-52 overflow-hidden flex-shrink-0">
            <ProjectVisual project={project} />

            {/* overlay fade bottom */}
            <div
              className="absolute inset-x-0 bottom-0 h-20 z-10"
              style={{ background: "linear-gradient(to top, rgba(15,23,42,0.95), transparent)" }}
            />

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5
                              text-[10px] font-mono font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(251,191,36,0.15)",
                  border: "1px solid rgba(251,191,36,0.3)",
                  color: "#FCD34D",
                }}>
                <Star className="w-2.5 h-2.5 fill-current" />
                Featured
              </div>
            )}

            {/* Status top-right */}
            <div className="absolute top-3 right-3 z-20">
              <StatusBadge status={project.status} />
            </div>

            {/* Category bottom-left */}
            <div className="absolute bottom-4 left-4 z-20">
              <span
                className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: `${project.accent}18`,
                  border: `1px solid ${project.accent}35`,
                  color: project.accent,
                }}
              >
                {project.category}
              </span>
            </div>
          </div>

          {/* ── Card body ── */}
          <div className="flex flex-col flex-1 p-5">
            {/* Title */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="font-bold text-white text-lg leading-tight">{project.title}</h3>
                <p className="text-sm mt-0.5" style={{ color: project.accent }}>
                  {project.subtitle}
                </p>
              </div>
              <motion.div
                animate={{ rotate: hovered ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="flex-shrink-0 mt-0.5"
              >
                <ArrowUpRight className="w-4 h-4 text-slate-600" />
              </motion.div>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
              {project.description}
            </p>

            {/* Metrics strip */}
            <div
              className="flex flex-wrap gap-2 mb-4 p-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              {project.metrics.map((m) => (
                <div key={m} className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Sparkles className="w-3 h-3 flex-shrink-0" style={{ color: project.accent }} />
                  <span>{m}</span>
                </div>
              ))}
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tech.slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-full
                             transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                  style={{
                    background: `${project.accent}10`,
                    border: `1px solid ${project.accent}22`,
                    color: project.accent,
                  }}
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 5 && (
                <span className="text-[10px] font-mono text-slate-500 self-center">
                  +{project.tech.length - 5} more
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div
              className="flex flex-wrap items-center gap-2 pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub`}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium
                             transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    color: "#94A3B8",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#94A3B8";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                  }}
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              )}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo`}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium
                             transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: `${project.accent}18`,
                    border: `1px solid ${project.accent}40`,
                    color: project.accent,
                  }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}

              {project.caseStudy && (
                <a
                  href={project.caseStudy}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} case study`}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium
                             transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(139,92,246,0.12)",
                    border: "1px solid rgba(139,92,246,0.3)",
                    color: "#C4B5FD",
                  }}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Case Study
                </a>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ─── Section label ─────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center gap-3 mb-4"
    >
      <span className="h-px w-8 bg-cyan-500/60" />
      <span className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-cyan-400">
        {text}
      </span>
      <span className="h-px w-8 bg-cyan-500/60" />
    </motion.div>
  );
}

/* ─── Empty state ───────────────────────────── */
function EmptyState({ filter }: { filter: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="col-span-full flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="text-5xl mb-4">🔍</div>
      <p className="text-slate-400 text-sm">
        No projects found in <span className="text-white font-medium">{filter}</span>
      </p>
    </motion.div>
  );
}

/* ─── Main export ───────────────────────────── */
export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="relative w-full py-28 md:py-36 overflow-hidden"
    >
      {/* bg glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 35% at 50% 0%, rgba(59,130,246,0.06), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ── */}
        <div className="text-center mb-16">
          <SectionLabel text="Featured Projects" />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4"
          >
            Things I&apos;ve{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#60A5FA 0%,#06B6D4 50%,#a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Built
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            From production Generative AI platforms and autonomous agents to
            Unreal Engine games and hand-crafted C++ systems — built with
            intention, shipped with care.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: "center" }}
            className="mt-6 h-px w-24 mx-auto"
            aria-hidden
          >
            <div
              className="h-full w-full rounded-full"
              style={{ background: "linear-gradient(90deg,#3B82F6,#06B6D4,#8B5CF6)" }}
            />
          </motion.div>
        </div>

        {/* ── Filter tabs ── */}
        <FilterTabs active={filter} onChange={setFilter} />

        {/* ── Project grid ── */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <EmptyState key="empty" filter={filter} />
            ) : (
              filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  featured={project.featured}
                />
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Footer CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
        >
          <a
            href="https://github.com/aminaliaqatalibhatti-del"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm
                       text-white transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg,#3B82F6,#06B6D4)",
              boxShadow: "0 0 20px rgba(59,130,246,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(59,130,246,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(59,130,246,0.3)";
            }}
          >
            <Github className="w-4 h-4" />
            See All Projects on GitHub
            <ChevronRight className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm
                       text-slate-300 transition-all duration-300 hover:text-white hover:-translate-y-1"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.4)";
              (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <Layers className="w-4 h-4" />
            Discuss a Project
          </a>
        </motion.div>

      </div>
    </section>
  );
}
