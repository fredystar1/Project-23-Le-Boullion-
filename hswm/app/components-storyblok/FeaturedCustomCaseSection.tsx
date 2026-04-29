import { Tilt, contentPageType, itemVariantsUI } from "../lib/styling-types";
import { Section } from "../components/Section";
import Link from "next/link";
import Image from "next/image";

interface FeaturedCustomCaseProps {
  blok: any;
  variant: itemVariantsUI;
  tilt?: Tilt;
  contentPageType: contentPageType;
  colorSet?: string;
}

const FeaturedCustomCaseSection = ({
  blok,
  variant,
  tilt,
  contentPageType,
  colorSet,
}: FeaturedCustomCaseProps) => {
  const sectionHeading = blok.headline;
  const sectionEyebrow = blok.eyebrow_text;
  const sectionImage = blok.image;
  const sectionLinkContent = blok.link_and_link_text[0];
  return (
    <Section variant={variant}>
      {sectionEyebrow && <span className="eyebrow">{sectionEyebrow}</span>}
      <h2 className="card-title">{sectionHeading}</h2>
      <Image
        src={sectionImage.filename}
        width={300}
        height={300}
        alt={sectionImage.alt}
      />

      <Link href={sectionLinkContent.link.cached_url}>
        {sectionLinkContent.link_text}
      </Link>
    </Section>
  );
};

export default FeaturedCustomCaseSection;
