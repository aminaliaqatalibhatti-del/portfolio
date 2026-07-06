"use client";

import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import { personal } from "@/lib/data";

const LINKS = [
  { icon: GithubIcon,   href: "https://github.com/aminaliaqatalibhatti-del", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/amina-liaqat",   label: "LinkedIn" },
];

export default function SideLinks() {
  return (
    <>
      {/* ── Left: icon links ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="fixed left-8 bottom-0 z-40 hidden xl:flex flex-col items-center gap-5"
        aria-label="Social links"
      >
        {LINKS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-slate-500 hover:text-brand-cyan hover:-translate-y-1
                       transition-all duration-200"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
        {/* vertical line */}
        <div className="w-px h-24 bg-gradient-to-b from-slate-500/40 to-transparent" />
      </motion.div>

      {/* ── Right: email ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="fixed right-8 bottom-0 z-40 hidden xl:flex flex-col items-center gap-5"
      >
        <a
          href={`mailto:${personal.email}`}
          className="font-mono text-xs text-slate-500 hover:text-brand-cyan
                     transition-colors duration-200 tracking-widest
                     [writing-mode:vertical-rl] hover:-translate-y-1"
          style={{ writingMode: "vertical-rl" }}
        >
          {personal.email}
        </a>
        <div className="w-px h-24 bg-gradient-to-b from-slate-500/40 to-transparent" />
      </motion.div>
    </>
  );
}
