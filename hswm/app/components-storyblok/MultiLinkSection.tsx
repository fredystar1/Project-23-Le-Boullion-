import { Tilt, contentPageType, itemVariantsUI } from "../lib/styling-types";
import { Section } from "../components/Section";
import Link from "next/link";

interface MultiLinkSectionProps {
  blok: any;
  variant: itemVariantsUI;
  tilt?: Tilt;
  contentPageType: contentPageType;
  colorSet?: string;
}

const MultiLinkSection = ({
  blok,
  variant,
  tilt,
  contentPageType,
  colorSet,
}: MultiLinkSectionProps) => {
  const pageLinks = blok.links;
  return (
    <Section
      className={`${contentPageType}-content`}
      tilt={tilt}
      variant={variant}
      headline={blok.headline}
      colorSet="color-set-4"
    >
      <div className="flex gap-8">
        {...pageLinks.map((link: any) => (
          <Link href={link.full_slug}>{link.name}</Link>
        ))}
      </div>
    </Section>
  );
};

export default MultiLinkSection;
