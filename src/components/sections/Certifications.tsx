"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/data";

const COLOR_MAP: Record<string, { accent: string; glow: string }> = {
  blue:   { accent: "#3B82F6", glow: "rgba(59,130,246,0.25)" },
  cyan:   { accent: "#06B6D4", glow: "rgba(6,182,212,0.25)" },
  purple: { accent: "#8B5CF6", glow: "rgba(139,92,246,0.25)" },
  indigo: { accent: "#6366F1", glow: "rgba(99,102,241,0.25)" },
};

function CheckmarkSVG({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden>
      <motion.path d="M2.5 8.5L6.5 12.5L13.5 4" stroke="#22C55E" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.6, delay, ease: "easeOut" }} />
    </svg>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-28 bg-[#050816] overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 40% at 70% 50%, rgba(6,182,212,0.06) 0%, transparent 65%)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }} className="flex justify-center mb-4">
          <span className="section-label">
            <span className="w-6 h-px bg-cyan-400 inline-block" />Certifications<span className="w-6 h-px bg-cyan-400 inline-block" />
          </span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-3">
          Verified{" "}
          <span style={{ background: "linear-gradient(135deg,#3B82F6,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Credentials</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-slate-400 text-center text-base sm:text-lg mb-14 max-w-xl mx-auto">
          Industry-recognised certifications validating expertise across AI, ML, and cloud platforms.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => {
            const colors = COLOR_MAP[cert.color] ?? COLOR_MAP.blue;
            return (
              <motion.div key={cert.credentialId} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative rounded-2xl p-6 flex flex-col gap-3 group cursor-default"
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)", transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s" }}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                  style={{ border: `1px solid ${colors.accent}55`, boxShadow: `0 0 24px ${colors.glow} inset, 0 0 32px ${colors.glow}` }} />

                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${colors.accent}18`, border: `1px solid ${colors.accent}30` }}>
                    {cert.icon}
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                    style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "#22C55E" }}>
                    <CheckmarkSVG delay={0.3 + i * 0.07} />Verified
                  </div>
                </div>

                <h3 className="font-bold text-white text-sm leading-snug mt-1">{cert.name}</h3>
                <p className="text-sm font-semibold" style={{ color: colors.accent }}>{cert.issuer}</p>
                <div className="flex-1" />

                <div className="flex items-center justify-between pt-3 mt-1"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="text-xs text-slate-500 font-mono">{cert.date}</span>
                  <span className="text-xs text-slate-600 font-mono truncate max-w-[120px]">#{cert.credentialId}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
