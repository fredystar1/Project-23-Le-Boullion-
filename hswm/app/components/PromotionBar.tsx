/**
 * Site-wide promotion bar — fetches and renders the active promotion
 * from Storyblok.
 *
 * This is an **async server component** that runs at request time.
 * It fetches the `promotions` story (which uses the `promo_selection`
 * content type) and delegates rendering to the Storyblok component
 * registry via `<StoryblokStory>`.
 *
 * Visually, the promotion bar appears as a narrow banner above the
 * navigation bar.
 *
 * @module PromotionBar
 */

import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../lib/storyblok";

/**
 * Fetch the `promotions` story from Storyblok, resolving the
 * `promo_selection.active_promo` relation so the active promotion's
 * content is inlined.
 *
 * @returns The fully resolved Storyblok story object.
 *
 * @internal
 */
const fetchPromotions = async () => {
  const client = getStoryblokApi();
  const res = await client.getStory(`promotions`, {
    version: "draft",
    resolve_relations: "promo_selection.active_promo",
  });
  return res.data.story;
};

/**
 * Async server component that fetches and renders the active site-wide
 * promotion banner.
 *
 * @returns A `<StoryblokStory>` element wrapping the promotion content.
 */
const PromoStory = async () => {
  const story = await fetchPromotions();
  return <StoryblokStory story={story} />;
};

export default PromoStory;
