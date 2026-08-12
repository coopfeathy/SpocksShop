interface CatalogLabelProps {
  /** Primary label text e.g. "SPECIMEN 00427" */
  label: string;
  /** Optional secondary value */
  value?: string;
  /** Visual variant */
  variant?: "default" | "gold" | "blue" | "green" | "rust";
  className?: string;
}

const VARIANTS = {
  default: "border-stone-300 text-stone-500 bg-stone-50/80",
  gold: "border-amber-300/60 text-amber-700 bg-amber-50/80",
  blue: "border-blue-300/50 text-blue-700 bg-blue-50/70",
  green: "border-emerald-300/50 text-emerald-700 bg-emerald-50/70",
  rust: "border-orange-300/50 text-orange-700 bg-orange-50/70",
};

export function CatalogLabel({
  label,
  value,
  variant = "default",
  className = "",
}: CatalogLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] ${VARIANTS[variant]} ${className}`}
    >
      {label}
      {value ? (
        <>
          <span className="opacity-40">·</span>
          <span className="font-semibold">{value}</span>
        </>
      ) : null}
    </span>
  );
}
