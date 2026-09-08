import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { inventory, products } from "@/lib/db/schema";
import { availableQuantity } from "@/lib/commerce/inventory";

export default async function AdminInventoryPage() {
  const rows = await db
    .select({
      sku: products.sku,
      title: products.title,
      onHand: inventory.quantityOnHand,
      reserved: inventory.quantityReserved,
      sold: inventory.quantitySold,
    })
    .from(inventory)
    .innerJoin(products, eq(products.id, inventory.productId));

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Inventory</h1>
      <p className="text-sm text-slate-600">Unique finds default to quantity 1. Reservations use row locks.</p>
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr>
            <th className="p-2">SKU</th>
            <th className="p-2">Title</th>
            <th className="p-2">On hand</th>
            <th className="p-2">Reserved</th>
            <th className="p-2">Sold</th>
            <th className="p-2">Available</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.sku} className="border-t">
              <td className="p-2 font-mono">{row.sku}</td>
              <td className="p-2">{row.title}</td>
              <td className="p-2">{row.onHand}</td>
              <td className="p-2">{row.reserved}</td>
              <td className="p-2">{row.sold}</td>
              <td className="p-2">{availableQuantity({ quantityOnHand: row.onHand, quantityReserved: row.reserved })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
