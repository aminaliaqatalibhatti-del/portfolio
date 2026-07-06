"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  GithubIcon, LinkedinIcon, Mail,
  ArrowDown, Eye, MessageCircle,
} from "lucide-react";
import TypingEffect from "./TypingEffect";

const CodeCube = dynamic(() => import("./CodeCube"), { ssr: false });

const SOCIALS = [
  { icon: GithubIcon,   href: "https://github.com/aminaliaqatalibhatti-del", label: "GitHub",   color: "#fff" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/amina-liaqat",   label: "LinkedIn", color: "#0A66C2" },
  { icon: Mail,         href: "mailto:aminaliaqatalibhatti@gmail.com",       label: "Email",    color: "#06B6D4" },
];

const TAGS = [
  "AI Engineer", "Generative AI", "LLM Systems",
  "AI Agents", "Web Developer", "App Developer",
  "Machine Learning", "Full Stack Dev", "Unreal Engine",
];

/* ─── Animated grid lines component ────────────────────── */
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Perspective grid floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "perspective(800px) rotateX(65deg)",
          transformOrigin: "bottom center",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 70%)",
        }}
      />
      {/* Top flat subtle grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}

/* ─── Glow orb component ────────────────────────────────── */
function GlowOrbs() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Primary blue — top center */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2
                      w-[900px] h-[600px] rounded-full opacity-20"
        style={{ background: "radial-gradient(ellipse, #3B82F6 0%, transparent 65%)", filter: "blur(80px)" }} />
      {/* Cyan — left */}
      <div className="absolute top-[20%] -left-[10%]
                      w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)", filter: "blur(60px)" }} />
      {/* Purple — right */}
      <div className="absolute top-[30%] -right-[8%]
                      w-[450px] h-[450px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)", filter: "blur(60px)" }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-48 z-10"
        style={{ background: "linear-gradient(to top, #050816, transparent)" }} />
    </div>
  );
}

/* ─── Main Hero ─────────────────────────────────────────── */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY   = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpa = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050816]"
    >
      {/* ── Layers ── */}
      <GlowOrbs />
      <AnimatedGrid />

      {/* Scanline overlay — subtle CRT vibe */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />

      {/* ── Content wrapper with parallax ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpa }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10
                   pt-24 pb-16 flex flex-col lg:flex-row items-center
                   justify-between gap-12 lg:gap-6 min-h-screen"
      >
        {/* ════════════════════════════════
            LEFT  — Text content
        ════════════════════════════════ */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7
                       border border-green-500/25 bg-green-500/[0.07]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-green-400 text-xs font-mono font-semibold tracking-widest uppercase">
              Open to AI, Web &amp; App Dev Roles Worldwide
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg font-mono text-slate-400 mb-1 tracking-wide"
          >
            Hi, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-3 leading-[0.95]"
          >
            <span className="text-white">Amina </span>
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #60A5FA 0%, #06B6D4 45%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Liaqat
              {/* Underline glow */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                style={{
                  background: "linear-gradient(90deg,#3B82F6,#06B6D4,#8B5CF6)",
                  transformOrigin: "left",
                }}
              />
            </span>
          </motion.h1>

          {/* Typing role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 h-10
                       text-transparent bg-clip-text"
            style={{
              background: "linear-gradient(135deg,#60A5FA,#06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <TypingEffect />
          </motion.div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl"
          >
            I build{" "}
            <span className="text-white font-medium">AI products</span>,{" "}
            <span className="text-brand-cyan font-medium">web applications</span>, and{" "}
            <span className="text-purple-400 font-medium">mobile apps</span> — from
            autonomous{" "}
            <span className="text-brand-cyan font-medium">AI agents</span> and{" "}
            <span className="text-brand-blue-light font-medium">LLM systems</span> to
            full-stack{" "}
            <span className="text-white font-medium">React &amp; Flask</span> platforms
            deployed live. Combining{" "}
            <span className="text-brand-cyan font-medium">Machine Learning</span> depth
            with{" "}
            <span className="text-white font-medium">end-to-end engineering</span>{" "}
            to ship things that actually work.
          </motion.p>

          {/* Tag cloud */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-wrap gap-2 mb-10 justify-center lg:justify-start"
          >
            {TAGS.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.06 }}
                whileHover={{ scale: 1.07, y: -1 }}
                className="text-xs font-mono px-3 py-1 rounded-full cursor-default
                           border border-white/[0.08] bg-white/[0.04] text-slate-400
                           hover:border-brand-cyan/30 hover:text-brand-cyan transition-colors"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="flex flex-wrap gap-3 mb-10 justify-center lg:justify-start"
          >
            {/* View Projects */}
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                         font-semibold text-sm text-white overflow-hidden transition-all duration-300"
              style={{ background: "linear-gradient(135deg,#3B82F6,#06B6D4)" }}
            >
              {/* Shine sweep */}
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                           transition-transform duration-700 ease-in-out"
                style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)" }}
                aria-hidden="true"
              />
              <Eye className="w-4 h-4" />
              View Projects
            </a>

            {/* Contact */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                         font-semibold text-sm text-slate-300 transition-all duration-300
                         hover:text-white hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.45)";
                e.currentTarget.style.background   = "rgba(139,92,246,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.background   = "rgba(255,255,255,0.04)";
              }}
            >
              <MessageCircle className="w-4 h-4" />
              Contact Me
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs text-slate-600 font-mono mr-1">Find me on</span>
            {SOCIALS.map(({ icon: Icon, href, label, color }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + i * 0.1, type: "spring", stiffness: 260 }}
                whileHover={{ scale: 1.18, y: -3 }}
                whileTap={{ scale: 0.92 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center
                           text-slate-400 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = color;
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}55`;
                  (e.currentTarget as HTMLElement).style.background = `${color}15`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                }}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ════════════════════════════════
            RIGHT — Profile image
        ════════════════════════════════ */}
        <div className="flex-shrink-0 flex flex-col items-center gap-6 lg:gap-8 lg:flex-1 lg:items-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex justify-center lg:justify-end"
          >
            <CodeCube />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10
                   flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-slate-600 tracking-[0.25em] uppercase">
          Scroll
        </span>
        {/* Animated mouse */}
        <div
          className="w-5 h-8 rounded-full border border-slate-700 flex justify-center pt-1.5"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full"
            style={{ background: "linear-gradient(180deg,#3B82F6,#06B6D4)" }}
          />
        </div>
        <motion.div
          animate={{ y: [0, 5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
