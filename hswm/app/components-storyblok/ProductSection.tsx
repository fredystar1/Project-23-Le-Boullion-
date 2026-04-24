import { Tilt, contentPageType, itemVariantsUI } from "../lib/styling-types";
import { ProductCard } from "../components/ProductCard";
import { Section } from "../components/Section";

interface ProductSectionProps {
  blok: any;
  variant: itemVariantsUI;
  tilt?: Tilt;
  contentPageType: contentPageType;
  colorSet?: string;
}

const ProductSection = ({
  blok,
  tilt,
  variant,
  contentPageType,
  colorSet,
}: ProductSectionProps) => {
  const featuredProduct = blok.product;
  return (
    <div className={`section $ bg-[var(--surface)]`}>
      <Section
        className={`${contentPageType}-content`}
        tilt={tilt}
        variant={variant}
        colorSet={colorSet ? colorSet : "color-set-2"}
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
