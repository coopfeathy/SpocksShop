"use client";

interface TechnicalGridProps {
  className?: string;
  /** Grid cell size in px */
  cellSize?: number;
  /** Overall opacity */
  opacity?: number;
  /** Show coordinate tick marks */
  ticks?: boolean;
  /** Color of grid lines */
  color?: string;
  /** Show circular target overlay */
  showTarget?: boolean;
}

export function TechnicalGrid({
  className = "",
  cellSize = 40,
  opacity = 0.12,
  ticks = true,
  color = "#8a9680",
  showTarget = false,
}: TechnicalGridProps) {
  const W = 320;
  const H = 220;
  const cols = Math.ceil(W / cellSize);
  const rows = Math.ceil(H / cellSize);

  const vLines = Array.from({ length: cols + 1 }, (_, i) => i * cellSize);
  const hLines = Array.from({ length: rows + 1 }, (_, i) => i * cellSize);

  /* Tick marks every other line */
  const tickLen = 4;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      {/* Grid lines */}
      {vLines.map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2={H} stroke={color} strokeWidth="0.5" />
      ))}
      {hLines.map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2={W} y2={y} stroke={color} strokeWidth="0.5" />
      ))}

      {/* Origin cross */}
      <line x1={cellSize * 2 - 6} y1={cellSize * 2} x2={cellSize * 2 + 6} y2={cellSize * 2} stroke={color} strokeWidth="1" />
      <line x1={cellSize * 2} y1={cellSize * 2 - 6} x2={cellSize * 2} y2={cellSize * 2 + 6} stroke={color} strokeWidth="1" />

      {/* Axis labels */}
      <text x="2" y={cellSize * 2 - 3} fontSize="6" fill={color} fontFamily="monospace" opacity="0.8">
        0,0
      </text>
      {[1, 2, 3, 4].map((n) => (
        <text key={`xl${n}`} x={n * cellSize + 2} y={H - 2} fontSize="5" fill={color} fontFamily="monospace" opacity="0.6">
          {n * cellSize}
        </text>
      ))}

      {/* Tick marks */}
      {ticks
        ? vLines
            .filter((_, i) => i % 2 === 0 && i > 0)
            .map((x) => (
              <line key={`t${x}`} x1={x} y1="0" x2={x} y2={tickLen} stroke={color} strokeWidth="1" />
            ))
        : null}

      {/* Optional target circle */}
      {showTarget ? (
        <>
          <circle cx={W / 2} cy={H / 2} r={30} fill="none" stroke={color} strokeWidth="0.6" strokeDasharray="3 5" />
          <circle cx={W / 2} cy={H / 2} r={12} fill="none" stroke={color} strokeWidth="0.5" />
          <circle cx={W / 2} cy={H / 2} r={2} fill={color} opacity="0.6" />
        </>
      ) : null}
    </svg>
  );
}
