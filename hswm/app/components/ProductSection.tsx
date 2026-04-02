import { Tilt } from "../lib/styling-types";
import { ProductCard } from "./ProductCard";
import { Section } from "./Section";

interface ProductSectionProps {
  blok: any;
  tilt?: Tilt;
}

const ProductSection = ({ blok, tilt }: ProductSectionProps) => {
  const featuredStory = Array.isArray(blok.products)
    ? blok.products[0]
    : blok.products;

  if (!featuredStory?.content) {
    return null;
  }

  return (
    <div className="editorial-section color-set-2 bg-[var(--primary-color)]">
      <Section className="editorial-content" tilt={tilt}>
        <ProductCard
          product={featuredStory.content}
          variant="featured"
          slug={featuredStory.full_slug}
          tilt={tilt}
          eyebrowText={blok.eyebrow_text}
        />
      </Section>
    </div>
  );
};

export default ProductSection;
