/**
 * Wine Club listing page — `/wine-club`
 *
 * Fetches the `wine-club/wine-club` story from Storyblok (with the
 * `multi_product.product_list` relation resolved) and renders it as a
 * pricing-item layout using the `"product-page"` content-page type and
 * `"color-set-5"` colour scheme.
 *
 * @module pages/wine-club
 */

import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../lib/storyblok";

/**
 * Fetch the Wine Club story from Storyblok.
 *
 * Resolves the `multi_product.product_list` relation so that all
 * membership-tier product stories are inlined.
 *
 * @returns The fully resolved Storyblok story object.
 *
 * @internal
 */
const fetchWineClub = async () => {
  const client = getStoryblokApi();
  const res = await client.getStory(`wine-club/wine-club`, {
    version: "draft",
    resolve_relations: "multi_product.product_list",
  });
  return res.data.story;
};

/**
 * Async server component for the Wine Club page.
 *
 * Passes `variant="pricingItem"` so that child product cards are
 * rendered in the pricing-tier style rather than the default list view.
 *
 * @returns A `<StoryblokStory>` element rendering the Wine Club content.
 */
const WineClubPage = async () => {
  const story = await fetchWineClub();
  // console.log(story);
  return (
    <StoryblokStory
      story={story}
      variant="pricingItem"
      contentPageType="product-page"
      colorSet="color-set-5"
    />
  );
};

export default WineClubPage;
