export default function CartLoading() {
  return (
    <div className="space-y-4" aria-busy="true" aria-live="polite">
      <div className="skeleton h-8 w-40" />
      <div className="skeleton h-24" />
      <div className="skeleton h-24" />
    </div>
  );
}
