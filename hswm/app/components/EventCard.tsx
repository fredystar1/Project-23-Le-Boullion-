/**
 * Event card component — renders a Storyblok event in one of three
 * visual variants by composing props for {@link BaseCard}.
 *
 * @module EventCard
 */

import { DatetimeFormatStyle, datetimeFormatter } from "../lib/helpers";
import { Tilt } from "../lib/styling-types";
import { BaseCard } from "./BaseCard";
import Link from "next/link";
import { StoryblokServerRichText } from "@storyblok/react/rsc";

/**
 * Shape of the event data consumed by {@link EventCard}.
 *
 * Fields are optional because Storyblok content may be partially
 * populated while an event is still being drafted.
 */
type EventContent = {
  /** Display name of the event. */
  event_name?: string;
  /** Storyblok rich-text field describing the event. */
  event_description?: any;
  /** ISO-ish start datetime (Storyblok format: `"YYYY-MM-DD HH:mm"`). */
  event_start?: string;
  /** ISO-ish end datetime (same format). */
  event_end?: string;
  /** Ticket / entry price. */
  price?: string | number;
  /** Custom label for the call-to-action button. */
  actionText?: string;
  /** Storyblok asset for the event image. */
  image?: {
    filename?: string;
    meta_data?: {
      alt?: string;
    };
  };
};

/**
 * Determines the visual variant of the event card.
 *
 * - `"featured"` — hero-style card (no price, no description).
 * - `"detailed"` — full-detail card used on the event detail page.
 * - `"list"` — compact card used in event lists / grids.
 */
type EventCardVariants = "featured" | "detailed" | "list";

/**
 * Props accepted by the {@link EventCard} component.
 */
type EventCardProps = {
  /** Event content object from Storyblok. */
  event: EventContent;
  /** Full slug used to link to the event detail page. */
  slug?: string;
  /**
   * Visual variant.
   * @defaultValue `"list"`
   */
  variant?: EventCardVariants;
  /** Tilt direction forwarded to `BaseCard`. */
  tilt?: Tilt;
  /** Eyebrow label rendered above the title. */
  eyebrowText?: string;
  /**
   * Controls how the start/end datetime is formatted.
   * @defaultValue `"default"`
   */
  datetimeFormat?: DatetimeFormatStyle;
};

/**
 * Renders an event as a card by mapping event data onto the generic
 * {@link BaseCard} slot props.
 *
 * Variant-specific behaviour:
 * - **`"featured"`** — hides the price and description; uses photo-frame
 *   styling with `featured-image` CSS class.
 * - **`"detailed"`** — shows all fields; uses `event-detailed` CSS class.
 * - **`"list"`** — shows all fields; uses `event-list-item` CSS class.
 *
 * @param props - See {@link EventCardProps}.
 * @returns A composed `BaseCard` element.
 */
export const EventCard = ({
  event,
  slug,
  variant = "list",
  tilt,
  eyebrowText,
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

  /** CSS class map keyed by variant. */
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
      eyebrowText={eyebrowText}
    />
  );
};
