import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../../lib/storyblok";

type EventProps = {
  params: Promise<{ slug: string }>;
};

const fetchEvent = async (slug: string) => {
  const client = getStoryblokApi();
  const res = await client.getStory(`events/${slug}`, {
    version: "draft",
  });
  return res.data.story;
};

export default async function EventsPage({ params }: EventProps) {
  const { slug } = await params;
  const story = await fetchEvent(slug);

  return (
    <div>
      <StoryblokStory story={story} />
    </div>
  );
}
