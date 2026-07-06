"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/lib/data";

const CATEGORIES = Object.keys(skills) as Array<keyof typeof skills>;

const RADAR_QUADRANTS = [
  { label: "AI & ML Core",   color: "#3B82F6", glow: "rgba(59,130,246,0.3)",  pills: ["LLMs", "RAG", "RLHF", "Diffusion", "NLP", "Fine-tuning"] },
  { label: "Frameworks",     color: "#06B6D4", glow: "rgba(6,182,212,0.3)",   pills: ["PyTorch", "HuggingFace", "LangChain", "vLLM", "FAISS"] },
  { label: "Languages",      color: "#8B5CF6", glow: "rgba(139,92,246,0.3)",  pills: ["Python", "TypeScript", "C++", "Rust", "SQL"] },
  { label: "Cloud & MLOps",  color: "#F59E0B", glow: "rgba(245,158,11,0.3)", pills: ["AWS", "GCP", "MLflow", "K8s", "Terraform"] },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<keyof typeof skills>(CATEGORIES[0]);
  const activeSkills = skills[activeTab];

  return (
    <section id="skills" className="relative py-28 bg-[#050816] overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Label */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }} className="flex justify-center mb-4">
          <span className="section-label">
            <span className="w-6 h-px bg-cyan-400 inline-block" />Technical Skills<span className="w-6 h-px bg-cyan-400 inline-block" />
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-3">
          My{" "}
          <span style={{ background: "linear-gradient(135deg,#3B82F6,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Technical Arsenal
          </span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-slate-400 text-center text-base sm:text-lg mb-14 max-w-xl mx-auto">
          Deep expertise across the full AI/ML stack — from research to production.
        </motion.p>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveTab(cat)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              style={activeTab === cat
                ? { background: "linear-gradient(135deg,#3B82F6,#06B6D4)", color: "#fff", boxShadow: "0 0 20px rgba(59,130,246,0.45)" }
                : { background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.07)", color: "rgb(148,163,184)" }}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skill grid */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }} className="grid sm:grid-cols-2 gap-4 mb-16">
            {activeSkills.map((skill, i) => (
              <motion.div key={skill.name} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-white text-sm">{skill.name}</span>
                  <span className="font-mono text-xs font-bold" style={{ color: "#06B6D4" }}>{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg,#3B82F6,#06B6D4)", boxShadow: "0 0 10px rgba(6,182,212,0.6)" }}
                    initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.15 + i * 0.05, ease: "easeOut" }} />
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-xs text-slate-600">Beginner</span>
                  <span className="text-xs text-slate-600">Expert</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Tech Radar */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }} className="rounded-2xl p-8"
          style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-center mb-8">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 mb-1">Tech Radar</p>
            <h3 className="text-lg font-semibold text-white">Skills by Domain</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {RADAR_QUADRANTS.map((q, qi) => (
              <motion.div key={q.label} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: qi * 0.1 }}
                className="rounded-xl p-4 flex flex-col gap-2"
                style={{ background: `${q.color}08`, border: `1px solid ${q.color}22` }}>
                <p className="text-xs font-bold font-mono tracking-wider" style={{ color: q.color }}>{q.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {q.pills.map((pill, pi) => (
                    <motion.span key={pill} initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.3 + qi * 0.08 + pi * 0.04 }}
                      className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                      style={{ background: `${q.color}18`, border: `1px solid ${q.color}35`, color: q.color, boxShadow: `0 0 8px ${q.glow}` }}>
                      {pill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
