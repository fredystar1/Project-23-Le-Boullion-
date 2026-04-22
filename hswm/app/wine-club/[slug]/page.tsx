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

  return (
    <div className="section color-set-1 bg-[var(--surface)]">
      <StoryblokStory story={story} />
    </div>
  );
}
