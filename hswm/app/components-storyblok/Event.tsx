/**
 * Storyblok bridge: `event` content type.
 *
 * Thin wrapper that renders the event blok as a "detailed" variant
 * {@link EventCard}.  Used on individual event detail pages.
 *
 * Registered as `"event"` in the Storyblok component map
 * (see {@link module:storyblok}).
 *
 * @module components-storyblok/Event
 */

import { EventCard } from "../components/EventCard";

/**
 * Render a single Storyblok event blok as a detailed event card.
 *
 * @param props      - Storyblok component props.
 * @param props.blok - The event blok payload (passed directly as
 *                     `EventCard`'s `event` prop).
 * @returns An `EventCard` in the `"detailed"` variant.
 */
export const Event = ({ blok }: any) => {
  return <EventCard variant={"detailed"} event={blok} />;
};
