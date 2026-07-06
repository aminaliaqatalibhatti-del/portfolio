"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const [visible, setVisible] = useState(false);

  const sx = useSpring(mx, { stiffness: 180, damping: 24 });
  const sy = useSpring(my, { stiffness: 180, damping: 24 });

  useEffect(() => {
    // Only mount on non-touch, pointer-fine devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setVisible(true);

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        style={{ left: sx, top: sy, x: "-50%", y: "-50%" }}
        className="fixed z-[9999] pointer-events-none w-8 h-8 rounded-full
                   border border-brand-blue/40 mix-blend-screen hidden lg:block"
        aria-hidden="true"
      />
      <motion.div
        style={{ left: mx, top: my, x: "-50%", y: "-50%" }}
        className="fixed z-[9999] pointer-events-none w-1.5 h-1.5 rounded-full
                   bg-brand-cyan mix-blend-screen hidden lg:block"
        aria-hidden="true"
      />
    </>
  );
}
