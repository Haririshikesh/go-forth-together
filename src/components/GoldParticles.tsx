import { useMemo } from "react";

type Particle = {
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
};

export function GoldParticles({ count = 34 }: { count?: number }) {
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

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
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
