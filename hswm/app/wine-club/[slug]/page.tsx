import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../../lib/storyblok";

type WineClubProps = {
  params: Promise<{ slug: string }>;
};

const fetchWineClub = async (slug: string) => {
  const client = getStoryblokApi();
  const res = await client.getStory(`products/wine-club/${slug}`, {
    version: "draft",
  });
  return res.data.story;
};

export default async function WineClubPage({ params }: WineClubProps) {
  const { slug } = await params;
  const story = await fetchWineClub(slug);

  console.log(story);

  return (
    <div>
      <StoryblokStory story={story} />
    </div>
  );
}
