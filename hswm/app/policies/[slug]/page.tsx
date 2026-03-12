import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../../lib/storyblok";

type PolicyProps = {
  params: Promise<{ slug: string }>;
};

const fetchPolicy = async (slug: string) => {
  const client = getStoryblokApi();
  const res = await client.getStory(`policies/${slug}`, {
    version: "draft",
  });
  return res.data.story;
};

export default async function PolicysPage({ params }: PolicyProps) {
  const { slug } = await params;
  const story = await fetchPolicy(slug);

  return (
    <div>
      <StoryblokStory story={story} />
    </div>
  );
}
