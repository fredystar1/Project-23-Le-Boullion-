import Image from "next/image";
import { StoryblokServerRichText } from "@storyblok/react/rsc";

type EventContent = {
  event_name?: string;
  event_description?: any;
  event_start?: string;
  event_end?: string;
  price?: string | number;
  image?: {
    filename?: string;
    meta_data?: {
      alt?: string;
    };
  };
};

type EventCardProps = {
  event: EventContent;
};

export const EventCard = ({ event }: EventCardProps) => {
  console.log(event);
  return (
    <article className="flex gap-6 rounded outline p-4">
      <div>
        {event.image?.filename && (
          <Image
            src={event.image.filename}
            width={800}
            height={800}
            alt={event.image.meta_data?.alt || event.event_name || ""}
            className="h-auto w-full max-w-sm rounded"
          />
        )}
      </div>

      <div className="flex-1">
        {event.event_name && <h3>{event.event_name}</h3>}

        {event.event_description && (
          <StoryblokServerRichText doc={event.event_description} />
        )}

        {event.price && <p>${event.price}</p>}
      </div>

      <div>
        {event.event_start && <div>{event.event_start}</div>}
        {event.event_end && <div>{event.event_end}</div>}
      </div>
    </article>
  );
};
