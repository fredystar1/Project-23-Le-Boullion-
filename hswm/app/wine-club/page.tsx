import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../lib/storyblok";

const fetchWineClub = async () => {
  const client = getStoryblokApi();
  const res = await client.getStory(`wine-club/wine-club`, {
    version: "draft",
    resolve_relations: "product_section.products",
  });
  return res.data.story;
};

const WineClubPage = async () => {
  const story = await fetchWineClub();
  return (
    <StoryblokStory
      story={story}
      variant="pricingItem"
      contentPageType="product-page"
    />
  );
};

export default WineClubPage;
