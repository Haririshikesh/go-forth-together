import { motion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "slide",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "slide" | "scale";
}) {
  const initial = variant === "scale" ? { opacity: 0, scale: 0.94 } : { opacity: 0, y: 28 };
  const inView = variant === "scale" ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={inView}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: variant === "scale" ? 0.9 : 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ label, title }: { label: string; title: ReactNode }) {
  return (
    <motion.div
      className="text-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
    >
      <motion.p
        className="label-xs text-gold"
        variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.7, ease }}
      >
        {label}
      </motion.p>
      <motion.h2
        className="mt-3 text-3xl font-semibold sm:text-4xl md:text-5xl"
        variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.8, ease }}
      >
        {title}
      </motion.h2>
      <motion.div
        className="gold-rule mx-auto mt-5 w-28 origin-center"
        variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1 } }}
        transition={{ duration: 0.9, ease }}
      />
    </motion.div>
  );
}
