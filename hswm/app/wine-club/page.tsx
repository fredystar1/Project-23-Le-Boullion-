import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../lib/storyblok";

const fetchWineClub = async () => {
  const client = getStoryblokApi();
  const res = await client.getStory(`wine-club/wine-club`, {
    version: "draft",
    resolve_relations: "multi_product.product_list",
  });
  return res.data.story;
};

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
