"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { leadership } from "@/lib/data";

const CARD_ACCENTS = ["#3B82F6", "#06B6D4", "#8B5CF6", "#F59E0B"];

const COMMUNITY_STATS = [
  { label: "Students Mentored", value: "20+", color: "#3B82F6" },
  { label: "PRs Reviewed",      value: "200+", color: "#06B6D4" },
  { label: "Event Attendees",   value: "1000+", color: "#8B5CF6" },
  { label: "Community Members", value: "500+",  color: "#F59E0B" },
];

export default function Leadership() {
  return (
    <section
      id="leadership"
      className="relative py-28 bg-[#050816] overflow-hidden"
    >
      {/* Background ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 80%, rgba(139,92,246,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <span className="section-label">
            <span className="w-6 h-px bg-cyan-400 inline-block" />
            Leadership &amp; Volunteering
            <span className="w-6 h-px bg-cyan-400 inline-block" />
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-3"
        >
          Driving{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #8B5CF6, #06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Community Impact
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-slate-400 text-center text-base sm:text-lg mb-14 max-w-xl mx-auto"
        >
          Mentoring the next generation of AI engineers and building inclusive tech communities.
        </motion.p>

        {/* 2-col grid */}
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {leadership.map((item, i) => {
            const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
            return (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-2xl p-6 group cursor-default overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                whileHover={{ y: -4 }}
              >
                {/* Left border accent — appears on hover */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[3px] rounded-l-2xl transition-all duration-300"
                  style={{
                    background: accent,
                    boxShadow: `0 0 12px ${accent}80`,
                  }}
                />

                {/* Hover glow border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                  style={{
                    border: `1px solid ${accent}40`,
                    boxShadow: `0 0 28px ${accent}18 inset`,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4"
                  style={{
                    background: `${accent}18`,
                    border: `1px solid ${accent}30`,
                  }}
                >
                  {item.icon}
                </div>

                {/* Role */}
                <h3 className="font-bold text-white text-lg leading-snug mb-1">
                  {item.role}
                </h3>

                {/* Org */}
                <p className="text-sm font-semibold mb-1" style={{ color: "#06B6D4" }}>
                  {item.organization}
                </p>

                {/* Period */}
                <p className="text-xs font-mono text-slate-500 mb-3">{item.period}</p>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Impact pill */}
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: `${accent}12`,
                    border: `1px solid ${accent}35`,
                    color: accent,
                  }}
                >
                  <TrendingUp className="w-3.5 h-3.5" aria-hidden />
                  {item.impact}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Community Impact Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl p-7"
          style={{
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 mb-6 text-center">
            Community Impact
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {COMMUNITY_STATS.map((stat, si) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 + si * 0.07 }}
                className="text-center"
              >
                <p
                  className="text-3xl font-bold font-mono mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500 leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
