/**
 * Shop product grid — renders a page of wine products as cards.
 *
 * This is a thin presentational component that maps an array of
 * {@link Product} objects to {@link ProductCard} elements inside a
 * responsive CSS grid.
 *
 * @module shop/ShopGrid
 */

import ProductCard from "./ProductCard";
import type { Product } from "../lib/products";

/**
 * Render a responsive grid of shop product cards.
 *
 * @param props          - Component props.
 * @param props.products - Array of products to display. Each product is
 *                         spread into a `ProductCard` via `{...p}`.
 * @returns A `<div>` with the `shop-grid` CSS class containing one card
 *          per product.
 */
export default function ShopGrid({ products }: { products: Product[] }) {
  return (
    <div className="shop-grid">
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  );
}
