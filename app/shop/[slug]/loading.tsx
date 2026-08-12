export default function ProductLoading() {
  return (
    <div className="grid gap-8 lg:grid-cols-2" aria-busy="true" aria-live="polite">
      <div className="skeleton h-[420px] rounded-2xl" />
      <div className="space-y-4">
        <div className="skeleton h-8 w-2/3" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
        <div className="skeleton h-40 rounded-xl" />
      </div>
    </div>
  );
}
