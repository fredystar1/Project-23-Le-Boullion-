import { ListedEvent } from "./ListedEvent";

export const UpcomingEvents = (params: any) => {
  return (
    <section>
      <h2>{params.blok.headline}</h2>

      {params.blok.events.map((event: any) => (
        <ListedEvent story={event} key={event.content._uid} />
      ))}
    </section>
  );
};
