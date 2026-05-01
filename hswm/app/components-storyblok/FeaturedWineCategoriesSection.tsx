import { Section } from "../components/Section";
import Link from "next/link";
import { StoryblokServerRichText } from "@storyblok/react/rsc";
import ImageButton from "../components/ImageButton";

interface FeaturedWineCategoriesProps {
  blok: any;
  colorSet?: string;
}

const FeaturedWineCategoriesSection = ({
  blok,
  colorSet,
}: FeaturedWineCategoriesProps) => {
  const wineCategoryContent = blok.links_and_images;
  const wineCategoryDescription = blok.description;
  const wineCategoryHeadline = blok.headline;
  return (
    <Section
      className="editorial-page-content"
      colorSet="color-set-6"
      eyebrowText={blok.eyebrow_text}
      headline={wineCategoryHeadline}
    >
      <div className="section-body-text">
        <StoryblokServerRichText doc={wineCategoryDescription} />
      </div>
      <div className="image-buttons-container">
        {wineCategoryContent.map((product: any) => (
          <div
            key={product._uid}
            className="flex flex-col justify-center items-center"
          >
            <ImageButton
              full_slug={product.link.cached_url}
              imageUrl={product.image.filename}
              width={224}
              height={224}
            />
            <Link href={product.link.cached_url}>{product.link_text}</Link>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default FeaturedWineCategoriesSection;
