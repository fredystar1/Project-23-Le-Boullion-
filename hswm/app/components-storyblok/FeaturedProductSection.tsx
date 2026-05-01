import { Tilt } from "../lib/styling-types";
import { ProductCard } from "../components/ProductCard";
import { Section } from "../components/Section";

interface FeaturedProductSectionProps {
  blok: any;
  tilt?: Tilt;
  colorSet?: string;
}

const FeaturedProductSection = ({
  blok,
  tilt,
  colorSet,
}: FeaturedProductSectionProps) => {
  const featuredProduct = blok.product;
  return (
    <Section
      className="editorial-page-content"
      colorSet={colorSet ? colorSet : "color-set-2"}
      eyebrowText={blok.eyebrow_text}
    >
      <ProductCard
        product={featuredProduct.content}
        slug={featuredProduct.full_slug}
        variant="featured"
        tilt={tilt}
      />
    </Section>
  );
};

export default FeaturedProductSection;
