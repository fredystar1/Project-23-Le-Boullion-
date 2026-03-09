import { ProductCard } from "./ProductCard";

const ProductSection = ({ blok }: any) => {
  const featuredStory = Array.isArray(blok.products)
    ? blok.products[0]
    : blok.products;

  if (!featuredStory?.content) {
    return null;
  }

  return (
    <section>
      {blok.headline && <h2 className="featured-heading">{blok.headline}</h2>}
      <ProductCard product={featuredStory.content} variant="featured" />
    </section>
  );
};

export default ProductSection;
