import ProductCard from "./ProductCard";
import type { Product } from "../lib/products";

export default function ShopGrid({ products }: { products: Product[] }) {
  return (
    <div className="shop-grid">
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  );
}
