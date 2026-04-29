import { Tilt, contentPageType, itemVariantsUI } from "../lib/styling-types";
import { Section } from "../components/Section";
import Link from "next/link";
import { StoryblokServerRichText } from "@storyblok/react/rsc";
import ImageButton from "../components/ImageButton";

interface FeaturedWineDispensersProps {
  blok: any;
  variant: itemVariantsUI;
  tilt?: Tilt;
  contentPageType: contentPageType;
  colorSet?: string;
}

const FeaturedWineDispensersSection = ({
  blok,
  variant,
  tilt,
  contentPageType,
  colorSet,
}: FeaturedWineDispensersProps) => {
  const wineDispenserContent = blok.wine_dispensers;
  const wineDispenserHeadline = blok.headline;
  return (
    <Section
      className={`${contentPageType}-content bg-[var(--surface)]`}
      tilt={tilt}
      variant={variant}
      colorSet="color-set-2"
    >
      {blok.eyebrow_text && (
        <span className="eyebrow">{blok.eyebrow_text}</span>
      )}
      <h2 className="card-title">{wineDispenserHeadline}</h2>
      <div className="image-buttons-container">
        {wineDispenserContent.map((product: any) => (
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

export default FeaturedWineDispensersSection;
