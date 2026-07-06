"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  MapPin, Calendar, ChevronDown,
  CheckCircle2, Sparkles,
} from "lucide-react";
import { experience } from "@/lib/data";

/* ─────────────────────────────────────────────────────────
   Type extension — data.ts entries now carry accentColor etc.
───────────────────────────────────────────────────────── */
type ExperienceEntry = (typeof experience)[number];

/* ─────────────────────────────────────────────────────────
   Category badge colours
───────────────────────────────────────────────────────── */
const categoryStyle: Record<string, { bg: string; text: string; border: string }> = {
  "Software Development": { bg: "rgba(59,130,246,0.12)",  text: "#93C5FD", border: "rgba(59,130,246,0.25)" },
  "Leadership":           { bg: "rgba(6,182,212,0.12)",   text: "#67E8F9", border: "rgba(6,182,212,0.25)" },
  "Social Impact":        { bg: "rgba(139,92,246,0.12)",  text: "#C4B5FD", border: "rgba(139,92,246,0.25)" },
  "Academic":             { bg: "rgba(139,92,246,0.12)",  text: "#C4B5FD", border: "rgba(139,92,246,0.25)" },
  "Hackathon":            { bg: "rgba(245,158,11,0.12)",  text: "#FCD34D", border: "rgba(245,158,11,0.25)" },
};

