export function Aperture({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ap-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.89 0.1 92)" />
          <stop offset="55%" stopColor="oklch(0.78 0.13 86)" />
          <stop offset="100%" stopColor="oklch(0.63 0.13 79)" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke="url(#ap-gold)" strokeWidth="3" />
      <g fill="url(#ap-gold)" opacity="0.95">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <path key={deg} d="M50 50 L50 14 L78 30 Z" transform={`rotate(${deg} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="9" fill="oklch(0.16 0 0)" />
    </svg>
  );
}
