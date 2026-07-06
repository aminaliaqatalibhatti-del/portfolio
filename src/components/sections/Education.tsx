"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, MapPin, Calendar } from "lucide-react";
import { education } from "@/lib/data";

const STRIPE_COLORS = ["#3B82F6", "#8B5CF6"];
const TIER_LABELS   = ["Top 10 World Ranking", "Top 50 World Ranking"];
const TIER_WIDTHS   = ["90%", "75%"];
const TIER_COLORS   = ["#3B82F6", "#06B6D4"];

export default function Education() {
  return (
    <section id="education" className="relative py-28 bg-[#050816] overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 40% at 30% 50%, rgba(139,92,246,0.06) 0%, transparent 65%)" }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }} className="flex justify-center mb-4">
          <span className="section-label">
            <span className="w-6 h-px bg-cyan-400 inline-block" />Education<span className="w-6 h-px bg-cyan-400 inline-block" />
          </span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-3">
          Academic{" "}
          <span style={{ background: "linear-gradient(135deg,#8B5CF6,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Foundation</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-slate-400 text-center text-base sm:text-lg mb-14 max-w-xl mx-auto">
          Built on rigorous academic training at world-class institutions.
        </motion.p>

        <div className="flex flex-col gap-6">
          {education.map((edu, idx) => (
            <motion.div key={edu.school} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: idx * 0.12 }}
              whileHover={{ y: -4 }} className="relative rounded-2xl overflow-hidden group cursor-default"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 4px 32px rgba(0,0,0,0.35)", transition: "border-color 0.3s, box-shadow 0.3s" }}>
              {/* Left stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-300 group-hover:w-[4px]"
                style={{ background: STRIPE_COLORS[idx], boxShadow: `0 0 16px ${STRIPE_COLORS[idx]}80` }} />
              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 rounded-2xl"
                style={{ border: "1px solid rgba(59,130,246,0.35)", boxShadow: "0 0 30px rgba(59,130,246,0.12) inset" }} />

              <div className="pl-8 pr-6 py-7 sm:pl-10">
                <div className="flex items-start gap-5 mb-5">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-4xl"
                    style={{ background: `${STRIPE_COLORS[idx]}18`, border: `1px solid ${STRIPE_COLORS[idx]}30` }}>
                    {edu.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-lg sm:text-xl leading-snug mb-1">{edu.degree}</h3>
                    <p className="font-semibold text-base" style={{ color: "#06B6D4" }}>{edu.school}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-5">
                  <span className="flex items-center gap-1.5 text-sm text-slate-400"><Calendar className="w-3.5 h-3.5 text-slate-500" />{edu.period}</span>
                  <span className="flex items-center gap-1.5 text-sm text-slate-400"><MapPin className="w-3.5 h-3.5 text-slate-500" />{edu.location}</span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-lg"
                    style={{ color: "#F59E0B", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}>
                    <Award className="w-3.5 h-3.5" />GPA {edu.gpa}
                  </span>
                </div>

                <ul className="flex flex-col gap-2.5 mb-6">
                  {edu.highlights.map((h, hi) => (
                    <motion.li key={hi} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.25 + hi * 0.08 }}
                      className="flex items-start gap-2.5 text-sm text-slate-300">
                      <GraduationCap className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: STRIPE_COLORS[idx] }} />{h}
                    </motion.li>
                  ))}
                </ul>

                <div>
                  <p className="text-xs font-mono text-slate-500 mb-2 tracking-wider uppercase">University Prestige Tier</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <motion.div className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg,${TIER_COLORS[idx]},${TIER_COLORS[(idx+1)%2]})`, boxShadow: `0 0 8px ${TIER_COLORS[idx]}80` }}
                        initial={{ width: 0 }} whileInView={{ width: TIER_WIDTHS[idx] }} viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }} />
                    </div>
                    <span className="text-xs font-semibold whitespace-nowrap" style={{ color: TIER_COLORS[idx] }}>{TIER_LABELS[idx]}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
