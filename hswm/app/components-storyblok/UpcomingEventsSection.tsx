/**
 * Storyblok bridge: `upcoming_events` section.
 *
 * Fetches the resolved event relations from the blok, sorts them
 * chronologically, and renders each one as an {@link EventListItem}
 * inside a titled `Section`.
 *
 * Registered as `"upcoming_events"` in the Storyblok component map
 * (see {@link module:storyblok}).
 *
 * @module components-storyblok/UpcomingEventsSection
 */

import { EventCard } from "../components/EventCard";
import EventListItem from "../components/EventListItem";
import { Section } from "../components/Section";

/**
 * Render a chronologically-sorted list of upcoming events.
 *
 * Events are sorted ascending by their `event_start` date so the
 * soonest event appears first.  Each event is rendered via
 * `EventListItem`, which provides a compact date / title / CTA layout.
 *
 * @param props      - Storyblok component props.
 * @param props.blok - The `upcoming_events` blok payload containing:
 *                     - `headline` — section heading text.
 *                     - `events` — array of resolved event story objects.
 * @returns A `<Section>` with a headline and a list of event items.
 */
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
          <EventListItem
            key={eventStory.uuid || eventStory.id || eventStory.content?._uid}
            event={eventStory.content}
            slug={eventStory.full_slug}
          />
        ))}
      </div>
    </Section>
  );
};
