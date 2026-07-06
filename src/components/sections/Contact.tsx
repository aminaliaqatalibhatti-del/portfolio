"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, GithubIcon, LinkedinIcon, Clock, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { personal } from "@/lib/data";

type FormState = "idle" | "loading" | "success" | "error";

const LIMITS = {
  name:    { min: 2,  max: 100 },
  email:   { min: 5,  max: 254 },
  subject: { min: 3,  max: 200 },
  message: { min: 10, max: 2000 },
};

function sanitise(value: string): string {
  return value.replace(/[\x00-\x1F\x7F]/g, "").trim();
}

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

interface ValidationResult {
  ok:      boolean;
  message: string;
}

function validate(fields: Record<string, string>): ValidationResult {
  const name    = sanitise(fields.name);
  const email   = sanitise(fields.email).toLowerCase();
  const subject = sanitise(fields.subject);
  const message = sanitise(fields.message);

  if (name.length    < LIMITS.name.min)    return { ok: false, message: "Name must be at least 2 characters." };
  if (name.length    > LIMITS.name.max)    return { ok: false, message: "Name is too long (max 100 characters)." };
  if (!EMAIL_RE.test(email))               return { ok: false, message: "Please enter a valid email address." };
  if (email.length   > LIMITS.email.max)   return { ok: false, message: "Email address is too long." };
  if (subject.length < LIMITS.subject.min) return { ok: false, message: "Subject must be at least 3 characters." };
  if (subject.length > LIMITS.subject.max) return { ok: false, message: "Subject is too long (max 200 characters)." };
  if (message.length < LIMITS.message.min) return { ok: false, message: "Message must be at least 10 characters." };
  if (message.length > LIMITS.message.max) return { ok: false, message: `Message is too long (max ${LIMITS.message.max} characters).` };

  return { ok: true, message: "" };
}

const SOCIAL_LINKS = [
  { label: "Email",    value: personal.email,                            href: `mailto:${personal.email}`, icon: Mail,         color: "#3B82F6", glow: "rgba(59,130,246,0.3)" },
  { label: "GitHub",   value: personal.github.replace("https://",""),    href: personal.github,            icon: GithubIcon,   color: "#8B5CF6", glow: "rgba(139,92,246,0.3)" },
  { label: "LinkedIn", value: personal.linkedin.replace("https://",""),  href: personal.linkedin,          icon: LinkedinIcon, color: "#06B6D4", glow: "rgba(6,182,212,0.3)" },
];

const inputBase = "w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/60";
const inputStyle = { background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)" };

