/**
 * Storyblok bridge: `multi_product` section.
 *
 * Renders a list of products as cards inside a themed `Section` wrapper.
 * Unlike `FeaturedProductSection` (which handles a single product),
 * this component iterates over an array of resolved product relations.
 *
 * Registered as `"multi_product"` in the Storyblok component map
 * (see {@link module:storyblok}).
 *
 * @module components-storyblok/MultiProduct
 */

import ProductCard from "../components/ProductCard";
import Section from "../components/Section";
import { contentPageType, itemVariantsUI, Tilt } from "../lib/styling-types";

/**
 * Props accepted by {@link MultiProduct}.
 */
interface MultiProductProps {
  /** Storyblok blok payload containing the `product_list` relation array. */
  blok: any;
  /** UI variant forwarded to the `Section` and each `ProductCard`. */
  variant: itemVariantsUI;
  /** Tilt direction forwarded to each product card. */
  tilt?: Tilt;
  /** CSS class prefix for the section content area. */
  contentPageType: contentPageType;
  /** Optional color-set class override (defaults to `"color-set-2"`). */
  colorSet?: string;
}

/**
 * Render multiple products as cards within a single themed section.
 *
 * Each product in `blok.product_list` is rendered as a `ProductCard`
 * with consistent variant and tilt settings.  The section background
 * uses the provided `colorSet` or falls back to `"color-set-2"`.
 *
 * @param props - See {@link MultiProductProps}.
 * @returns A themed section containing one `ProductCard` per product.
 */
const MultiProduct = ({
  blok,
  variant,
  tilt,
  contentPageType,
  colorSet,
}: MultiProductProps) => {
  const productList = blok.product_list;
  return (
    <div
      className={`section ${colorSet ? colorSet : "color-set-2"} bg-[var(--surface)]`}
    >
      <Section
        className={`${contentPageType}-content`}
        tilt={tilt}
        variant={variant}
      >
        {...productList.map((product: any) => (
          <ProductCard
            key={product.uuid}
            product={product.content}
            variant={variant}
            slug={product.full_slug}
            tilt={tilt}
            eyebrowText={blok.eyebrow_text}
          />
        ))}
      </Section>
    </div>
  );
};

export default MultiProduct;
