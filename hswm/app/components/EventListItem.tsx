/**
 * Compact event list-item component used in the "Upcoming Events" section.
 *
 * Unlike the full {@link EventCard}, this component uses a three-column
 * grid layout (date | content | action button) rather than the slot-based
 * `BaseCard`.  It extracts a truncated plain-text preview from the event's
 * rich-text description via {@link findAndShortenFirstParagraph}.
 *
 * @module EventListItem
 */

import {
  findAndShortenFirstParagraph,
  getDateRangeDisplayParts,
} from "../lib/helpers";

import Link from "next/link";

/**
 * Shape of the event data consumed by {@link EventListItem}.
 *
 * Mirrors the `EventContent` type used by `EventCard`, but is
 * declared locally to keep the component self-contained.
 */
type EventContent = {
  /** Display name of the event. */
  event_name?: string;
  /** Storyblok rich-text field describing the event. */
  event_description?: any;
  /** ISO-ish start datetime (Storyblok format). */
  event_start?: string;
  /** ISO-ish end datetime. */
  event_end?: string;
  /** Ticket / entry price. */
  price?: string | number;
  /** Custom label for the call-to-action button. */
  actionText?: string;
  /** Storyblok image asset. */
  image?: {
    filename?: string;
    meta_data?: {
      alt?: string;
    };
  };
};

/**
 * Props accepted by the {@link EventListItem} component.
 */
type EventListItemProps = {
  /** Event content from Storyblok. */
  event: EventContent;
  /** Full slug for the event detail link. */
  slug?: string;
};

/**
 * Renders a compact event row for use inside a vertical event list.
 *
 * Layout:
 * ```
 * ┌────────┬──────────────────────────────────┬────────────┐
 * │  DATE  │  Time range / Title / Preview    │  CTA btn   │
 * └────────┴──────────────────────────────────┴────────────┘
 * ```
 *
 * - The **date stack** shows the abbreviated month and day (or a
 *   start → end range when the event spans multiple days).
 * - The **content column** displays the time window, event name, and a
 *   truncated plain-text excerpt of the description.
 * - The **action column** renders a styled link button when a `slug` is
 *   provided.
 *
 * @param props - See {@link EventListItemProps}.
 * @returns A rendered event list-item element.
 */
export const EventListItem = ({ event, slug }: EventListItemProps) => {
  const dateparts = getDateRangeDisplayParts(
    event.event_start,
    event.event_end,
    "compact",
  );
  const shortenedText = findAndShortenFirstParagraph(
    event.event_description.content,
  );
  const dateFormat = (
    <>
      {dateparts?.sameDate ? (
        <div className="color-set-3 event-list-item-date">
          <p className="month">{dateparts.dateStart?.month}</p>
          <p className="day">{dateparts.dateStart?.day}</p>
        </div>
      ) : (
        <div className="event-list-item-date-container">
          <div className="color-set-3 event-list-item-date">
            <p className="month">{dateparts?.dateStart?.month}</p>
            <p className="day">{dateparts?.dateStart?.day}</p>
            <br />
            <p className="month">{dateparts?.dateEnd?.month}</p>
            <p className="day">{dateparts?.dateEnd?.day}</p>
          </div>
        </div>
      )}
    </>
  );
  const eventButton = slug ? (
    <div className="rect-button-container color-set-1">
      <Link className="rect-button-top" href={slug}>
        {event.actionText || "Explore Event"}
      </Link>
    </div>
  ) : null;
  const textPortion = (
    <div className="event-list-item-content">
      <p>{`${dateparts?.startTime} - ${dateparts?.endTime}`}</p>
      <h3 className="card-title">{event.event_name}</h3>

      <div className="event-list-item-desc">
        {shortenedText && shortenedText}
      </div>
    </div>
  );
  const content = (
    <div className="event-list-item">
      {dateFormat}
      {textPortion} {eventButton}
    </div>
  );

  return content;
};
export default EventListItem;
