import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../lib/storyblok";

const fetchPromotions = async () => {
  const client = getStoryblokApi();
  const res = await client.getStory(`promotions`, {
    version: "draft",
    resolve_relations: "promo_selection.active_promo",
  });
  return res.data.story;
};

const PromoStory = async () => {
  const story = await fetchPromotions();
  return <StoryblokStory story={story} />;
};

export default PromoStory;
