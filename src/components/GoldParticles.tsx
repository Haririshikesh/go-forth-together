import { useMemo } from "react";

type Particle = {
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
};

type BokehOrb = {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
};

export function GoldParticles({ count = 50 }: { count?: number }) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => {
        // Deterministic pseudo-random so SSR/hydration match
        const seed = (i * 2654435761) % 100000;
        const r = (n: number) => ((seed * (n + 7)) % 1000) / 1000;
        return {
          left: `${(r(1) * 100).toFixed(2)}%`,
          size: 2 + r(2) * 5,
          delay: `${(-r(3) * 24).toFixed(2)}s`,
          duration: `${(14 + r(4) * 16).toFixed(2)}s`,
          opacity: 0.12 + r(5) * 0.4,
        };
      }),
    [count],
  );

  const bokehOrbs = useMemo<BokehOrb[]>(
    () => [
      { left: "12%", top: "18%", size: 75, delay: "0s", duration: "22s", opacity: 0.08 },
      { left: "82%", top: "35%", size: 90, delay: "-6s", duration: "28s", opacity: 0.07 },
      { left: "28%", top: "62%", size: 60, delay: "-12s", duration: "25s", opacity: 0.06 },
      { left: "75%", top: "78%", size: 80, delay: "-18s", duration: "30s", opacity: 0.08 },
      { left: "45%", top: "42%", size: 55, delay: "-9s", duration: "20s", opacity: 0.05 },
      { left: "8%", top: "85%", size: 70, delay: "-15s", duration: "24s", opacity: 0.07 },
    ],
    [],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Layer 1: Large Bokeh Orbs for depth */}
      {bokehOrbs.map((orb, i) => (
        <span
          key={`bokeh-${i}`}
          className="gold-bokeh absolute rounded-full"
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            opacity: orb.opacity,
            animationDuration: orb.duration,
            animationDelay: orb.delay,
          }}
        />
      ))}

      {/* Layer 2: Fine sparkling gold particles */}
      {particles.map((p, i) => (
        <span
          key={`part-${i}`}
          className="gold-particle absolute rounded-full"
          style={{
            left: p.left,
            bottom: "-4%",
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
