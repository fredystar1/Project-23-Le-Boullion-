/**
 * Product detail page — `/products/[...slug]`
 *
 * Catch-all dynamic route that supports arbitrarily nested product
 * slugs (e.g. `/products/wine-club/premium`).  Fetches the
 * corresponding Storyblok story and renders it via `<StoryblokStory>`.
 *
 * @module pages/products/[...slug]
 */

import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../../lib/storyblok";

/**
 * Props for the product detail page.
 */
type WineClubProps = {
  /** Next.js catch-all route params — `slug` is a string array. */
  params: Promise<{ slug: string[] }>;
};

/**
 * Fetch a product story by its full slug path.
 *
 * The `slug` array is joined with `"/"` and prefixed with `"products/"`
 * to form the Storyblok story path.
 *
 * @param slugParts - Array of URL path segments after `/products/`.
 * @returns The resolved Storyblok story object.
 *
 * @internal
 */
const fetchWineClub = async (slugParts: string[]) => {
  const client = getStoryblokApi();
  const fullSlug = `products/${slugParts.join("/")}`;
  const res = await client.getStory(`${fullSlug}`, {
    version: "draft",
  });
  return res.data.story;
};

/**
 * Async server component for an individual product page.
 *
 * @param props - See {@link WineClubProps}.
 * @returns A `<StoryblokStory>` element rendering the product detail view.
 */
export default async function WineClubPage({ params }: WineClubProps) {
  const { slug } = await params;
  const story = await fetchWineClub(slug);
  return (
    <div className="section bg-[var(--surface)]">
      <StoryblokStory story={story} />
    </div>
  );
}
