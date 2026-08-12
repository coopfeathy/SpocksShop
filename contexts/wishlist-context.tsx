"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  WISHLIST_STORAGE_KEY,
  readFromStorage,
  writeToStorage,
} from "@/lib/storage";

type WishlistContextValue = {
  wishlistItems: string[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<string[]>(() =>
    readFromStorage<string[]>(WISHLIST_STORAGE_KEY, []),
  );

  useEffect(() => {
    writeToStorage(WISHLIST_STORAGE_KEY, wishlistItems);
  }, [wishlistItems]);

  const isWishlisted = useCallback(
    (productId: string) => wishlistItems.includes(productId),
    [wishlistItems],
  );

  const toggleWishlist = useCallback((productId: string) => {
    let nextIsWishlisted = false;
    setWishlistItems((current) => {
      if (current.includes(productId)) {
        nextIsWishlisted = false;
        return current.filter((id) => id !== productId);
      }
      nextIsWishlisted = true;
      return [...current, productId];
    });
    return nextIsWishlisted;
  }, []);

  const value = useMemo(
    () => ({ wishlistItems, isWishlisted, toggleWishlist }),
    [wishlistItems, isWishlisted, toggleWishlist],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
