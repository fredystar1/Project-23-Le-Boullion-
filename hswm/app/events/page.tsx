/**
 * Events listing page — `/events`
 *
 * Fetches the `events` story from Storyblok (with the
 * `upcoming_events.events` relation resolved) and renders it via
 * `<StoryblokStory>`.  The actual event list is handled by the
 * `UpcomingEventsSection` Storyblok bridge component.
 *
 * @module pages/events
 */

import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../lib/storyblok";

/**
 * Fetch the `events` story from Storyblok.
 *
 * Resolves the `upcoming_events.events` relation so that each
 * event's full content is available inline.
 *
 * @returns The fully resolved Storyblok story object.
 *
 * @internal
 */
const fetchEventPage = async () => {
  const client = getStoryblokApi();
  const res = await client.getStory(`events`, {
    version: "draft",
    resolve_relations: "upcoming_events.events",
  });
  return res.data.story;
};

/**
 * Async server component for the events listing page.
 *
 * @returns A `<StoryblokStory>` element rendering the events page content.
 */
const EventsPage = async () => {
  const story = await fetchEventPage();
  return <StoryblokStory story={story} />;
};

export default EventsPage;
