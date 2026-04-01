import { Tilt } from "../lib/styling-types";
import { EventCard } from "./EventCard";
import { Section } from "./Section";

interface FeaturedEventSectionProps {
  blok: any;
  tilt?: Tilt;
}

const FeaturedEventSection = ({ blok, tilt }: FeaturedEventSectionProps) => {
  const featuredStory = Array.isArray(blok.featured_event)
    ? blok.featured_event[0]
    : blok.featured_event;

  if (!featuredStory?.content) {
    return null;
  }

  return (
    <div className="editorial-section color-set-neutral bg-[var(--secondary-color)]">
      <Section headline={blok.headline} className="editorial-content">
        <EventCard
          event={featuredStory.content}
          slug={featuredStory.full_slug}
          variant="featured"
          tilt={tilt}
        />
      </Section>
    </div>
  );
};

export default FeaturedEventSection;
