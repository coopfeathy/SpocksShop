import type { Metadata } from "next";
import { CategoryCard } from "@/components/category-card";
import { SectionHeading } from "@/components/section-heading";
import { categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore all product categories at Spock's Resale Shop.",
};

export default function CategoriesPage() {
  return (
    <div>
      <SectionHeading
        eyebrow="Departments"
        title="Categories"
        description="Choose an aisle and start your search through curated resale inventory."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}
