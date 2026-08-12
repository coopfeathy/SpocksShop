import Link from "next/link";

export default function NotFound() {
  return (
    <section className="surface-panel rounded-2xl px-6 py-14 text-center">
      <h1 className="text-3xl font-semibold text-slate-900">Page not found</h1>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-700">
        The page you requested has drifted out of this star system.
      </p>
      <Link href="/" className="btn btn-primary mt-6 inline-flex">
        Return home
      </Link>
    </section>
  );
}
