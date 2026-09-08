# Shipping configuration

Two fulfillment methods:

- **Pickup (Bentonville):** shipping amount is always `$0`. Pickup location is stored on the order.
- **Ship:** server sums item weights and matches the admin weight table.

The browser never decides the shipping charge.

Weight table is editable in `/admin/shipping`. If no row covers the shipment weight, quoting fails instead of inventing a fee.
