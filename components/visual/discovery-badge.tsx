interface DiscoveryBadgeProps {
  type:
    | "just-found"
    | "sale"
    | "last-one"
    | "second-life"
    | "archive"
    | "catalogued"
    | "expedition"
    | "found-in-wild";
  className?: string;
}

const BADGE_MAP = {
  "just-found": { label: "Just Found", cls: "bg-emerald-500 text-white" },
  sale: { label: "On Sale", cls: "bg-amber-500 text-white" },
  "last-one": { label: "Last One", cls: "bg-red-500 text-white" },
  "second-life": { label: "Second Life", cls: "bg-violet-500 text-white" },
  archive: { label: "Archive Item", cls: "bg-stone-700 text-stone-100" },
  catalogued: { label: "Newly Catalogued", cls: "bg-blue-600 text-white" },
  expedition: { label: "Expedition Find", cls: "bg-[#4f6656] text-white" },
  "found-in-wild": { label: "Found in the Wild", cls: "bg-[#a86045] text-white" },
};

export function DiscoveryBadge({ type, className = "" }: DiscoveryBadgeProps) {
  const { label, cls } = BADGE_MAP[type];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] ${cls} ${className}`}
    >
      {label}
    </span>
  );
}
