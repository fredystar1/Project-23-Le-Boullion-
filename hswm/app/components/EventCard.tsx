import { DatetimeFormatStyle, datetimeFormatter } from "../lib/helpers";
import { Tilt } from "../lib/styling-types";
import { BaseCard } from "./BaseCard";
import Link from "next/link";
import { StoryblokServerRichText } from "@storyblok/react/rsc";

type EventContent = {
  event_name?: string;
  event_description?: any;
  event_start?: string;
  event_end?: string;
  price?: string | number;
  actionText?: string;
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
  tilt?: Tilt;
  datetimeFormat?: DatetimeFormatStyle;
};

export const EventCard = ({
  event,
  slug,
  variant = "list",
  tilt,
  datetimeFormat = "default",
}: EventCardProps) => {
  const formattedDatetime = datetimeFormatter(
    event.event_start,
    event.event_end,
    datetimeFormat,
  );

  const type = "event";
  const showPrice = variant !== "featured";
  const asPhotoStyle = true;

  const appliedClass = {
    featured: {
      cardStyle: "card-featured",
      imageStyle: "featured-image",
    },
    detailed: {
      cardStyle: `${type}-detailed`,
      imageStyle: `${type}-detailed-image`,
    },
    list: {
      cardStyle: `${type}-list-item`,
      imageStyle: `${type}-list-item-image`,
    },
  };

  const activeCardStyle = appliedClass[variant].cardStyle;
  const activeImageStyle = appliedClass[variant].imageStyle;
  const showDescription = variant !== "featured";

  return (
    <BaseCard
      title={event.event_name}
      image={{
        filename: event.image?.filename,
        alt: event.image?.meta_data?.alt,
      }}
      cardClassName={activeCardStyle}
      imageClassName={activeImageStyle}
      mediaClassName={`${type}-media`}
      asPhotoStyle={asPhotoStyle}
      datetimeNode={
        formattedDatetime ? (
          <div className={`${type}-datetime`}>{formattedDatetime}</div>
        ) : null
      }
      priceNode={
        showPrice && event.price ? (
          <p className={`${type}-price`}>${event.price}</p>
        ) : null
      }
      descriptionNode={
        showDescription && event.event_description ? (
          <div className="card-body-text">
            <StoryblokServerRichText doc={event.event_description} />
          </div>
        ) : null
      }
      actionNode={
        slug ? (
          <div className="rect-button-container color-set-1">
            <Link className="rect-button-top" href={slug}>
              {event.actionText || "Explore Event"}
            </Link>
          </div>
        ) : null
      }
      tilt={tilt}
    />
  );
};
