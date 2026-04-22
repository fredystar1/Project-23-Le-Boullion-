import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../../lib/storyblok";

type WineClubProps = {
  params: Promise<{ slug: string[] }>;
};

const fetchWineClub = async (slugParts: string[]) => {
  const client = getStoryblokApi();
  const fullSlug = `products/${slugParts.join("/")}`;
  const res = await client.getStory(`${fullSlug}`, {
    version: "draft",
  });
  return res.data.story;
};

export default async function WineClubPage({ params }: WineClubProps) {
  const { slug } = await params;
  const story = await fetchWineClub(slug);
  return (
    <div className="section bg-[var(--surface)]">
      <StoryblokStory story={story} />
    </div>
  );
}
