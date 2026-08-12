import { Order } from "@/lib/types";

export const CART_STORAGE_KEY = "spocks-cart";
export const ORDERS_STORAGE_KEY = "spocks-orders";
export const WISHLIST_STORAGE_KEY = "spocks-wishlist";

export function readFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch (error) {
    console.error(`Unable to parse localStorage key "${key}"`, error);
    return fallback;
  }
}

export function writeToStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function appendOrder(order: Order) {
  const orders = readFromStorage<Order[]>(ORDERS_STORAGE_KEY, []);
  writeToStorage(ORDERS_STORAGE_KEY, [order, ...orders]);
}
