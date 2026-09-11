import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { gallery, type Category } from "@/lib/site";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const filters: ("All" | Category)[] = ["All", "Weddings", "Engagement", "Babies", "Maternity"];

function TiltCard({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 26 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 26 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      data-cursor="view"
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/80 bg-secondary/30 backdrop-blur-xs transition-[border-color,box-shadow] duration-300 hover:border-gold/60 hover:shadow-[0_0_24px_oklch(0.78_0.13_86/22%)]"
    >
      {children}
    </motion.div>
  );
}

function GalleryImage({
  src,
  alt,
  caption,
  category,
}: {
  src: string;
  alt: string;
  caption: string;
  category: Category;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`w-full object-cover transition-all duration-700 group-hover:scale-105 ${
            loaded ? "opacity-100 blur-0" : "opacity-40 blur-sm scale-102"
          }`}
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/95 via-background/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="label-xs w-fit rounded-full border border-gold/40 bg-background/90 px-2.5 py-0.5 text-[10px] text-gold uppercase tracking-wider backdrop-blur">
          {category}
        </span>
        <p className="mt-1.5 text-sm font-medium text-foreground">{caption}</p>
      </div>
    </>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [index, setIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const items = gallery.filter((g) => filter === "All" || g.category === filter);
  const openItem = index !== null ? items[index] : null;

  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  // Keyboard navigation
  useEffect(() => {
    if (index === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, step]);

  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading label="Portfolio" title="Selected work" />

      <Reveal className="mt-8 flex flex-wrap justify-center gap-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setIndex(null);
            }}
            className={`label-xs rounded-full border px-4 py-2 transition-colors ${
              filter === f
                ? "border-gold bg-gold/10 text-gold"
                : "border-border text-muted-foreground hover:text-gold"
            }`}
          >
            {f}
          </button>
        ))}
      </Reveal>

      <div className="mt-10 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {items.map((g, i) => (
          <Reveal key={g.url} delay={(i % 3) * 0.1} variant="scale">
            <TiltCard onClick={() => setIndex(i)}>
              <GalleryImage src={g.url} alt={g.caption} caption={g.caption} category={g.category} />
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* Accessible Radix Lightbox Dialog */}
      <Dialog open={openItem !== null} onOpenChange={(open) => !open && setIndex(null)}>
        <DialogContent
          className="fixed inset-0 z-[100] flex max-w-none h-screen w-screen translate-x-0 translate-y-0 flex-col items-center justify-center border-none bg-background/95 p-4 backdrop-blur-md"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const diff = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
            if (diff > 50) step(-1);
            if (diff < -50) step(1);
            touchStartX.current = null;
          }}
        >
          <DialogTitle className="sr-only">
            {openItem?.caption ?? "Portfolio photograph"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {openItem ? `${openItem.category} photography work` : "Full resolution gallery preview"}
          </DialogDescription>

          {/* Close button top right */}
          <button
            onClick={() => setIndex(null)}
            className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-secondary/80 text-gold transition-colors hover:bg-gold/20"
            aria-label="Close dialog"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous image button */}
          <button
            onClick={() => step(-1)}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-secondary/70 text-gold transition-transform hover:scale-110 hover:border-gold active:scale-95 sm:left-8"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Image Figure */}
          {openItem && (
            <motion.figure
              key={openItem.url}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex max-h-[86vh] max-w-4xl flex-col items-center justify-center text-center"
            >
              <div className="relative overflow-hidden rounded-2xl border border-gold/40 shadow-[0_0_40px_oklch(0.78_0.13_86/16%)]">
                <img
                  src={openItem.url}
                  alt={openItem.caption}
                  className="max-h-[72vh] w-auto max-w-full object-contain"
                />
              </div>

              <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <span className="label-xs rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] text-gold uppercase tracking-wider">
                  {openItem.category}
                </span>
                <span className="text-sm font-medium text-foreground sm:text-base">
                  {openItem.caption}
                </span>
                <span className="label-xs text-muted-foreground">
                  ({(index ?? 0) + 1} / {items.length})
                </span>
              </figcaption>
            </motion.figure>
          )}

          {/* Next image button */}
          <button
            onClick={() => step(1)}
            aria-label="Next image"
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-secondary/70 text-gold transition-transform hover:scale-110 hover:border-gold active:scale-95 sm:right-8"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
