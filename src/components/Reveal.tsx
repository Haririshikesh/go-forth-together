import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ label, title }: { label: string; title: ReactNode }) {
  return (
    <Reveal className="text-center">
      <p className="label-xs text-gold">{label}</p>
      <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold">{title}</h2>
      <div className="gold-rule mx-auto mt-5 w-28" />
    </Reveal>
  );
}
