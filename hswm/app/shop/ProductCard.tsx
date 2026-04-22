/**
 * Shop product card — displays a single wine product in the shop grid.
 *
 * Unlike the Storyblok-backed `ProductCard` in `components/`, this
 * card is designed for the local wine catalogue (`wines.json`) and uses
 * Next.js `<Image>` with `fill` layout for responsive image sizing.
 *
 * @module shop/ProductCard
 */

import Image from "next/image";

/**
 * Props accepted by the shop {@link ProductCard}.
 *
 * These map 1:1 to the fields of the {@link Product} type from
 * `lib/products`.
 */
type WineCardProps = {
  /** Unique product identifier (used as React key by the parent grid). */
  id: number;
  /** Display name of the wine. */
  title: string;
  /** Vendor / producer name. */
  vendor: string;
  /** Resolved image URL (never null — placeholder was substituted). */
  image_url: string;
  /** Wine category slug (underscores are replaced with spaces for display). */
  category: string;
  /** Whether the wine is currently in stock. */
  available: boolean;
  /** Free-text description (not rendered on the card). */
  description: string;
  /** Numeric price in USD. */
  price: number;
};

/**
 * Render a wine product card for the shop grid.
 *
 * Layout:
 * ```
 * ┌───────────────────────┐
 * │       (image)         │
 * ├───────────────────────┤
 * │  vendor               │
 * │  title                │
 * │  category             │
 * ├───────────────────────┤
 * │  $price    [In stock] │
 * └───────────────────────┘
 * ```
 *
 * @param props - See {@link WineCardProps}.
 * @returns A styled card `<div>`.
 */
export default function ProductCard({
  title,
  vendor,
  image_url,
  category,
  available,
  price,
}: WineCardProps) {
  return (
    <div className="shop-item-card">
      <div className="shop-item-media">
        <div className="shop-item-mediaInner">
          <Image
            src={image_url}
            alt={title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
            className="shop-item-image"
          />
        </div>
      </div>

      <p className="shop-item-vendor">{vendor}</p>
      <p className="shop-item-title">{title}</p>
      <p className="shop-item-meta">{category.replaceAll("_", " ")}</p>

      <div className="shop-item-bottom">
        <p className="shop-item-price">${price.toFixed(2)}</p>
        <span
          className={`shop-item-badge ${available ? "shop-item-badge--in" : "shop-item-badge--out"}`}
        >
          {available ? "In stock" : "Sold out"}
        </span>
      </div>
    </div>
  );
}
