import { EventCard } from "../components/EventCard";
import EventListItem from "../components/EventListItem";
import { Section } from "../components/Section";

export const UpcomingEventsSection = ({ blok }: any) => {
  const sortedEvents = [...(blok.events || [])].sort((a: any, b: any) => {
    const dateA = new Date(a.content?.event_start || 0).getTime();
    const dateB = new Date(b.content?.event_start || 0).getTime();
    return dateA - dateB;
  });

  return (
    <Section
      headline={blok.headline}
      variant="list"
      colorSet="color-set-4"
      className={`section bg-[var(--surface)] flex-col`}
    >
      <div className="event-list-container">
        {sortedEvents.map((eventStory: any) => (
          <>
            <EventCard
              key={eventStory.uuid || eventStory.id || eventStory.content?._uid}
              event={eventStory.content}
              slug={eventStory.full_slug}
              datetimeFormat="compact"
            />
            <EventListItem
              key={eventStory.uuid || eventStory.id || eventStory.content?._uid}
              event={eventStory.content}
            />
          </>
        ))}
      </div>
    </Section>
  );
};
