import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Aperture } from "./Aperture";

export function Preloader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user already saw the preloader this session or prefers reduced motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("esha_preloader_seen");

    if (!seen && !reducedMotion) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("esha_preloader_seen", "1");
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#0D0D0D]"
          aria-hidden="true"
        >
          {/* Ambient center glow */}
          <div className="absolute h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.13_86/22%)_0%,transparent_70%)] blur-2xl" />

          {/* Shutter reveal icon */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0, rotate: -90 }}
            animate={{
              scale: [0.75, 1.08, 1],
              opacity: [0, 1, 1],
              rotate: [-90, 0, 180],
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-20 w-20 sm:h-24 sm:w-24"
          >
            <Aperture className="h-full w-full drop-shadow-[0_0_15px_oklch(0.78_0.13_86/60%)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-center"
          >
            <p className="label-xs text-gold">Esha Photography</p>
            <div className="gold-rule mx-auto mt-2 w-16" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
