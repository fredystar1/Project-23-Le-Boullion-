import { Section } from "../components/Section";
import Link from "next/link";
import ImageButton from "../components/ImageButton";

interface FeaturedWineDispensersProps {
  blok: any;
  colorSet?: string;
}

const FeaturedWineDispensersSection = ({
  blok,
  colorSet,
}: FeaturedWineDispensersProps) => {
  const wineDispenserContent = blok.wine_dispensers;
  const wineDispenserHeadline = blok.headline;
  return (
    <Section
      className="editorial-page-content"
      colorSet="color-set-2"
      eyebrowText={blok.eyebrow_text}
      headline={wineDispenserHeadline}
    >
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
