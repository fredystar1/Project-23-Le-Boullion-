import { ProductCard } from "./ProductCard";
import { Section } from "./Section";

const ProductSection = ({ blok }: any) => {
  const featuredStory = Array.isArray(blok.products)
    ? blok.products[0]
    : blok.products;

  if (!featuredStory?.content) {
    return null;
  }

  return (
    <Section headline={blok.headline}>
      <ProductCard
        product={featuredStory.content}
        variant="featured"
        slug={featuredStory.full_slug}
      />
    </Section>
  );
};

export default ProductSection;
