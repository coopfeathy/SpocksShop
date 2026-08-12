"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-12">
      <h1 className="text-2xl font-semibold text-rose-900">Something went wrong</h1>
      <p className="mt-3 text-sm text-rose-800">
        {error.message || "An unexpected error occurred while loading this page."}
      </p>
      <button type="button" onClick={reset} className="btn mt-5 bg-rose-700 text-white hover:bg-rose-600">
        Try again
      </button>
    </section>
  );
}
