/**
 * Event detail page — `/events/[slug]`
 *
 * Dynamic route that fetches a single event story from Storyblok using
 * the URL slug and renders it via `<StoryblokStory>`.  The `event`
 * content type is resolved to the {@link Event} bridge component, which
 * renders it as a "detailed" `EventCard`.
 *
 * @module pages/events/[slug]
 */

import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../../lib/storyblok";

/**
 * Props for the event detail page.
 */
type EventProps = {
  /** Next.js dynamic route params (async in App Router). */
  params: Promise<{ slug: string }>;
};

/**
 * Fetch a single event story by slug.
 *
 * @param slug - The URL slug identifying the event (e.g. `"wine-tasting"`).
 * @returns The resolved Storyblok story object.
 *
 * @internal
 */
const fetchEvent = async (slug: string) => {
  const client = getStoryblokApi();
  const res = await client.getStory(`events/${slug}`, {
    version: "draft",
  });
  return res.data.story;
};

/**
 * Async server component for an individual event page.
 *
 * @param props - See {@link EventProps}.
 * @returns A `<StoryblokStory>` element rendering the event detail view.
 */
export default async function EventsPage({ params }: EventProps) {
  const { slug } = await params;
  const story = await fetchEvent(slug);

  return (
    <div>
      <StoryblokStory story={story} />
    </div>
  );
}
