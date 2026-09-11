import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2.5px] origin-left pointer-events-none bg-gradient-to-r from-gold-deep via-gold to-gold-light shadow-[0_0_8px_oklch(0.78_0.13_86/60%)]"
      aria-hidden="true"
    />
  );
}
