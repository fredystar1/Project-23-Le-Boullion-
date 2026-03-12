import { datetimeFormatter } from "../lib/helpers";
import { BaseCard } from "./BaseCard";

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
  slug?: string;
  variant?: EventCardVariants;
};

export const EventCard = ({
  event,
  slug,
  variant = "list",
}: EventCardProps) => {
  const formattedDatetime = datetimeFormatter(
    event.event_start,
    event.event_end,
  );

  return (
    <BaseCard
      title={event.event_name}
      description={event.event_description}
      price={event.price}
      image={{
        filename: event.image?.filename,
        alt: event.image?.meta_data?.alt,
      }}
      variant={variant}
      type="event"
      slug={slug}
      datetime={formattedDatetime}
    />
  );
};
