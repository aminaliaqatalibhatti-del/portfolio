"use client";

import { useState, useEffect } from "react";

const ROLES = [
  "AI Engineer",
  "Generative AI Engineer",
  "AI Agent Developer",
  "Web Developer",
  "App Developer",
  "Software Developer",
];

export default function TypingEffect() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const current = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplay(current.slice(0, displayed.length + 1)), 65);
    } else if (!deleting && displayed.length === current.length) {
      setPaused(true);
      timeout = setTimeout(() => { setPaused(false); setDeleting(true); }, 2400);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplay(current.slice(0, displayed.length - 1)), 38);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx, paused]);

  return (
    <span aria-live="polite" aria-atomic="true">
      {displayed}
      <span
        className="inline-block w-[3px] h-[1em] ml-[2px] align-middle rounded-sm"
        style={{
          background: "linear-gradient(180deg,#3B82F6,#06B6D4)",
          animation: "blink 1.1s step-end infinite",
        }}
      />
    </span>
  );
}