export default function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [fields, setFields]       = useState({ name: "", email: "", subject: "", message: "" });
  const [validationMsg, setValidationMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Clear validation error as user types
    if (validationMsg) setValidationMsg("");
    setFields((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation before any network call
    const result = validate(fields);
    if (!result.ok) {
      setValidationMsg(result.message);
      setFormState("error");
      return;
    }

    setFormState("loading");
    setValidationMsg("");

    // Wire a real email service here (Resend, EmailJS, Formspree, etc.)
    // before deploying to production.
    await new Promise((r) => setTimeout(r, 1200));
    setFormState("success");
    setFields({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-28 bg-[#050816] overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(59,130,246,0.07) 0%, transparent 65%)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }} className="flex justify-center mb-4">
          <span className="section-label">
            <span className="w-6 h-px bg-cyan-400 inline-block" />Get In Touch<span className="w-6 h-px bg-cyan-400 inline-block" />
          </span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-3">
          Let&apos;s Build Something{" "}
          <span style={{ background: "linear-gradient(135deg,#3B82F6,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Remarkable</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-slate-400 text-center text-base sm:text-lg mb-14 max-w-xl mx-auto">
          Have a project in mind or an opportunity to discuss? I&apos;d love to hear from you.
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left panel */}
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }} className="lg:w-2/5 flex flex-col gap-5">
            {/* Availability */}
            <div className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <p className="font-semibold text-white text-sm">Available for Work</p>
              </div>
              <p className="text-slate-400 text-sm">Open to AI engineering roles, consulting, and collaboration opportunities.</p>
            </div>

            {/* Social links */}
            {SOCIAL_LINKS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.a key={s.label} href={s.href}
                  target={s.label !== "Email" ? "_blank" : undefined}
                  rel={s.label !== "Email" ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }} whileHover={{ x: 6 }}
                  className="flex items-center gap-4 rounded-2xl p-4 group"
                  style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.07)", transition: "border-color 0.25s, box-shadow 0.25s" }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = `${s.color}50`; el.style.boxShadow = `0 0 20px ${s.glow}`; }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.boxShadow = "none"; }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                    <Icon className="w-4 h-4" style={{ color: s.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 mb-0.5">{s.label}</p>
                    <p className="text-sm text-slate-300 font-medium truncate group-hover:text-white transition-colors">{s.value}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" style={{ color: s.color }} />
                </motion.a>
              );
            })}

            {/* Response time */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }} className="flex items-center gap-3 rounded-2xl p-4"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Clock className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <p className="text-sm text-slate-400">Typical response: <span className="font-semibold" style={{ color: "#22C55E" }}>&lt; 24 hours</span></p>
            </motion.div>
          </motion.div>

          {/* Right panel — form */}
          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.25 }} className="lg:w-3/5 rounded-2xl p-7"
            style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 40px rgba(0,0,0,0.3)" }}>
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <CheckCircle2 className="w-14 h-14" style={{ color: "#22C55E" }} />
                  <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                  <p className="text-slate-400 text-sm max-w-xs">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                  <button onClick={() => setFormState("idle")} className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2">Send another message</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }} className="flex flex-col gap-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="cf-name" className="text-xs font-medium text-slate-400">Full Name</label>
                      <input id="cf-name" name="name" type="text" placeholder="Jane Smith" required
                        value={fields.name} onChange={handleChange}
                        maxLength={LIMITS.name.max}
                        autoComplete="name"
                        className={inputBase} style={inputStyle} disabled={formState === "loading"} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="cf-email" className="text-xs font-medium text-slate-400">Email Address</label>
                      <input id="cf-email" name="email" type="email" placeholder="jane@example.com" required
                        value={fields.email} onChange={handleChange}
                        maxLength={LIMITS.email.max}
                        autoComplete="email"
                        className={inputBase} style={inputStyle} disabled={formState === "loading"} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cf-subject" className="text-xs font-medium text-slate-400">Subject</label>
                    <input id="cf-subject" name="subject" type="text" placeholder="AI project collaboration" required
                      value={fields.subject} onChange={handleChange}
                      maxLength={LIMITS.subject.max}
                      className={inputBase} style={inputStyle} disabled={formState === "loading"} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cf-message" className="text-xs font-medium text-slate-400">
                      Message
                      <span className="ml-2 text-slate-600 font-mono">
                        {fields.message.length}/{LIMITS.message.max}
                      </span>
                    </label>
                    <textarea id="cf-message" name="message" rows={5}
                      placeholder="Tell me about your project or opportunity..." required
                      value={fields.message} onChange={handleChange}
                      maxLength={LIMITS.message.max}
                      className={`${inputBase} resize-none`} style={inputStyle} disabled={formState === "loading"} />
                  </div>
                  <AnimatePresence>
                    {formState === "error" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-2 text-sm text-red-400">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {validationMsg || "Something went wrong. Please try again."}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.button type="submit" disabled={formState === "loading"} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    className="relative w-full py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg,#3B82F6,#06B6D4)", boxShadow: "0 0 24px rgba(59,130,246,0.35)" }}
                    onMouseEnter={(e) => { if (formState !== "loading") e.currentTarget.style.boxShadow = "0 0 40px rgba(59,130,246,0.55)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 24px rgba(59,130,246,0.35)"; }}>
                    <span aria-hidden className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700"
                      style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)" }} />
                    <span className="relative flex items-center justify-center gap-2">
                      {formState === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" />Sending…</> : <>Send Message<ArrowRight className="w-4 h-4" /></>}
                    </span>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
