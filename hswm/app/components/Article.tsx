import { StoryblokServerRichText } from "@storyblok/react/rsc";

const Article = (params: any) => {
  return (
    <article className="page-shell">
      <h2 className="featured-heading">{params.blok.article_title}</h2>
      <div className="prose mx-auto m-6 max-w-[70ch]">
        <StoryblokServerRichText doc={params.blok.article_content} />
      </div>
    </article>
  );
};

export default Article;
