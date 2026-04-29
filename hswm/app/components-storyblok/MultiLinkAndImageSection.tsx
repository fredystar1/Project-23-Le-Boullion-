import ImageButton from "../components/ImageButton";
import { Tilt, contentPageType, itemVariantsUI } from "../lib/styling-types";
import { Section } from "../components/Section";
import Link from "next/link";

interface MultiLinkAndImageProps {
  blok: any;
  variant: itemVariantsUI;
  tilt?: Tilt;
  contentPageType: contentPageType;
  colorSet?: string;
}

const MultiLinkAndImageSection = ({
  blok,
  variant,
  tilt,
  contentPageType,
  colorSet,
}: MultiLinkAndImageProps) => {
  const sectionHeading = blok.headline;
  const sectionContent = blok.links_and_images;
  return (
    <Section
      className={`${contentPageType}-content`}
      tilt={tilt}
      variant={variant}
      headline={blok.headline}
      colorSet="color-set-4"
    >
      <h2 className="card-title">{sectionHeading}</h2>
      <div className="image-buttons-container">
        {sectionContent.map((item: any) => (
          <div
            key={item._uid}
            className="flex flex-col justify-center items-center"
          >
            <ImageButton
              full_slug={item.link.cached_url}
              imageUrl={item.image.filename}
              width={224}
              height={224}
            />
            <Link href={item.link.cached_url}>{item.link_text}</Link>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default MultiLinkAndImageSection;
