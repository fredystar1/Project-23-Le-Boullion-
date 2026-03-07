import { EventCard } from "./EventCard";

export const UpcomingEvents = ({ blok }: any) => {
  return (
    <section>
      {blok.headline && <h2>{blok.headline}</h2>}

      <div className="space-y-6">
        {blok.events?.map((eventStory: any) => (
          <EventCard
            key={eventStory.uuid || eventStory.id || eventStory.content?._uid}
            event={eventStory.content}
          />
        ))}
      </div>
    </section>
  );
};
