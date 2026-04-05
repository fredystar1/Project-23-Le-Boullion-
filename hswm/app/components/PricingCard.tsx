import Section from "./Section";
import ProductCard from "./ProductCard";

const PricingCard = (blok: any) => {
  return (
    <Section
      {...blok.map((tier: any) => (
        <ProductCard
          key={tier.uuid}
          variant="pricingItem"
          product={tier.content}
          slug={tier.full_slug}
        />
      ))}
    />
  );
};

export default PricingCard;
