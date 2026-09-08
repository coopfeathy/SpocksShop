import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { inventory, products } from "@/lib/db/schema";
import { formatCents } from "@/lib/commerce/money";

export default async function AdminProductsPage() {
  const rows = await db
    .select({
      id: products.id,
      sku: products.sku,
      title: products.title,
      status: products.status,
      priceCents: products.priceCents,
      uniqueFind: products.uniqueFind,
      onHand: inventory.quantityOnHand,
      reserved: inventory.quantityReserved,
    })
    .from(products)
    .leftJoin(inventory, eq(inventory.productId, products.id));

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Products</h1>
      <p className="text-sm text-slate-600">Storefront catalog is unchanged. Purchase cost is admin-only.</p>
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr>
            <th className="p-2">SKU</th>
            <th className="p-2">Title</th>
            <th className="p-2">Status</th>
            <th className="p-2">Price</th>
            <th className="p-2">On hand</th>
            <th className="p-2">Reserved</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t">
              <td className="p-2 font-mono">{row.sku}</td>
              <td className="p-2">{row.title}</td>
              <td className="p-2">{row.status}</td>
              <td className="p-2">{formatCents(row.priceCents)}</td>
              <td className="p-2">{row.onHand ?? 0}</td>
              <td className="p-2">{row.reserved ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
