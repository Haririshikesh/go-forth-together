import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Reveal, SectionHeading } from "./Reveal";
import { gallery } from "@/lib/site";

const stats = [
  { value: 500, suffix: "+", label: "Events Shot" },
  { value: 5, suffix: "+", label: "Years" },
  { value: 100, suffix: "%", label: "Love" },
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
            {stats.map((s) => (
              <div key={s.label}>
                <Counter value={s.value} suffix={s.suffix} />
                <p className="label-xs mt-2 text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="grid grid-cols-2 gap-4">
          {gallery.slice(3, 7).map((g, i) => (
            <img
              key={g.url}
              src={g.url}
              alt={g.caption}
              loading="lazy"
              className={`w-full rounded-2xl border border-border object-cover ${
                i % 3 === 0 ? "h-56 sm:h-64" : "h-44 sm:h-52"
              }`}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
