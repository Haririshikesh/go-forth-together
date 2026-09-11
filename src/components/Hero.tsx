import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import { Aperture } from "./Aperture";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={site.hero}
          alt="Couple at a South Indian wedding reception photographed by Esha Photography"
          className="h-full w-full animate-kenburns object-cover object-top"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/60 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 pt-24 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, rotate: -180, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-8 h-16 w-16 sm:h-20 sm:w-20"
        >
          <Aperture className="h-full w-full" />
        </motion.div>

        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {i === 0 && <p className="label-xs text-gold">Chennai · West Tambaram</p>}
            {i === 1 && (
              <h1 className="mt-4 text-4xl leading-tight font-semibold sm:text-6xl md:text-7xl">
                Esha <span className="gold-text">Photography</span>
                <span className="mt-2 block text-lg font-normal tracking-[0.3em] text-muted-foreground uppercase sm:text-xl">
                  & Management
                </span>
              </h1>
            )}
            {i === 2 && (
              <p className="mx-auto mt-6 max-w-xl font-script text-2xl text-gold sm:text-3xl">
                {site.tagline}
              </p>
            )}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#portfolio"
            className="gold-fill rounded-full px-7 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.04] active:scale-95"
          >
            View Portfolio
          </a>
          <a
            href="#contact"
            className="rounded-full border border-gold/60 px-7 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
          >
            Contact Us
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 z-10 text-gold"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-7 w-7" />
      </motion.a>
    </section>
  );
}
