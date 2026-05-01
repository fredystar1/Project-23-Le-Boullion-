import ProductCard from "../components/ProductCard";
import Section from "../components/Section";
import { Tilt } from "../lib/styling-types";

interface MultiProductProps {
  blok: any;
  tilt?: Tilt;
  colorSet?: string;
  className?: string;
}

const MultiProduct = ({
  blok,
  tilt,
  colorSet,
  className,
}: MultiProductProps) => {
  const productList = blok.product_list;

  // If the blok has a display_mode field from Storyblok, use it.
  // Otherwise, auto-detect: if any product has key_features, treat as pricing.
  const isPricing =
    blok.display_mode === "pricing" ||
    productList.some((p: any) => p.content?.key_features?.length > 0);

  return (
    <Section
      className={className}
      colorSet={colorSet ? colorSet : "color-set-2"}
      eyebrowText={blok.eyebrow_text}
    >
      {...productList.map((product: any) => (
        <ProductCard
          key={product.uuid}
          product={product.content}
          variant={isPricing ? "pricingItem" : "featured"}
          slug={product.full_slug}
          tilt={tilt}
        />
      ))}
    </Section>
  );
};

export default MultiProduct;
