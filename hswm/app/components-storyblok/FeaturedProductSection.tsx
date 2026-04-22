/**
 * Storyblok bridge: `featured_product` section.
 *
 * Renders a single featured product inside a themed `Section` wrapper
 * using the `ProductCard` component.
 *
 * Registered as `"featured_product"` in the Storyblok component map
 * (see {@link module:storyblok}).
 *
 * @module components-storyblok/FeaturedProductSection
 */

import { Tilt, contentPageType, itemVariantsUI } from "../lib/styling-types";
import { ProductCard } from "../components/ProductCard";
import { Section } from "../components/Section";

/**
 * Props accepted by {@link FeaturedProductSection}.
 */
interface FeaturedProductSectionProps {
  /** Storyblok blok payload containing the `product` relation. */
  blok: any;
  /** UI variant forwarded to the wrapping `Section` and `ProductCard`. */
  variant: itemVariantsUI;
  /** Tilt direction forwarded to the product card. */
  tilt?: Tilt;
  /** CSS class prefix for the section content area. */
  contentPageType: contentPageType;
  /** Optional color-set class override (defaults to `"color-set-2"`). */
  colorSet?: string;
}

/**
 * Render a featured product inside a full-width section.
 *
 * The section background uses the provided `colorSet` or falls back to
 * `"color-set-2"`.  The product's `eyebrow_text` field is forwarded to
 * the `ProductCard` for display above the title.
 *
 * @param props - See {@link FeaturedProductSectionProps}.
 * @returns A themed section containing a `ProductCard`.
 */
const FeaturedProductSection = ({
  blok,
  tilt,
  variant,
  contentPageType,
  colorSet,
}: FeaturedProductSectionProps) => {
  const featuredProduct = blok.product;
  return (
    <div
      className={`section ${colorSet ? colorSet : "color-set-2"} bg-[var(--surface)]`}
    >
      <Section
        className={`${contentPageType}-content`}
        tilt={tilt}
        variant={variant}
      >
        <ProductCard
          product={featuredProduct.content}
          slug={featuredProduct.full_slug}
          variant={variant}
          tilt={tilt}
          eyebrowText={featuredProduct.eyebrow_text}
        />
      </Section>
    </div>
  );
};

export default FeaturedProductSection;
