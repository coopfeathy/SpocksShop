import Link from "next/link";

export function EmptyState({
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="surface-panel rounded-2xl border-dashed px-6 py-11 text-center">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-slate-600">
        {description}
      </p>
      {ctaLabel && ctaHref ? (
        <Link href={ctaHref} className="btn btn-primary mt-5 inline-flex">
          {ctaLabel}
        </Link>
      ) : null}
    </section>
  );
}
