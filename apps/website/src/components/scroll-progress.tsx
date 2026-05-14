"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="from-primary via-primary/80 to-primary/50 fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r rtl:origin-right"
    />
  );
}
