/**
 * Storyblok bridge: `product_offering` content type.
 *
 * Thin wrapper that renders a product blok as a "detailed" variant
 * {@link ProductCard}.  Used on individual product detail pages.
 *
 * Registered as `"product_offering"` in the Storyblok component map
 * (see {@link module:storyblok}).
 *
 * @module components-storyblok/Product
 */

import { ProductCard } from "../components/ProductCard";

/**
 * Render a single Storyblok product blok as a detailed product card.
 *
 * @param props      - Storyblok component props.
 * @param props.blok - The product blok payload (passed directly as
 *                     `ProductCard`'s `product` prop).
 * @returns A `ProductCard` in the `"detailed"` variant.
 */
export const Product = ({ blok }: any) => {
  return <ProductCard variant={"detailed"} product={blok} />;
};
