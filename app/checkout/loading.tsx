export default function CheckoutLoading() {
  return (
    <div className="space-y-5" aria-busy="true" aria-live="polite">
      <div className="skeleton h-8 w-48" />
      <div className="skeleton h-56" />
    </div>
  );
}