/* ─────────────────────────────────────────────────────────
   Section label
───────────────────────────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 mb-4"
    >
      <span className="h-px w-8 bg-cyan-500/60" />
      <span className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-cyan-400">
        {text}
      </span>
      <span className="h-px w-8 bg-cyan-500/60" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Animated spine line — draws itself on scroll entry
───────────────────────────────────────────────────────── */
function TimelineSpine() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div
      ref={ref}
      className="absolute left-[22px] top-0 bottom-0 w-px overflow-hidden hidden sm:block"
      aria-hidden
    >
      {/* track */}
      <div className="absolute inset-0 bg-white/[0.04]" />
      {/* animated fill */}
      <motion.div
        initial={{ height: 0 }}
        animate={inView ? { height: "100%" } : {}}
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute top-0 left-0 right-0"
        style={{
          background:
            "linear-gradient(180deg, #3B82F6 0%, #06B6D4 40%, #8B5CF6 80%, transparent 100%)",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Timeline dot with pulse ring
───────────────────────────────────────────────────────── */
function TimelineDot({
  accent, active,
}: { accent: string; active: boolean }) {
  return (
    <div
      className="absolute left-[11px] top-8 w-[22px] h-[22px] hidden sm:flex
                 items-center justify-center z-10"
      aria-hidden
    >
      {/* pulse ring */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="pulse"
            initial={{ scale: 0.6, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
            className="absolute w-[22px] h-[22px] rounded-full"
            style={{ background: accent }}
          />
        )}
      </AnimatePresence>
      {/* outer ring */}
      <div
        className="w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center
                   transition-all duration-300"
        style={{
          borderColor: accent,
          background: active ? accent + "30" : "#050816",
          boxShadow: active ? `0 0 16px ${accent}80` : "none",
        }}
      >
        {/* inner dot */}
        <div
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{ background: accent }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Year connector badge — sits on the spine
───────────────────────────────────────────────────────── */
function YearBadge({ period, accent }: { period: string; accent: string }) {
  const year = period.split(" – ")[0].split(" ").pop() ?? period;
  return (
    <div
      className="hidden sm:inline-flex absolute -left-[1px] -top-4 z-20
                 items-center px-3 py-0.5 rounded-full text-[10px] font-mono font-bold
                 border whitespace-nowrap"
      style={{
        background: `${accent}18`,
        borderColor: `${accent}40`,
        color: accent,
        transform: "translateX(-50%) translateX(22px)",
      }}
    >
      {year}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Single experience card
───────────────────────────────────────────────────────── */
function ExperienceCard({
  job, index, isOpen, onToggle,
}: {
  job: ExperienceEntry;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const accent   = job.accentColor ?? "#3B82F6";
  const catStyle = categoryStyle[job.category ?? ""] ?? categoryStyle["Software Development"];

  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative sm:pl-14 pt-6"
    >
      {/* Year badge sits above dot */}
      <div className="hidden sm:block">
        <YearBadge period={job.period} accent={accent} />
      </div>

      {/* Dot */}
      <TimelineDot accent={accent} active={isOpen} />

      {/* ── Glass Card ── */}
      <motion.div
        animate={{
          borderColor: isOpen ? `${accent}50` : "rgba(255,255,255,0.06)",
          boxShadow: isOpen
            ? `0 0 0 1px ${accent}30, 0 8px 48px ${accent}18, 0 4px 24px rgba(0,0,0,0.5)`
            : "0 4px 24px rgba(0,0,0,0.35)",
        }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Coloured top stripe */}
        <div
          className="h-[2px] w-full"
          style={{ background: `linear-gradient(90deg, ${accent}, ${accent}40, transparent)` }}
        />

        {/* ── Card header (always visible / clickable) ── */}
        <button
          onClick={onToggle}
          className="w-full text-left p-6 group"
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "Collapse" : "Expand"} ${job.role} at ${job.company}`}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">

            {/* Left: icon + title block */}
            <div className="flex items-start gap-4">
              {/* Company icon */}
              <div
                className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center
                           text-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
              >
                {job.icon}
              </div>

              <div className="min-w-0">
                {/* Role */}
                <h3 className="font-bold text-white text-base leading-snug mb-1">
                  {job.role}
                </h3>
                {/* Company + type */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-semibold text-sm" style={{ color: accent }}>
                    {job.company}
                  </span>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                    style={catStyle}
                  >
                    {job.type}
                  </span>
                  {/* category tag */}
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                    style={catStyle}
                  >
                    {job.category}
                  </span>
                </div>
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {job.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: expand chevron */}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex-shrink-0 mt-1"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  background: isOpen ? `${accent}20` : "rgba(255,255,255,0.05)",
                  border: `1px solid ${isOpen ? accent + "40" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                <ChevronDown
                  className="w-4 h-4 transition-colors duration-200"
                  style={{ color: isOpen ? accent : "#64748b" }}
                />
              </div>
            </motion.div>
          </div>
        </button>

        {/* ── Expandable body ── */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div
                className="px-6 pb-7 pt-1 space-y-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="text-slate-400 text-sm leading-relaxed pt-4"
                >
                  {job.description}
                </motion.p>

                {/* Highlights */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: accent }} />
                    <span className="text-xs font-mono font-semibold tracking-widest uppercase"
                      style={{ color: accent }}>
                      Key Achievements
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {job.highlights.map((h, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + j * 0.07 }}
                        className="flex gap-3 text-sm text-slate-300 leading-relaxed"
                      >
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: accent }}
                        />
                        <span>{h}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech tags */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono font-semibold tracking-widest uppercase text-slate-500">
                      Technologies
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.tech.map((t, j) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + j * 0.04 }}
                        className="text-xs font-mono px-3 py-1 rounded-full
                                   transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                        style={{
                          background: `${accent}12`,
                          border: `1px solid ${accent}28`,
                          color: accent,
                        }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Project links — only rendered when present */}
                {(("github" in job && job.github) || ("live" in job && job.live)) && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex flex-wrap items-center gap-3 pt-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <span className="text-xs font-mono font-semibold tracking-widest uppercase text-slate-500 mr-1">
                      Links
                    </span>
                    {"github" in job && job.github && (
                      <a
                        href={job.github as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg
                                   text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#94A3B8",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "#fff";
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.22)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "#94A3B8";
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                        }}
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.004 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        GitHub Repo
                      </a>
                    )}
                    {"live" in job && job.live && (
                      <a
                        href={job.live as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg
                                   text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          background: `${accent}15`,
                          border: `1px solid ${accent}35`,
                          color: accent,
                        }}
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────── */
export default function Experience() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <section
      id="experience"
      className="relative w-full py-28 md:py-36 overflow-hidden"
    >
      {/* Section glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 35% at 50% 0%, rgba(6,182,212,0.05), transparent)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ── */}
        <div className="mb-16">
          <SectionLabel text="Experience" />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4"
          >
            Where I&apos;ve{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#60A5FA 0%,#06B6D4 50%,#a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Made an Impact
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base leading-relaxed max-w-xl"
          >
            From independent software work to leading teams at Google-organised hackathons
            and creating social value at scale — every role has sharpened a different edge.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
            className="mt-6 h-px w-24 rounded-full"
          >
            <div
              className="h-full w-full rounded-full"
              style={{ background: "linear-gradient(90deg,#3B82F6,#06B6D4)" }}
            />
          </motion.div>
        </div>

        {/* ── Timeline ── */}
        <div className="relative">
          <TimelineSpine />

          <div className="space-y-4">
            {experience.map((job, i) => (
              <ExperienceCard
                key={job.role}
                job={job}
                index={i}
                isOpen={openIdx === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>

          {/* End cap */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="hidden sm:flex items-center gap-3 mt-6 pl-[5px]"
          >
            <div
              className="w-[34px] h-[34px] rounded-full border-2 border-dashed
                         border-slate-700 flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-slate-700" />
            </div>
            <span className="text-xs text-slate-600 font-mono">More chapters ahead…</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
