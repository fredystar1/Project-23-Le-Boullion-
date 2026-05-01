import { Tilt } from "../lib/styling-types";
import { EventCard } from "../components/EventCard";
import { Section } from "../components/Section";

interface FeaturedEventSectionProps {
  blok: any;
  tilt?: Tilt;
}

const FeaturedEventSection = ({
  blok,
  tilt,
}: FeaturedEventSectionProps) => {
  const featuredStory = Array.isArray(blok.featured_event)
    ? blok.featured_event[0]
    : blok.featured_event;

  if (!featuredStory?.content) {
    return null;
  }

  return (
    <Section
      className="editorial-page-content"
      colorSet="color-set-4"
      eyebrowText={blok.eyebrow_text}
    >
      <EventCard
        event={featuredStory.content}
        slug={featuredStory.full_slug}
        variant="featured"
        tilt={tilt}
      />
    </Section>
  );
};

export default FeaturedEventSection;
