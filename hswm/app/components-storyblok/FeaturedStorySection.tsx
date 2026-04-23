import { Tilt, contentPageType, itemVariantsUI } from "../lib/styling-types";
import { ProductCard } from "../components/ProductCard";
import { Section } from "../components/Section";
import { StoryblokServerRichText } from "@storyblok/react/rsc";

interface FeaturedStorySectionProps {
  blok: any;
  variant: itemVariantsUI;
  tilt?: Tilt;
  contentPageType: contentPageType;
  colorSet?: string;
}

const FeaturedStorySection = ({
  blok,
  tilt,
  variant,
  contentPageType,
  colorSet,
}: FeaturedStorySectionProps) => {
  const productList = blok.products;
  const productDescription = blok.description;
  return (
    <Section
      className={`${contentPageType}-content bg-[var(--surface)]`}
      tilt={tilt}
      variant={variant}
      colorSet="color-set-7"
    >
      <h2 className="card-title">{blok.headline}</h2>
      <div className="card-body-text">
        <StoryblokServerRichText doc={productDescription} />
      </div>

      {...productList.map((product: any) => (
        <ProductCard
          key={product.uuid}
          product={product.content}
          variant={variant}
          slug={product.full_slug}
          tilt={tilt}
          eyebrowText={blok.eyebrow_text}
        />
      ))}
    </Section>
  );
};

export default FeaturedStorySection;
