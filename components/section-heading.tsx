export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-6 max-w-3xl">
      {eyebrow ? (
        <p className="text-eyebrow mb-2">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.02] tracking-tight text-slate-900">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
      ) : null}
    </header>
  );
}

