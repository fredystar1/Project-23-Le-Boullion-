import { EventCard } from "./EventCard";

const FeaturedEvent = ({ blok }: any) => {
  const featuredStory = Array.isArray(blok.featured_event)
    ? blok.featured_event[0]
    : blok.featured_event;

  if (!featuredStory?.content) {
    return null;
  }

  return (
    <section>
      {blok.headline && <h2>{blok.headline}</h2>}
      <EventCard event={featuredStory.content} variant="featured" />
    </section>
  );
};

export default FeaturedEvent;
