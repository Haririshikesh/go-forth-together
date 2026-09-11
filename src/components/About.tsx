import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Award, Camera, Heart } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { aboutImages } from "@/lib/site";
import { ImageLightbox } from "./ImageLightbox";

const stats = [
  { value: 500, suffix: "+", label: "Events Shot", icon: Camera },
  { value: 5, suffix: "+", label: "Years", icon: Award },
  { value: 100, suffix: "%", label: "Love", icon: Heart },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="gold-text text-4xl font-semibold sm:text-5xl">
      {n}
      {suffix}
    </span>
  );
}

export function About() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading label="About the studio" title="Frames that feel like memories" />

      <div className="mt-14 grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Esha Photography &amp; Management is a West Tambaram–based studio capturing life's most
            precious moments — from first smiles to forever vows. We blend candid storytelling with
            timeless, elegant frames, and manage every detail so you can simply live the moment.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex flex-col items-center">
                  <Icon className="mb-2.5 h-6 w-6 text-gold" strokeWidth={1.5} />
                  <Counter value={s.value} suffix={s.suffix} />
                  <p className="label-xs mt-2 text-muted-foreground">{s.label}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="grid grid-cols-2 gap-4 sm:gap-6">
          {aboutImages.map((g, i) => (
            <div
              key={g.url}
              data-cursor="view"
              onClick={() => setLightboxIndex(i)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-border/80 bg-secondary/30 transition-all duration-300 hover:border-gold/60 hover:shadow-[0_0_20px_oklch(0.78_0.13_86/20%)] ${
                i % 2 === 1 ? "mt-4 sm:mt-6" : ""
              }`}
            >
              <img
                src={g.url}
                alt={g.caption}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  i % 2 === 0 ? "h-56 sm:h-64" : "h-48 sm:h-56"
                }`}
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/90 via-background/20 to-transparent p-3 sm:p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="label-xs w-fit rounded-full border border-gold/40 bg-background/85 px-2 py-0.5 text-[10px] text-gold uppercase tracking-wider">
                  {g.category}
                </span>
                <p className="mt-1 line-clamp-1 text-xs font-medium text-foreground sm:text-sm">
                  {g.caption}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      <ImageLightbox
        items={aboutImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
