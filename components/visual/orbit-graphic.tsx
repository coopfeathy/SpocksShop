"use client";

interface OrbitGraphicProps {
  className?: string;
  /** Number of orbital rings to render */
  rings?: number;
  /** Whether rings slowly rotate */
  animated?: boolean;
  /** Overall opacity 0–1 */
  opacity?: number;
  /** Color accent for rings: "gold" | "blue" | "cream" */
  accent?: "gold" | "blue" | "cream";
}

const ACCENTS = {
  gold: { primary: "rgba(189,148,96,0.45)", secondary: "rgba(168,120,60,0.3)", dot: "#bd9460" },
  blue: { primary: "rgba(79,110,137,0.4)", secondary: "rgba(95,141,175,0.3)", dot: "#5f8daf" },
  cream: { primary: "rgba(220,205,178,0.5)", secondary: "rgba(200,180,145,0.35)", dot: "#dcc8a8" },
};

export function OrbitGraphic({
  className = "",
  rings = 3,
  animated = true,
  opacity = 1,
  accent = "gold",
}: OrbitGraphicProps) {
  const colors = ACCENTS[accent];

  const ringConfigs = [
    { rx: 48, ry: 18, rotate: -12, dotAngle: 40, animDuration: "28s", dash: "4 6" },
    { rx: 72, ry: 24, rotate: 6, dotAngle: 200, animDuration: "42s", dash: "none" },
    { rx: 96, ry: 30, rotate: -24, dotAngle: 300, animDuration: "60s", dash: "2 8" },
  ].slice(0, rings);

  function dotPosition(rx: number, ry: number, angleDeg: number, rotate: number) {
    const rad = (angleDeg * Math.PI) / 180;
    const rotRad = (rotate * Math.PI) / 180;
    const x = rx * Math.cos(rad);
    const y = ry * Math.sin(rad);
    const cosR = Math.cos(rotRad);
    const sinR = Math.sin(rotRad);
    return {
      cx: 110 + x * cosR - y * sinR,
      cy: 90 + x * sinR + y * cosR,
    };
  }

  return (
    <svg
      viewBox="0 0 220 180"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <style>{`
          @media (prefers-reduced-motion: no-preference) {
            .orbit-ring-0 { animation: orbit-spin 28s linear infinite; }
            .orbit-ring-1 { animation: orbit-spin 42s linear infinite reverse; }
            .orbit-ring-2 { animation: orbit-spin 60s linear infinite; }
            @keyframes orbit-spin {
              from { transform-origin: 110px 90px; transform: rotate(0deg); }
              to   { transform-origin: 110px 90px; transform: rotate(360deg); }
            }
          }
        `}</style>
      </defs>

      {/* Center crosshair */}
      <line x1="106" y1="90" x2="114" y2="90" stroke={colors.dot} strokeWidth="0.5" opacity="0.6" />
      <line x1="110" y1="86" x2="110" y2="94" stroke={colors.dot} strokeWidth="0.5" opacity="0.6" />
      <circle cx="110" cy="90" r="1.5" fill={colors.dot} opacity="0.8" />

      {ringConfigs.map((ring, i) => {
        const dot = dotPosition(ring.rx, ring.ry, ring.dotAngle, ring.rotate);
        return (
          <g key={i} className={animated ? `orbit-ring-${i}` : undefined}>
            <ellipse
              cx="110"
              cy="90"
              rx={ring.rx}
              ry={ring.ry}
              fill="none"
              stroke={i === 0 ? colors.primary : colors.secondary}
              strokeWidth={i === 0 ? "0.8" : "0.5"}
              strokeDasharray={ring.dash}
              transform={`rotate(${ring.rotate}, 110, 90)`}
            />
            <circle
              cx={dot.cx}
              cy={dot.cy}
              r={i === 0 ? 2.5 : 1.8}
              fill={colors.dot}
              opacity={i === 0 ? 0.9 : 0.65}
            />
          </g>
        );
      })}
    </svg>
  );
}
