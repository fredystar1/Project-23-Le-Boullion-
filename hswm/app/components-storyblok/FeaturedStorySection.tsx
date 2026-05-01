import { Tilt } from "../lib/styling-types";
import Image from "next/image";
import { Section } from "../components/Section";
import { StoryblokServerRichText } from "@storyblok/react/rsc";
import Link from "next/link";

interface FeaturedStorySectionProps {
  blok: any;
  tilt?: Tilt;
  colorSet?: string;
}

const FeaturedStorySection = ({
  blok,
  tilt,
  colorSet,
}: FeaturedStorySectionProps) => {
  const featuredWineStory = blok.featured_story.content;
  const featuredWineStoryDescription = featuredWineStory.description;
  const featuredWineProducts = featuredWineStory.products;
  const sectionHeadline = featuredWineStory.headline;
  return (
    <Section
      className="editorial-page-content"
      colorSet="color-set-7"
      eyebrowText={blok.eyebrow_text}
      headline={sectionHeadline}
    >
      <div className="section-body-text">
        <StoryblokServerRichText doc={featuredWineStoryDescription} />
      </div>
      <div className="flex flex-wrap mt-2">
        {...featuredWineProducts.map((product: any) => (
          <div key={product._uid} className="flex flex-col items-center">
            <Image
              src={product.content.product_image.filename}
              alt={product.content.product_image.alt}
              width={400}
              height={300}
              className="holepunch striped"
            />
            <div className="rect-button-container color-set-2">
              <Link className="rect-button-top" href={product.full_slug}>
                Explore {product.content.product_name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default FeaturedStorySection;
