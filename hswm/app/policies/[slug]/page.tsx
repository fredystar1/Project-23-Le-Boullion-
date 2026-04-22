/**
 * Policy detail page — `/policies/[slug]`
 *
 * Dynamic route that fetches a single policy article from Storyblok
 * (e.g. `refund-policy`, `privacy-policy`, `terms-of-service`) and
 * renders it via `<StoryblokStory>`.
 *
 * @module pages/policies/[slug]
 */

import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../../lib/storyblok";

/**
 * Props for the policy detail page.
 */
type PolicyProps = {
  /** Next.js dynamic route params (async in App Router). */
  params: Promise<{ slug: string }>;
};

/**
 * Fetch a single policy story by slug.
 *
 * @param slug - The URL slug identifying the policy (e.g. `"refund-policy"`).
 * @returns The resolved Storyblok story object.
 *
 * @internal
 */
const fetchPolicy = async (slug: string) => {
  const client = getStoryblokApi();
  const res = await client.getStory(`policies/${slug}`, {
    version: "draft",
  });
  return res.data.story;
};

/**
 * Async server component for an individual policy page.
 *
 * @param props - See {@link PolicyProps}.
 * @returns A `<StoryblokStory>` element rendering the policy content.
 */
export default async function PolicysPage({ params }: PolicyProps) {
  const { slug } = await params;
  const story = await fetchPolicy(slug);

  return (
    <div className="section bg-[var(--surface)]">
      <StoryblokStory story={story} />
    </div>
  );
}
