import ProductCard from "./ProductCard";
import type { Product } from "./lib/products";

export default function ShopGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 m-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  );
}
