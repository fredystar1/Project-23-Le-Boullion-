/**
 * Storyblok bridge: `product_section` section.
 *
 * Renders a single product inside a themed `Section` wrapper —
 * functionally similar to `FeaturedProductSection` but used for
 * non-featured product placements.
 *
 * Registered as `"product_section"` in the Storyblok component map
 * (see {@link module:storyblok}).
 *
 * @module components-storyblok/ProductSection
 */

import { Tilt, contentPageType, itemVariantsUI } from "../lib/styling-types";
import { ProductCard } from "../components/ProductCard";
import { Section } from "../components/Section";

/**
 * Props accepted by {@link ProductSection}.
 */
interface ProductSectionProps {
  /** Storyblok blok payload containing the `product` relation. */
  blok: any;
  /** UI variant forwarded to the `Section` and `ProductCard`. */
  variant: itemVariantsUI;
  /** Tilt direction forwarded to the product card. */
  tilt?: Tilt;
  /** CSS class prefix for the section content area. */
  contentPageType: contentPageType;
  /** Optional color-set class override (defaults to `"color-set-2"`). */
  colorSet?: string;
}

/**
 * Render a product inside a full-width themed section.
 *
 * The blok's `eyebrow_text` field is forwarded to the `ProductCard`
 * for optional labelling above the product title.
 *
 * @param props - See {@link ProductSectionProps}.
 * @returns A themed section containing a `ProductCard`.
 */
const ProductSection = ({
  blok,
  tilt,
  variant,
  contentPageType,
  colorSet,
}: ProductSectionProps) => {
  // console.log(blok);
  const featuredProduct = blok.product;
  // console.log(featuredProduct);
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
          key={featuredProduct.uuid}
          product={featuredProduct.content}
          variant={variant}
          slug={featuredProduct.full_slug}
          tilt={tilt}
          eyebrowText={blok.eyebrow_text}
        />
      </Section>
    </div>
  );
};

export default ProductSection;
