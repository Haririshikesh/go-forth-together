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
          <Reveal key={g.url} delay={(i % 3) * 0.1} variant="scale">
            <button
              onClick={() => setIndex(i)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-border/80 bg-secondary/20 text-left transition-all duration-300 hover:border-gold/50"
            >
              <img
                src={g.url}
                alt={g.caption}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/95 via-background/30 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="label-xs w-fit rounded-full border border-gold/40 bg-background/90 px-2.5 py-0.5 text-[10px] text-gold uppercase tracking-wider backdrop-blur">
                  {g.category}
                </span>
                <p className="mt-1.5 text-sm font-medium text-foreground">{g.caption}</p>
              </div>
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
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
            onClick={() => setIndex(null)}
          >
            <button
              className="absolute top-5 right-5 text-gold hover:text-gold/80"
              aria-label="Close"
              onClick={() => setIndex(null)}
            >
              <X className="h-7 w-7" />
            </button>
            <button
              className="absolute left-3 text-gold hover:text-gold/80 sm:left-8"
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
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] text-center"
            >
              <img
                src={open.url}
                alt={open.caption}
                className="mx-auto max-h-[76vh] w-auto rounded-2xl border border-border/80 object-contain shadow-2xl"
              />
              <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <span className="label-xs rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] text-gold uppercase tracking-wider">
                  {open.category}
                </span>
                <span className="text-sm font-medium text-foreground sm:text-base">{open.caption}</span>
              </figcaption>
            </motion.figure>
            <button
              className="absolute right-3 text-gold hover:text-gold/80 sm:right-8"
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
