export type Category = {
  slug: string;
  name: string;
  description: string;
};

export const productConditions = [
  "New",
  "Like New",
  "Excellent",
  "Good",
  "Fair",
  "For Parts/Repair",
] as const;

export type ProductCondition = (typeof productConditions)[number];

export type ProductStatus =
  | "draft"
  | "listed"
  | "reserved"
  | "sold"
  | "archived";

export type MarketplaceListing = {
  channel: "Website" | "eBay" | "Facebook Marketplace" | "Poshmark" | "Mercari";
  listingId: string;
  listingUrl: string;
  status: "active" | "ended" | "sold";
  listedAt: string;
  lastSyncedAt: string;
};

export type ProductImage = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type HuntEntryStatus = "Available" | "Sold";

export type HuntEntry = {
  id: string;
  productId: string;
  whereDiscovered: string;
  discoveryDate: string;
  purchasePrice: number;
  story: string;
  result: string;
  photos: ProductImage[];
  finalResalePrice: number;
  profit?: number;
  status: HuntEntryStatus;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  sku: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  condition: ProductCondition;
  conditionNotes: string;
  price: number;
  originalPrice?: number;
  purchaseCost: number;
  quantity: number;
  images: ProductImage[];
  dimensions: {
    lengthIn: number;
    widthIn: number;
    heightIn: number;
  };
  weightLb: number;
  color: string;
  size: string;
  tags: string[];
  dateAcquired: string;
  dateListed: string;
  featured?: boolean;
  status: ProductStatus;
  marketplaceListing: MarketplaceListing[];
  createdAt: string;
  updatedAt: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type Order = {
  id: string;
  createdAt: string;
  customerName: string;
  email: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
};
