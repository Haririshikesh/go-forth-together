import { useCallback, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/lib/site";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function ImageLightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (idx: number) => void;
}) {
  const touchStartX = useRef<number | null>(null);
  const openItem = index !== null ? items[index] : null;

  const step = useCallback(
    (d: number) => {
      if (index === null) return;
      onIndexChange((index + d + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

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
    <Dialog open={openItem !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        hideCloseButton
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
        <DialogTitle className="sr-only">{openItem?.caption ?? "Photograph"}</DialogTitle>
        <DialogDescription className="sr-only">
          {openItem ? `${openItem.category} photography preview` : "Full resolution preview"}
        </DialogDescription>

        {/* Single elegant close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-gold/40 bg-secondary/80 text-gold transition-colors hover:bg-gold/20"
          aria-label="Close dialog"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Previous button */}
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

        {/* Next button */}
        <button
          onClick={() => step(1)}
          aria-label="Next image"
          className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-secondary/70 text-gold transition-transform hover:scale-110 hover:border-gold active:scale-95 sm:right-8"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </DialogContent>
    </Dialog>
  );
}
