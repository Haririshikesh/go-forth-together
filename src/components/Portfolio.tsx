import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal, SectionHeading } from "./Reveal";
import { gallery, type Category } from "@/lib/site";
import { ImageLightbox } from "./ImageLightbox";

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
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/80 bg-secondary/30 transition-[border-color,box-shadow] duration-300 hover:border-gold/60 hover:shadow-[0_0_24px_oklch(0.78_0.13_86/22%)]"
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
  return (
    <>
      <div className="relative overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/95 via-background/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="label-xs w-fit rounded-full border border-gold/40 bg-background/90 px-2.5 py-0.5 text-[10px] text-gold uppercase tracking-wider">
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

  const items = gallery.filter((g) => filter === "All" || g.category === filter);

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
      <ImageLightbox
        items={items}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </section>
  );
}
