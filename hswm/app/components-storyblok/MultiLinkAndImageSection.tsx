import ImageButton from "../components/ImageButton";
import { Section } from "../components/Section";
import Link from "next/link";

interface MultiLinkAndImageProps {
  blok: any;
  colorSet?: string;
}

const MultiLinkAndImageSection = ({
  blok,
  colorSet,
}: MultiLinkAndImageProps) => {
  const sectionContent = blok.links_and_images;
  return (
    <Section
      className="editorial-page-content"
      headline={blok.headline}
      colorSet="color-set-4"
    >
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
