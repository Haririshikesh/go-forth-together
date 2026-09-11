import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Camera } from "lucide-react";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "magnetic" | "view">("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer ring
  const springX = useSpring(mouseX, { damping: 28, stiffness: 350, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 350, mass: 0.5 });

  useEffect(() => {
    // Only enable on desktop with mouse/fine pointer and when reduced-motion is not requested
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reducedMotion) {
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const galleryEl = target.closest("[data-cursor='view']");
      if (galleryEl) {
        setCursorType("view");
        return;
      }

      const interactiveEl = target.closest("a, button, [role='button'], input[type='submit']");
      if (interactiveEl) {
        setCursorType("magnetic");
        return;
      }

      setCursorType("default");
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  const ringSizes = {
    default: {
      width: 34,
      height: 34,
      borderColor: "oklch(0.78 0.13 86 / 60%)",
      backgroundColor: "transparent",
    },
    magnetic: {
      width: 50,
      height: 50,
      borderColor: "oklch(0.89 0.1 92 / 90%)",
      backgroundColor: "oklch(0.78 0.13 86 / 15%)",
    },
    view: {
      width: 70,
      height: 70,
      borderColor: "oklch(0.89 0.1 92 / 95%)",
      backgroundColor: "oklch(0.16 0 0 / 85%)",
    },
  };

  const currentStyle = ringSizes[cursorType];

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {/* 1:1 Instant Tracking Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? (cursorType === "view" ? 0 : 1) : 0,
          scale: cursorType === "magnetic" ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_oklch(0.78_0.13_86/80%)]"
      />

      {/* Spring Eased Outer Ring */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          width: currentStyle.width,
          height: currentStyle.height,
          borderColor: currentStyle.borderColor,
          backgroundColor: currentStyle.backgroundColor,
        }}
        transition={{
          width: { duration: 0.22, ease: "easeOut" },
          height: { duration: 0.22, ease: "easeOut" },
          opacity: { duration: 0.15 },
        }}
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border backdrop-blur-[1px]"
      >
        {cursorType === "view" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="flex flex-col items-center justify-center text-gold"
          >
            <Camera className="h-4 w-4" />
            <span className="mt-0.5 text-[9px] font-semibold tracking-wider uppercase">View</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
