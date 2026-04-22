/**
 * Wine Club tier detail page — `/wine-club/[slug]`
 *
 * Dynamic route that fetches a single Wine Club membership-tier story
 * from Storyblok and renders it via `<StoryblokStory>`.  The Storyblok
 * path is `products/wine-club/<slug>`.
 *
 * @module pages/wine-club/[slug]
 */

import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../../lib/storyblok";

/**
 * Props for the Wine Club detail page.
 */
type WineClubProps = {
  /** Next.js dynamic route params (async in App Router). */
  params: Promise<{ slug: string }>;
};

/**
 * Fetch a Wine Club tier story by slug.
 *
 * @param slug - The URL slug identifying the tier (e.g. `"premier"`).
 * @returns The resolved Storyblok story object.
 *
 * @internal
 */
const fetchWineClub = async (slug: string) => {
  const client = getStoryblokApi();
  const res = await client.getStory(`products/wine-club/${slug}`, {
    version: "draft",
  });
  return res.data.story;
};

/**
 * Async server component for an individual Wine Club tier page.
 *
 * @param props - See {@link WineClubProps}.
 * @returns A `<StoryblokStory>` element rendering the tier detail view.
 */
export default async function WineClubPage({ params }: WineClubProps) {
  const { slug } = await params;
  const story = await fetchWineClub(slug);

  return (
    <div className="section color-set-1 bg-[var(--surface)]">
      <StoryblokStory story={story} />
    </div>
  );
}
