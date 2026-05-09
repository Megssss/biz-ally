type Variant = "paper" | "calm" | "burst" | "splash" | "geometry" | "scenery" | "panels" | "brush";

/**
 * Abstract / modern-art inspired backdrops.
 * Palette (per reference): periwinkle, lavender, maroon, tangerine, pink, sage,
 * laid over a warm cream paper base so foreground text stays legible.
 *
 * Each variant gives a page its own composition — paint splashes, brush
 * strokes, soft geometry, rolling panels, abstract scenery, etc.
 */
export function AbstractBackdrop({ variant = "paper" }: { variant?: Variant }) {
  // shared palette
  const C = {
    periwinkle: "#7d8acb",
    lavender: "#cdb8e0",
    maroon: "#8a2a3a",
    tangerine: "#e0823c",
    pink: "#d56d8a",
    sage: "#7fae93",
    ink: "#2a2547",
  };

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--color-background)" }} />

      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1600 1000"
      >
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 0.2  0 0 0 0 0.15  0 0 0 0 0.25  0 0 0 0.05 0" />
          </filter>
          <filter id="blur40"><feGaussianBlur stdDeviation="40" /></filter>
          <filter id="blur20"><feGaussianBlur stdDeviation="20" /></filter>
          <filter id="blur8"><feGaussianBlur stdDeviation="8" /></filter>
          <filter id="rough">
            <feTurbulence baseFrequency="0.02" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="14" />
          </filter>

          {/* soft washes */}
          <radialGradient id="wA" cx="20%" cy="15%" r="55%">
            <stop offset="0%" stopColor={C.pink} stopOpacity="0.45" />
            <stop offset="100%" stopColor={C.pink} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="wB" cx="85%" cy="10%" r="55%">
            <stop offset="0%" stopColor={C.lavender} stopOpacity="0.55" />
            <stop offset="100%" stopColor={C.lavender} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="wC" cx="75%" cy="90%" r="65%">
            <stop offset="0%" stopColor={C.tangerine} stopOpacity="0.4" />
            <stop offset="100%" stopColor={C.tangerine} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="wD" cx="10%" cy="80%" r="55%">
            <stop offset="0%" stopColor={C.sage} stopOpacity="0.4" />
            <stop offset="100%" stopColor={C.sage} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="wE" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor={C.periwinkle} stopOpacity="0.35" />
            <stop offset="100%" stopColor={C.periwinkle} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* base washes — present on every variant for cohesion */}
        <rect width="1600" height="1000" fill="url(#wA)" />
        <rect width="1600" height="1000" fill="url(#wB)" />
        <rect width="1600" height="1000" fill="url(#wC)" />
        <rect width="1600" height="1000" fill="url(#wD)" />

        {variant === "paper" && (
          <g opacity="0.9">
            {/* Matisse-cut organic shapes */}
            <path d="M 120 720 Q 240 600 380 660 Q 520 720 460 820 Q 360 900 220 860 Q 80 820 120 720 Z" fill={C.maroon} opacity="0.10" />
            <path d="M 1180 160 Q 1300 80 1420 160 Q 1500 260 1380 320 Q 1240 360 1180 280 Q 1120 220 1180 160 Z" fill={C.periwinkle} opacity="0.12" />
            <circle cx="1320" cy="780" r="120" fill={C.tangerine} opacity="0.10" />
            <circle cx="280" cy="220" r="60" fill={C.maroon} opacity="0.10" />
          </g>
        )}

        {variant === "splash" && (
          <g filter="url(#rough)">
            {/* Helen Frankenthaler-style soak-stain splashes */}
            <ellipse cx="320" cy="280" rx="260" ry="160" fill={C.maroon} opacity="0.18" filter="url(#blur20)" />
            <ellipse cx="1250" cy="220" rx="200" ry="120" fill={C.tangerine} opacity="0.20" filter="url(#blur20)" />
            <ellipse cx="900" cy="780" rx="320" ry="180" fill={C.periwinkle} opacity="0.18" filter="url(#blur20)" />
            <ellipse cx="220" cy="820" rx="180" ry="120" fill={C.sage} opacity="0.20" filter="url(#blur20)" />
            <circle cx="1380" cy="560" r="40" fill={C.pink} opacity="0.45" />
            <circle cx="700" cy="180" r="22" fill={C.maroon} opacity="0.55" />
            <circle cx="540" cy="500" r="14" fill={C.tangerine} opacity="0.7" />
          </g>
        )}

        {variant === "geometry" && (
          <g>
            {/* Sophie Taeuber-Arp soft geometry */}
            <circle cx="220" cy="240" r="140" fill={C.periwinkle} opacity="0.22" />
            <rect x="1080" y="120" width="280" height="280" rx="36" fill={C.lavender} opacity="0.30" transform="rotate(-8 1220 260)" />
            <rect x="120" y="640" width="240" height="240" rx="42" fill={C.sage} opacity="0.30" transform="rotate(6 240 760)" />
            <circle cx="1320" cy="780" r="110" fill={C.tangerine} opacity="0.25" />
            <circle cx="760" cy="500" r="60" fill={C.maroon} opacity="0.25" />
            <line x1="0" y1="500" x2="1600" y2="540" stroke={C.ink} strokeOpacity="0.08" strokeWidth="2" />
          </g>
        )}

        {variant === "scenery" && (
          <g>
            {/* Turner-esque rolling horizon */}
            <path d="M0 720 Q 400 620 800 700 T 1600 680 L 1600 1000 L 0 1000 Z" fill={C.sage} opacity="0.28" />
            <path d="M0 800 Q 400 740 800 790 T 1600 770 L 1600 1000 L 0 1000 Z" fill={C.maroon} opacity="0.16" />
            <ellipse cx="1180" cy="240" rx="180" ry="60" fill={C.tangerine} opacity="0.30" filter="url(#blur20)" />
            <ellipse cx="380" cy="180" rx="220" ry="50" fill={C.pink} opacity="0.30" filter="url(#blur20)" />
            <circle cx="1280" cy="220" r="44" fill={C.tangerine} opacity="0.55" />
          </g>
        )}

        {variant === "panels" && (
          <g>
            {/* Rolling color panels — Diebenkorn / Ocean Park */}
            <rect x="0" y="0" width="1600" height="220" fill={C.lavender} opacity="0.28" />
            <rect x="0" y="220" width="1600" height="80" fill={C.pink} opacity="0.20" />
            <rect x="0" y="720" width="1600" height="60" fill={C.maroon} opacity="0.18" />
            <rect x="0" y="780" width="1600" height="220" fill={C.sage} opacity="0.25" />
            <line x1="980" y1="0" x2="980" y2="1000" stroke={C.ink} strokeOpacity="0.08" />
            <line x1="0" y1="300" x2="1600" y2="300" stroke={C.ink} strokeOpacity="0.08" />
            <circle cx="1300" cy="500" r="50" fill={C.tangerine} opacity="0.45" />
          </g>
        )}

        {variant === "brush" && (
          <g>
            {/* Cy Twombly / Kline brush sweeps */}
            <path d="M -40 320 C 300 220, 680 420, 1000 300 S 1500 380, 1700 280" stroke={C.maroon} strokeWidth="32" strokeLinecap="round" fill="none" opacity="0.18" filter="url(#blur8)" />
            <path d="M -40 560 C 360 700, 720 480, 1080 620 S 1500 520, 1700 640" stroke={C.periwinkle} strokeWidth="40" strokeLinecap="round" fill="none" opacity="0.18" filter="url(#blur8)" />
            <path d="M 200 820 C 500 760, 900 880, 1400 800" stroke={C.tangerine} strokeWidth="22" strokeLinecap="round" fill="none" opacity="0.30" />
            <circle cx="1260" cy="200" r="38" fill={C.pink} opacity="0.50" />
            <circle cx="320" cy="180" r="22" fill={C.sage} opacity="0.55" />
          </g>
        )}

        {variant === "calm" && (
          <g>
            <rect width="1600" height="1000" fill="url(#wE)" />
            <ellipse cx="800" cy="500" rx="500" ry="240" fill={C.lavender} opacity="0.18" filter="url(#blur40)" />
          </g>
        )}

        {variant === "burst" && (
          <g>
            <circle cx="800" cy="500" r="320" fill={C.tangerine} opacity="0.18" filter="url(#blur20)" />
            <circle cx="800" cy="500" r="180" fill={C.pink} opacity="0.22" filter="url(#blur8)" />
            <circle cx="260" cy="220" r="80" fill={C.maroon} opacity="0.25" />
            <circle cx="1340" cy="780" r="100" fill={C.sage} opacity="0.30" />
          </g>
        )}

        {/* paper grain — every variant */}
        <rect width="1600" height="1000" filter="url(#grain)" opacity="0.45" />
      </svg>

      {/* Quiet acknowledgment of art-historical references */}
      <p className="absolute bottom-3 right-4 text-[10px] uppercase tracking-[0.3em] text-foreground/40">
        after Matisse · Frankenthaler · Diebenkorn · Taeuber-Arp · Turner
      </p>
    </div>
  );
}
