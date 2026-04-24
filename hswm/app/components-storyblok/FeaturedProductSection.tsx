import { Tilt, contentPageType, itemVariantsUI } from "../lib/styling-types";
import { ProductCard } from "../components/ProductCard";
import { Section } from "../components/Section";

interface FeaturedProductSectionProps {
  blok: any;
  variant: itemVariantsUI;
  tilt?: Tilt;
  contentPageType: contentPageType;
  colorSet?: string;
}

const FeaturedProductSection = ({
  blok,
  tilt,
  variant,
  contentPageType,
  colorSet,
}: FeaturedProductSectionProps) => {
  const featuredProduct = blok.product;
  return (
    <Section
      className={`${contentPageType}-content`}
      tilt={tilt}
      variant={variant}
      colorSet={colorSet ? colorSet : "color-set-2"}
    >
      <ProductCard
        product={featuredProduct.content}
        slug={featuredProduct.full_slug}
        variant={variant}
        tilt={tilt}
        eyebrowText={featuredProduct.eyebrow_text}
      />
    </Section>
  );
};

export default FeaturedProductSection;
