import { Tilt } from "../lib/styling-types";
import { ProductCard } from "../components/ProductCard";
import { Section } from "../components/Section";

interface ProductSectionProps {
  blok: any;
  tilt?: Tilt;
  colorSet?: string;
}

const ProductSection = ({
  blok,
  tilt,
  colorSet,
}: ProductSectionProps) => {
  const featuredProduct = blok.product;
  return (
    <Section
      className="editorial-page-content"
      colorSet={colorSet ? colorSet : "color-set-2"}
      eyebrowText={blok.eyebrow_text}
    >
      <ProductCard
        key={featuredProduct.uuid}
        product={featuredProduct.content}
        variant="featured"
        slug={featuredProduct.full_slug}
        tilt={tilt}
      />
    </Section>
  );
};

export default ProductSection;
