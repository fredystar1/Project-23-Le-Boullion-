import { contentPageType, itemVariantsUI, Tilt } from "../lib/styling-types";
import { EventCard } from "../components/EventCard";
import { Section } from "../components/Section";

interface FeaturedEventSectionProps {
  blok: any;
  tilt?: Tilt;
  variant: itemVariantsUI;
  contentPageType: contentPageType;
}

const FeaturedEventSection = ({
  blok,
  tilt,
  variant,
  contentPageType,
}: FeaturedEventSectionProps) => {
  const featuredStory = Array.isArray(blok.featured_event)
    ? blok.featured_event[0]
    : blok.featured_event;

  if (!featuredStory?.content) {
    return null;
  }

  return (
    <Section
      className={`${contentPageType}-content`}
      colorSet="color-set-4"
      variant={variant}
    >
      <EventCard
        event={featuredStory.content}
        slug={featuredStory.full_slug}
        variant="featured"
        tilt={tilt}
        eyebrowText={blok.eyebrow_text}
      />
    </Section>
  );
};

export default FeaturedEventSection;
