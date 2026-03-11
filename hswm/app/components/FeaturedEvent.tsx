import { EventCard } from "./EventCard";
import { Section } from "./Section";

const FeaturedEvent = ({ blok }: any) => {
  const featuredStory = Array.isArray(blok.featured_event)
    ? blok.featured_event[0]
    : blok.featured_event;

  if (!featuredStory?.content) {
    return null;
  }

  return (
    <Section headline={blok.headline}>
      <EventCard
        event={featuredStory.content}
        slug={featuredStory.full_slug}
        variant="featured"
      />
    </Section>
  );
};

export default FeaturedEvent;
