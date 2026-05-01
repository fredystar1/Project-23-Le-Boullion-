import { Section } from "../components/Section";
import Link from "next/link";
import Image from "next/image";
import { photoFrameClass, Tilt } from "../lib/styling-types";
import { StoryblokServerRichText } from "@storyblok/react/rsc";

interface FeaturedCustomCaseProps {
  blok: any;
  colorSet?: string;
  tilt?: Tilt;
}

const FeaturedCustomCaseSection = ({
  blok,
  colorSet,
  tilt,
}: FeaturedCustomCaseProps) => {
  const sectionEyebrow = blok.eyebrow_text;
  const sectionHeading = blok.headline;
  const sectionDescription = blok.description;
  const sectionImage = blok.image;
  const sectionLinkContent = blok.link_and_link_text[0];
  return (
    <Section eyebrowText={sectionEyebrow} className="editorial-page-content">
      <div className="card-featured">
        <div className="card-layered-container holepunch bg-[var(--surface-muted)]">
          <div className="striped rounded-2xl p-8">
            <div className="card-inner">
              <div className="media-container">
                <div className={photoFrameClass[tilt ?? "right"]}>
                  <Image
                    src={sectionImage.filename}
                    width={300}
                    height={300}
                    alt={sectionImage.alt}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-word-content">
          <div className="card-word-inner">
            <h2 className="card-title">{sectionHeading}</h2>
            <div className="card-body-text">
              <StoryblokServerRichText doc={sectionDescription} />
            </div>
            <div className="flex justify-center ">
              <div className="rect-button-container color-set-1">
                <Link
                  className="rect-button-top"
                  href={sectionLinkContent.link.cached_url}
                >
                  {sectionLinkContent.link_text}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default FeaturedCustomCaseSection;
