export default function ShopLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <div className="skeleton h-8 w-44" />
      <div className="skeleton h-4 w-72" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={`shop-loading-${index}`} className="skeleton h-80 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
