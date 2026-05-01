import { Section } from "../components/Section";
import Link from "next/link";

interface MultiLinkSectionProps {
  blok: any;
  colorSet?: string;
}

const MultiLinkSection = ({
  blok,
  colorSet,
}: MultiLinkSectionProps) => {
  const pageLinks = blok.links;
  return (
    <Section
      className="editorial-page-content"
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
