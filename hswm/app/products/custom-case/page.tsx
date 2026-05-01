import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../../lib/storyblok";

type ProductPageProps = {
  params: Promise<{ slug: string[] }>;
};

const fetchCustomCase = async (slugParts: string[]) => {
  const client = getStoryblokApi();
  const fullSlug = `products/custom-case`;
  const res = await client.getStory(`${fullSlug}`, {
    version: "draft",
  });
  return res.data.story;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const story = await fetchCustomCase(slug);
  return (
    <div className="section min-h-100 bg-[var(--surface)]">
      <StoryblokStory story={story} />
    </div>
  );
}
