"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import {
  Brain, Code2, Cpu, Sparkles, Gamepad2,
  Layers, FlaskConical, Zap, ArrowRight,
  CheckCircle2,
} from "lucide-react";

/* ─── Types ─────────────────────────────────── */
interface PassionCard {
  icon: LucideIcon;
  title: string;
  desc: string;
  tags: string[];
  gradient: string;
  border: string;
  glow: string;
  iconColor: string;
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

/* ─── Data ──────────────────────────────────── */
const PASSIONS: PassionCard[] = [
  {
    icon: Brain,
    title: "Generative AI",
    desc: "Designing LLM pipelines, fine-tuning foundation models, and building RAG systems that go beyond demos into real-world production.",
    tags: ["LLMs", "RAG", "Fine-tuning", "RLHF"],
    gradient: "from-blue-600/15 via-blue-500/5 to-transparent",
    border: "rgba(59,130,246,0.2)",
    glow: "rgba(59,130,246,0.12)",
    iconColor: "#60A5FA",
  },
  {
    icon: Sparkles,
    title: "AI Agents",
    desc: "Architecting autonomous multi-agent systems with memory, planning, tool use, and self-reflection — turning complex workflows into intelligent pipelines.",
    tags: ["LangGraph", "AutoGen", "Tool Use", "Memory"],
    gradient: "from-cyan-600/15 via-cyan-500/5 to-transparent",
    border: "rgba(6,182,212,0.2)",
    glow: "rgba(6,182,212,0.12)",
    iconColor: "#67E8F9",
  },
  {
    icon: Code2,
    title: "Software Engineering",
    desc: "Full-stack development from FastAPI backends and vector databases to sleek React UIs — building systems that are both powerful and beautiful.",
    tags: ["Python", "TypeScript", "Next.js", "FastAPI"],
    gradient: "from-purple-600/15 via-purple-500/5 to-transparent",
    border: "rgba(139,92,246,0.2)",
    glow: "rgba(139,92,246,0.12)",
    iconColor: "#C4B5FD",
  },
  {
    icon: Cpu,
    title: "Machine Learning",
    desc: "From data pipelines to model training, evaluation harnesses, and production deployment — ML end-to-end is my craft.",
    tags: ["PyTorch", "HuggingFace", "MLOps", "CUDA"],
    gradient: "from-indigo-600/15 via-indigo-500/5 to-transparent",
    border: "rgba(99,102,241,0.2)",
    glow: "rgba(99,102,241,0.12)",
    iconColor: "#A5B4FC",
  },
  {
    icon: Gamepad2,
    title: "Unreal Engine",
    desc: "Blending AI with immersive real-time experiences — building intelligent NPCs, procedural content, and AI-driven game systems in Unreal Engine.",
    tags: ["UE5", "Blueprints", "C++", "AI Behaviours"],
    gradient: "from-rose-600/15 via-rose-500/5 to-transparent",
    border: "rgba(244,63,94,0.2)",
    glow: "rgba(244,63,94,0.12)",
    iconColor: "#FDA4AF",
  },
  {
    icon: FlaskConical,
    title: "Problem Solving",
    desc: "Breaking down ambiguous, hard problems into elegant solutions. Whether it's an algorithm, a system design, or a research hypothesis — I love the hunt.",
    tags: ["Algorithms", "System Design", "Research", "Innovation"],
    gradient: "from-amber-600/15 via-amber-500/5 to-transparent",
    border: "rgba(245,158,11,0.2)",
    glow: "rgba(245,158,11,0.12)",
    iconColor: "#FCD34D",
  },
];

const STATS: Stat[] = [
  { value: 20,  suffix: "+", label: "Projects Shipped",   icon: Layers,       color: "#60A5FA" },
  { value: 10,  suffix: "+", label: "Certifications",     icon: CheckCircle2, color: "#67E8F9" },
  { value: 15,  suffix: "+", label: "Technologies",       icon: Cpu,          color: "#C4B5FD" },
  { value: 3,   suffix: "+", label: "Years Experience",   icon: Zap,          color: "#FCD34D" },
];

const JOURNEY = [
  {
    year: "2021",
    title: "Started the AI Journey",
    body: "Fell in love with Machine Learning — built first neural networks, discovered transformers, and never looked back.",
    color: "#60A5FA",
  },
  {
    year: "2022",
    title: "Deep Dive into Generative AI",
    body: "Explored LLMs from GPT-2 to GPT-4, built custom fine-tuned models, and started shipping real AI products to users.",
    color: "#67E8F9",
  },
  {
    year: "2023",
    title: "AI Agents & Full Stack",
    body: "Architected autonomous agent systems, mastered RAG pipelines, and combined AI depth with full-stack engineering.",
    color: "#C4B5FD",
  },
  {
    year: "2024",
    title: "Production Scale & Unreal",
    body: "Scaled AI systems to millions of inferences, expanded into Unreal Engine AI experiences, and kept pushing the frontier.",
    color: "#FDA4AF",
  },
];

/* ─── Animated Counter ──────────────────────── */
function Counter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const ref        = useRef<HTMLSpanElement>(null);
  const inView     = useInView(ref, { once: true, margin: "-10%" });
  const motionVal  = useMotionValue(0);
  const spring     = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  return (
    <span ref={ref} className="tabular-nums" style={{ color }}>
      {display}{suffix}
    </span>
  );
}

