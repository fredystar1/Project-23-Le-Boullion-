import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "./lib/storyblok";

const fetchHomePage = async () => {
  const client = getStoryblokApi();
  const res = await client.getStory(`home`, {
    version: "draft",
    resolve_relations: "featured_event.featured_event,product_section.products",
  });
  return res.data.story;
};

const HomePage = async () => {
  const story = await fetchHomePage();
  return (
    <div>
      <StoryblokStory story={story} />
    </div>
  );
};

export default HomePage;
