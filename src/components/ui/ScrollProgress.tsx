"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 inset-x-0 z-[100] h-[2px]
                 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple"
      aria-hidden="true"
    />
  );
}
