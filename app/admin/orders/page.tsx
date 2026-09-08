import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { formatCents } from "@/lib/commerce/money";

export default async function AdminOrdersPage() {
  const rows = await db.select().from(orders);
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Orders</h1>
      <p className="text-sm text-slate-600">
        Website checkout is not live. Marketplace sales use a separate sales_channel and do not use website tax collection.
      </p>
      {rows.length === 0 ? <p>No orders yet.</p> : (
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr>
              <th className="p-2">Number</th>
              <th className="p-2">Channel</th>
              <th className="p-2">Status</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="p-2">{row.orderNumber}</td>
                <td className="p-2">{row.salesChannel}</td>
                <td className="p-2">{row.status}</td>
                <td className="p-2">{formatCents(row.totalCents)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
