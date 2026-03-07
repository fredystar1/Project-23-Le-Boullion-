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

type EventCardVariants = "featured" | "detailed" | "list";

type EventCardProps = {
  event: EventContent;
  variant: EventCardVariants;
};

export const EventCard = ({ event, variant = "list" }: EventCardProps) => {
  const showDescription = variant === "detailed";
  const showPrice = variant !== "featured";
  const appliedClass = {
    featured: {
      cardStyle: "event-featured",
      imageStyle: "event-featured-image",
    },
    detailed: {
      cardStyle: "event-detailed",
      imageStyle: "event-detailed-image",
    },
    list: {
      cardStyle: "event-list-item",
      imageStyle: "event-list-item-image",
    },
  };
  const activeCardStyle = appliedClass[variant].cardStyle;
  const activeImageStyle = appliedClass[variant].imageStyle;
  return (
    <article className={activeCardStyle}>
      <div>
        {event.image?.filename && (
          <Image
            src={event.image.filename}
            width={800}
            height={800}
            alt={event.image.meta_data?.alt || event.event_name || ""}
            className={activeImageStyle}
          />
        )}
      </div>

      <div className="flex-1">
        {event.event_name && <h3>{event.event_name}</h3>}
        {showDescription && event.event_description && (
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
