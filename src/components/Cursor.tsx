import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Camera } from "lucide-react";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isGallery, setIsGallery] = useState(false);

  const activeElementRef = useRef<HTMLElement | null>(null);

  // 1:1 Instant Mouse position for precision dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Target coordinates & dimensions for the magnetic viewfinder frame
  const targetX = useMotionValue(-100);
  const targetY = useMotionValue(-100);
  const targetW = useMotionValue(28);
  const targetH = useMotionValue(28);

  // Camera-stabilized snappy springs for the magnetic frame
  const springConfig = { damping: 26, stiffness: 360, mass: 0.45 };
  const frameX = useSpring(targetX, springConfig);
  const frameY = useSpring(targetY, springConfig);
  const frameW = useSpring(targetW, springConfig);
  const frameH = useSpring(targetH, springConfig);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer and when reduced motion is off
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reducedMotion) {
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const updateFramePosition = (clientX: number, clientY: number, target: HTMLElement | null) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
      if (!visible) setVisible(true);

      const interactive = target?.closest(
        "a, button, [role='button'], input[type='submit'], [data-cursor='view']",
      ) as HTMLElement | null;

      if (interactive) {
        activeElementRef.current = interactive;
        const rect = interactive.getBoundingClientRect();
        const galleryMatch = Boolean(interactive.closest("[data-cursor='view']"));
        const pad = galleryMatch ? 10 : 7;

        targetX.set(rect.left + rect.width / 2);
        targetY.set(rect.top + rect.height / 2);
        targetW.set(rect.width + pad * 2);
        targetH.set(rect.height + pad * 2);

        setIsLocked(true);
        setIsGallery(galleryMatch);
      } else {
        activeElementRef.current = null;
        targetX.set(clientX);
        targetY.set(clientY);
        targetW.set(28);
        targetH.set(28);

        setIsLocked(false);
        setIsGallery(false);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      updateFramePosition(e.clientX, e.clientY, e.target as HTMLElement | null);
    };

    const onScroll = () => {
      if (activeElementRef.current) {
        const rect = activeElementRef.current.getBoundingClientRect();
        const pad = isGallery ? 10 : 7;
        targetX.set(rect.left + rect.width / 2);
        targetY.set(rect.top + rect.height / 2);
        targetW.set(rect.width + pad * 2);
        targetH.set(rect.height + pad * 2);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [mouseX, mouseY, targetX, targetY, targetW, targetH, isGallery, visible]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {/* 1:1 Instant Precision Center Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? (isLocked ? 0.35 : 1) : 0,
          scale: isClicking ? 0.7 : 1,
        }}
        transition={{ duration: 0.12 }}
        className="fixed top-0 left-0 flex items-center justify-center"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_1px_oklch(0.78_0.13_86/90%)]" />
      </motion.div>

      {/* Magnetic Camera Viewfinder Frame with 4 Corner Brackets */}
      <motion.div
        style={{
          x: frameX,
          y: frameY,
          translateX: "-50%",
          translateY: "-50%",
          width: frameW,
          height: frameH,
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: isClicking ? (isLocked ? 0.97 : 0.78) : 1,
        }}
        transition={{
          scale: { duration: 0.1, ease: "easeOut" },
          opacity: { duration: 0.15 },
        }}
        className={`fixed top-0 left-0 pointer-events-none transition-shadow duration-300 ${
          isLocked
            ? "shadow-[0_0_24px_2px_oklch(0.78_0.13_86/22%)]"
            : "drop-shadow-[0_0_6px_oklch(0.78_0.13_86/35%)]"
        }`}
      >
        {/* 4 Corner Viewfinder Brackets */}
        {/* Top-Left Bracket */}
        <div
          className={`absolute -top-[1px] -left-[1px] transition-all duration-200 border-t-2 border-l-2 ${
            isLocked
              ? "h-3.5 w-3.5 border-gold-light rounded-tl-md"
              : "h-2 w-2 border-gold rounded-tl-xs"
          }`}
        />

        {/* Top-Right Bracket */}
        <div
          className={`absolute -top-[1px] -right-[1px] transition-all duration-200 border-t-2 border-r-2 ${
            isLocked
              ? "h-3.5 w-3.5 border-gold-light rounded-tr-md"
              : "h-2 w-2 border-gold rounded-tr-xs"
          }`}
        />

        {/* Bottom-Left Bracket */}
        <div
          className={`absolute -bottom-[1px] -left-[1px] transition-all duration-200 border-b-2 border-l-2 ${
            isLocked
              ? "h-3.5 w-3.5 border-gold-light rounded-bl-md"
              : "h-2 w-2 border-gold rounded-bl-xs"
          }`}
        />

        {/* Bottom-Right Bracket */}
        <div
          className={`absolute -bottom-[1px] -right-[1px] transition-all duration-200 border-b-2 border-r-2 ${
            isLocked
              ? "h-3.5 w-3.5 border-gold-light rounded-br-md"
              : "h-2 w-2 border-gold rounded-br-xs"
          }`}
        />

        {/* Camera Autofocus telemetry indicator when locked onto elements */}
        {isLocked && !isGallery && (
          <motion.div
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-4 right-0 flex items-center gap-1 font-mono text-[7.5px] font-semibold tracking-wider text-gold uppercase"
          >
            <span className="h-1 w-1 rounded-full bg-gold animate-ping" />
            <span>AF-LOCK</span>
          </motion.div>
        )}

        {isLocked && isGallery && (
          <motion.div
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-5 right-0 flex items-center gap-1 rounded-full border border-gold/40 bg-secondary/90 px-2 py-0.5 font-mono text-[8.5px] font-medium tracking-wider text-gold uppercase shadow-sm backdrop-blur-xs"
          >
            <Camera className="h-2.5 w-2.5" />
            <span>FOCUS · VIEW</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
