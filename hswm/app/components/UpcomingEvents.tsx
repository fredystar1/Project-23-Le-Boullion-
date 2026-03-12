import { EventCard } from "./EventCard";
import { Section } from "./Section";

export const UpcomingEvents = ({ blok }: any) => {
  const sortedEvents = [...(blok.events || [])].sort((a: any, b: any) => {
    const dateA = new Date(a.content?.event_start || 0).getTime();
    const dateB = new Date(b.content?.event_start || 0).getTime();
    return dateA - dateB;
  });

  return (
    <Section headline={blok.headline}>
      <div className="space-y-6">
        {sortedEvents.map((eventStory: any) => (
          <EventCard
            key={eventStory.uuid || eventStory.id || eventStory.content?._uid}
            event={eventStory.content}
            slug={eventStory.full_slug}
          />
        ))}
      </div>
    </Section>
  );
};
