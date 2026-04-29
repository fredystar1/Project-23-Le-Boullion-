import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../../lib/storyblok";

type WineDispenserProps = {
  params: Promise<{ slug: string }>;
};

const fetchWineDispenser = async (slug: string) => {
  const client = getStoryblokApi();
  const res = await client.getStory(`wine-dispensers/${slug}`, {
    version: "draft",
  });
  return res.data.story;
};

export default async function WineClubPage({ params }: WineDispenserProps) {
  const { slug } = await params;
  const story = await fetchWineDispenser(slug);

  return (
    <div className="section color-set-1 bg-[var(--surface)]">
      <StoryblokStory story={story} />
    </div>
  );
}
