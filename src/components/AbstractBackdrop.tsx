type Variant = "night" | "calm" | "burst";

/**
 * Subtle, non-clashing abstract art backdrop. Uses fixed full-viewport SVG
 * with low-opacity rolling shapes inspired by Matisse cut-outs + Turner skies.
 */
export function AbstractBackdrop({ variant = "night" }: { variant?: Variant }) {
  const palettes: Record<Variant, string[]> = {
    night: ["#1a1340", "#2a1f5c", "#4a3d8a", "#7c6fc4"],
    calm: ["#1d1745", "#3a2e72", "#6b5fb0", "#a89dd6"],
    burst: ["#2a1230", "#5b1f3a", "#a83a5b", "#e58a6b"],
  };
  const c = palettes[variant];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${c[0]} 0%, ${c[1]} 60%, ${c[2]} 100%)` }} />
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 1000">
        {/* Rolling hills */}
        <ellipse cx="200" cy="900" rx="900" ry="280" fill={c[2]} opacity="0.55" />
        <ellipse cx="1100" cy="950" rx="1100" ry="260" fill={c[3]} opacity="0.35" />
        <ellipse cx="800" cy="1050" rx="1300" ry="300" fill={c[2]} opacity="0.45" />
        {/* Celestial bodies */}
        <circle cx="220" cy="180" r="56" fill="#c14b3f" opacity="0.55" />
        <circle cx="220" cy="180" r="32" fill="#f0b25c" opacity="0.7" />
        <circle cx="1180" cy="160" r="44" fill="#b9b1e6" opacity="0.6" />
        <circle cx="1320" cy="240" r="14" fill="#e58a6b" opacity="0.7" />
        {/* Matisse leaves */}
        <path d="M780 220 q40 -50 90 -10 q-30 50 -90 10z" fill="#a83a5b" opacity="0.55" />
        <path d="M860 240 q40 -50 90 -10 q-30 50 -90 10z" fill="#7a8f6a" opacity="0.5" />
        {/* Strokes */}
        <line x1="380" y1="120" x2="380" y2="220" stroke="#e58a6b" strokeWidth="3" opacity="0.55" />
        <line x1="410" y1="140" x2="410" y2="200" stroke="#c14b3f" strokeWidth="3" opacity="0.55" />
        {/* Soft mist */}
        <ellipse cx="400" cy="700" rx="380" ry="80" fill="#ffffff" opacity="0.06" />
        <ellipse cx="1100" cy="640" rx="340" ry="70" fill="#ffffff" opacity="0.05" />
      </svg>
      <div className="absolute inset-0 backdrop-blur-[2px]" />
    </div>
  );
}