/* ─── Stat Card ─────────────────────────────── */
function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const Icon = stat.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-default rounded-2xl p-6 overflow-hidden
                 transition-all duration-300"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${stat.color}18 0%, rgba(255,255,255,0.04) 100%)`
          : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? stat.color + "40" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered ? `0 0 30px ${stat.color}20, 0 4px 24px rgba(0,0,0,0.4)` : "0 4px 24px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
    >
      {/* BG glow orb */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20
                   transition-opacity duration-300 group-hover:opacity-40"
        style={{ background: `radial-gradient(circle, ${stat.color}, transparent 70%)`, filter: "blur(16px)" }}
      />

      <div className="relative z-10 flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}30` }}
        >
          <Icon className="w-5 h-5" style={{ color: stat.color }} />
        </div>
        <motion.div
          animate={{ rotate: hovered ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
        </motion.div>
      </div>

      <div className="relative z-10">
        <div className="text-4xl font-extrabold font-mono mb-1 leading-none">
          <Counter value={stat.value} suffix={stat.suffix} color={stat.color} />
        </div>
        <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
      </div>
    </motion.div>
  );
}

/* ─── Passion Card ──────────────────────────── */
function PassionCardComponent({ card, index }: { card: PassionCard; index: number }) {
  const Icon = card.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group rounded-2xl p-6 overflow-hidden cursor-default
                 transition-all duration-300"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${card.glow} 0%, rgba(255,255,255,0.04) 100%)`
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? card.border : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered ? `0 8px 40px ${card.glow}, 0 0 0 1px ${card.border}` : "none",
        transform: hovered ? "translateY(-5px) scale(1.01)" : "none",
      }}
    >
      {/* Gradient bg sweep */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${card.gradient}
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Top corner glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-30
                   transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at top right, ${card.iconColor}, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4
                     transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${card.iconColor}18`, border: `1px solid ${card.iconColor}30` }}
        >
          <Icon className="w-5 h-5" style={{ color: card.iconColor }} />
        </div>

        <h3 className="font-bold text-white text-base mb-2">{card.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{card.desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full transition-colors duration-200"
              style={{
                background: `${card.iconColor}12`,
                border: `1px solid ${card.iconColor}25`,
                color: card.iconColor,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Journey Timeline ──────────────────────── */
function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
        className="absolute left-5 top-2 bottom-2 w-px
                   bg-gradient-to-b from-blue-500/60 via-cyan-500/40 via-purple-500/30 to-transparent"
      />

      <div className="space-y-8">
        {JOURNEY.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.55, delay: i * 0.12 }}
            className="relative pl-14 group"
          >
            {/* Dot */}
            <div
              className="absolute left-[14px] top-1.5 w-3 h-3 rounded-full border-2 border-[#050816]
                         transition-all duration-300 group-hover:scale-125"
              style={{
                background: item.color,
                boxShadow: `0 0 10px ${item.color}90`,
              }}
            />

            {/* Card */}
            <div
              className="rounded-xl p-4 transition-all duration-300
                         group-hover:border-opacity-60"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(255,255,255,0.06)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${item.color}0D`;
                (e.currentTarget as HTMLElement).style.borderColor = `${item.color}40`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              <div className="flex items-center gap-3 mb-1.5">
                <span
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${item.color}20`, color: item.color }}
                >
                  {item.year}
                </span>
                <h4 className="text-white font-semibold text-sm">{item.title}</h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Terminal Block ────────────────────────── */
function Terminal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 40px rgba(0,0,0,0.4)",
      }}
    >
      {/* Bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}
      >
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-slate-500 font-mono">amina@lcwu:~$</span>
      </div>
      <pre className="p-5 text-xs font-mono leading-7 text-slate-300 overflow-x-auto">
        <code>
          <span style={{color:"#06B6D4"}}>const</span>{" "}
          <span style={{color:"#fff"}}>amina</span>{" "}
          <span style={{color:"#64748b"}}>{"= {"}</span>{"\n"}
          {"  "}<span style={{color:"#60A5FA"}}>role</span>
          <span style={{color:"#64748b"}}>:</span>{" "}
          <span style={{color:"#4ade80"}}>&quot;AI Engineer &amp; CS Undergraduate&quot;</span>
          <span style={{color:"#64748b"}}>,</span>{"\n"}
          {"  "}<span style={{color:"#60A5FA"}}>university</span>
          <span style={{color:"#64748b"}}>:</span>{" "}
          <span style={{color:"#4ade80"}}>&quot;Lahore College for Women University&quot;</span>
          <span style={{color:"#64748b"}}>,</span>{"\n"}
          {"  "}<span style={{color:"#60A5FA"}}>stack</span>
          <span style={{color:"#64748b"}}>: [</span>
          <span style={{color:"#4ade80"}}>&quot;Python&quot;</span>
          <span style={{color:"#64748b"}}>, </span>
          <span style={{color:"#4ade80"}}>&quot;React&quot;</span>
          <span style={{color:"#64748b"}}>, </span>
          <span style={{color:"#4ade80"}}>&quot;Flask&quot;</span>
          <span style={{color:"#64748b"}}>, </span>
          <span style={{color:"#4ade80"}}>&quot;C++&quot;</span>
          <span style={{color:"#64748b"}}>, </span>
          <span style={{color:"#4ade80"}}>&quot;UE5&quot;</span>
          <span style={{color:"#64748b"}}>],</span>{"\n"}
          {"  "}<span style={{color:"#60A5FA"}}>focus</span>
          <span style={{color:"#64748b"}}>:</span>{" "}
          <span style={{color:"#4ade80"}}>&quot;Generative AI &amp; Applied ML&quot;</span>
          <span style={{color:"#64748b"}}>,</span>{"\n"}
          {"  "}<span style={{color:"#60A5FA"}}>deployed</span>
          <span style={{color:"#64748b"}}>:</span>{" "}
          <span style={{color:"#4ade80"}}>&quot;TripPilot AI · Emotion Music App&quot;</span>
          <span style={{color:"#64748b"}}>,</span>{"\n"}
          {"  "}<span style={{color:"#60A5FA"}}>available</span>
          <span style={{color:"#64748b"}}>:</span>{" "}
          <span style={{color:"#06B6D4"}}>true</span>{"\n"}
          <span style={{color:"#64748b"}}>{"}"}</span>{"\n\n"}
          <span style={{color:"#64748b"}}>{"// Open to AI/ML internships & entry-level roles"}</span>{"\n"}
          <span style={{color:"#06B6D4"}}>{">"}</span>{" "}
          <span style={{color:"#fff"}}>_</span>
        </code>
      </pre>
    </motion.div>
  );
}

/* ─── Section Label ─────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 mb-4"
    >
      <span className="h-px w-8 bg-cyan-500/60 inline-block" />
      <span className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-cyan-400">
        {text}
      </span>
      <span className="h-px w-8 bg-cyan-500/60 inline-block" />
    </motion.div>
  );
}

/* ─── Main Export ───────────────────────────── */
export default function About() {
  return (
    <section
      id="about"
      className="relative w-full py-28 md:py-36 overflow-hidden"
    >
      {/* Section background accent */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(59,130,246,0.06), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══════════════════════════════════
            HEADING
        ══════════════════════════════════ */}
        <div className="text-center mb-20">
          <SectionLabel text="About Me" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4"
          >
            Passion meets{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#60A5FA 0%,#06B6D4 50%,#a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Precision
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            I don&apos;t just write code — I engineer intelligent experiences.
            From language models to game engines, I connect the dots between
            cutting-edge AI research and the products people use.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: "center" }}
            className="mt-6 h-px w-24 mx-auto rounded-full"
            aria-hidden="true"
          >
            <div
              className="h-full w-full rounded-full"
              style={{ background: "linear-gradient(90deg,#3B82F6,#06B6D4,#8B5CF6)" }}
            />
          </motion.div>
        </div>

        {/* ══════════════════════════════════
            STATS COUNTERS  (4 cards)
        ══════════════════════════════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* ══════════════════════════════════
            BIO  +  JOURNEY  (2 cols)
        ══════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-start">

          {/* Left — Bio + Terminal */}
          <div>
            <SectionLabel text="My Story" />
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl font-bold text-white mb-5"
            >
              Building{" "}
              <span style={{ color: "#60A5FA" }}>intelligent systems</span>
              {" "}that matter
            </motion.h3>

            <div className="space-y-4 text-slate-400 text-[15px] leading-relaxed mb-8">
              {[
                { key: "bio-1", text: "I'm Amina Liaqat — an AI Engineer and Computer Science undergraduate at Lahore College for Women University. I build real, deployed applications: a live AI travel platform covering 50+ destinations, and a full-stack healthcare system built and submitted at a national Google hackathon. My work is grounded in one principle — ship things that work." },
                { key: "bio-2", text: "My technical focus spans Generative AI, Natural Language Processing, applied Machine Learning, and full-stack development with Python, React, and Flask. I approach every project with an engineering mindset: understand the problem, design a clean solution, and deploy it." },
                { key: "bio-3", text: "I'm currently expanding into Unreal Engine 5 at NASTP Lahore's CEGA programme and completing UI/UX and AI with Python certifications — building the intersection between intelligent systems and immersive, user-first experiences." },
              ].map(({ key, text }, i) => (
                <motion.p
                  key={key}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <Terminal />
          </div>

          {/* Right — Timeline */}
          <div>
            <SectionLabel text="Journey" />
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl font-bold text-white mb-8"
            >
              How I got{" "}
              <span style={{ color: "#06B6D4" }}>here</span>
            </motion.h3>
            <Timeline />
          </div>
        </div>

        {/* ══════════════════════════════════
            PASSIONS  (6 cards grid)
        ══════════════════════════════════ */}
        <div>
          <div className="text-center mb-12">
            <SectionLabel text="What I Love" />
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl font-bold text-white"
            >
              My{" "}
              <span style={{
                background: "linear-gradient(135deg,#60A5FA,#a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Domains of Passion
              </span>
            </motion.h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PASSIONS.map((card, i) => (
              <PassionCardComponent key={card.title} card={card} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
