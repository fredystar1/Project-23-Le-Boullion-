import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../lib/storyblok";

const fetchEventPage = async () => {
  const client = getStoryblokApi();
  const res = await client.getStory(`events`, {
    version: "draft",
    resolve_relations: "upcoming_events.events",
  });
  return res.data.story;
};

const EventsPage = async () => {
  const story = await fetchEventPage();
  return <StoryblokStory story={story} />;
};

export default EventsPage;
