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
  const featuredWineStory = blok.featured_story.content;
  const featuredWineStoryDescription = featuredWineStory.description;
  const featuredWineProducts = featuredWineStory.products;
  const sectionHeadline = featuredWineStory.headline;

  return (
    <Section
      className={`${contentPageType}-content bg-[var(--surface)]`}
      tilt={tilt}
      variant={variant}
      colorSet="color-set-7"
    >
      {blok.eyebrow_text && (
        <span className="eyebrow">{blok.eyebrow_text}</span>
      )}
      <h2 className="card-title">{sectionHeadline}</h2>
      <div className="card-body-text">
        <StoryblokServerRichText doc={featuredWineStoryDescription} />
      </div>

      {...featuredWineProducts.map((product: any) => (
        <ProductCard
          key={product.uuid}
          product={product.content}
          variant={variant}
          slug={product.full_slug}
          tilt={tilt}
        />
      ))}
    </Section>
  );
};

export default FeaturedStorySection;
