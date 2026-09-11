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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0D0D0D_0%,#141414_45%,#1A1A1A_100%)]" />
        {/* faint large gold aperture / light-ring glow behind center */}
        <div className="absolute top-1/2 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.13_86/14%)_0%,oklch(0.78_0.13_86/5%)_35%,transparent_68%)] blur-2xl" />
        <div className="absolute top-1/2 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10" />
        <div className="absolute top-1/2 left-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15" />
        <GoldParticles />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto max-w-3xl px-5 pt-24 pb-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{
            opacity: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
            rotate: { duration: 28, repeat: Infinity, ease: "linear" },
          }}
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
      </motion.div>

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
