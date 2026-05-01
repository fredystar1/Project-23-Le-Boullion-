import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../lib/storyblok";

const fetchWineDispensers = async () => {
  const client = getStoryblokApi();
  const res = await client.getStory(`wine-dispensers/wine-dispensers`, {
    version: "draft",
    // resolve_relations: "multi_product.product_list",
  });
  return res.data.story;
};

const WineDispensersPage = async () => {
  const story = await fetchWineDispensers();
  // console.log(story);
  return (
    <StoryblokStory
      story={story}
      colorSet="color-set-5"
    />
  );
};

export default WineDispensersPage;
