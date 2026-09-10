import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { gallery, type Category } from "@/lib/site";

const filters: ("All" | Category)[] = ["All", "Weddings", "Engagement", "Babies", "Maternity"];

export function Portfolio() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [index, setIndex] = useState<number | null>(null);

  const items = gallery.filter((g) => filter === "All" || g.category === filter);
  const open = index !== null ? items[index] : null;

  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length));

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
          <Reveal key={g.url} delay={(i % 3) * 0.08}>
            <button
              onClick={() => setIndex(i)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-border"
            >
              <img
                src={g.url}
                alt={g.caption}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent px-4 pt-10 pb-4 text-left text-sm text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {g.caption}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-4"
            onClick={() => setIndex(null)}
          >
            <button
              className="absolute top-5 right-5 text-gold"
              aria-label="Close"
              onClick={() => setIndex(null)}
            >
              <X className="h-7 w-7" />
            </button>
            <button
              className="absolute left-3 text-gold sm:left-8"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
            >
              <ChevronLeft className="h-9 w-9" />
            </button>
            <motion.figure
              key={open.url}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[86vh] text-center"
            >
              <img
                src={open.url}
                alt={open.caption}
                className="mx-auto max-h-[78vh] w-auto rounded-2xl border border-border object-contain"
              />
              <figcaption className="label-xs mt-4 text-gold">{open.caption}</figcaption>
            </motion.figure>
            <button
              className="absolute right-3 text-gold sm:right-8"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
            >
              <ChevronRight className="h-9 w-9" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
