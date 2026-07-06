"use client";

import { motion } from "framer-motion";
import { Terminal, GithubIcon, LinkedinIcon, Mail, ArrowUp } from "lucide-react";
import { personal } from "@/lib/data";

const NAV_LINKS = [
  { label: "About",          href: "#about" },
  { label: "Experience",     href: "#experience" },
  { label: "Skills",         href: "#skills" },
  { label: "Projects",       href: "#projects" },
  { label: "Education",      href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Leadership",     href: "#leadership" },
  { label: "Contact",        href: "#contact" },
];

const SOCIALS = [
  { icon: GithubIcon,   href: "https://github.com/aminaliaqatalibhatti-del", label: "GitHub",   color: "#8B5CF6" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/amina-liaqat",   label: "LinkedIn", color: "#06B6D4" },
  { icon: Mail,         href: "mailto:aminaliaqatalibhatti@gmail.com",       label: "Email",    color: "#3B82F6" },
];

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {

  return (
    <footer className="relative bg-[#050816] overflow-hidden">
      {/* Grid bg */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      {/* Top border */}
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, #3B82F6 25%, #06B6D4 50%, #8B5CF6 75%, transparent 100%)", boxShadow: "0 0 20px rgba(59,130,246,0.4)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">

          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }} className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#3B82F6,#06B6D4)", boxShadow: "0 0 16px rgba(59,130,246,0.4)" }}>
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-mono font-bold text-white tracking-tight">
                Amina<span style={{ color: "#06B6D4" }}>.dev</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              AI Engineer &amp; Generative AI Specialist building intelligent, production-grade systems —
              from fine-tuned LLMs to autonomous agent pipelines.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href}
                    target={s.label !== "Email" ? "_blank" : undefined}
                    rel={s.label !== "Email" ? "noopener noreferrer" : undefined}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                    onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor=`${s.color}50`; el.style.background=`${s.color}15`; el.style.boxShadow=`0 0 12px ${s.color}40`; }}
                    onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor="rgba(255,255,255,0.07)"; el.style.background="rgba(255,255,255,0.05)"; el.style.boxShadow="none"; }}>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Nav */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 mb-5">Quick Nav</p>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200">
                    <span className="w-0 group-hover:w-3 h-px transition-all duration-200" style={{ background: "#06B6D4" }} aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="rounded-2xl p-6 h-full flex flex-col gap-4"
              style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.18)" }}>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <p className="text-sm font-semibold text-white">Open to AI Opportunities</p>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Available for AI engineering roles, consulting engagements, and collaborative projects.
              </p>
              <a href={`mailto:${personal.email}`}
                className="mt-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                style={{ background: "linear-gradient(135deg,#3B82F6,#06B6D4)", boxShadow: "0 0 16px rgba(59,130,246,0.3)" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 28px rgba(59,130,246,0.55)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 16px rgba(59,130,246,0.3)"; }}>
                <Mail className="w-4 h-4" />{personal.email}
              </a>
            </div>
          </motion.div>
        </div>

        <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.05)" }} aria-hidden="true" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 font-mono">&copy; {CURRENT_YEAR} {personal.name}. Built with Next.js 15 &amp; Framer Motion.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors duration-200 group">
            Back to top
            <span className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
