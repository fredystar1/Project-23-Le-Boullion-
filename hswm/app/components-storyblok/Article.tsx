/**
 * Storyblok bridge: `article` content type.
 *
 * Renders a rich-text article with a heading and prose-formatted body.
 * Registered as `"article"` in the Storyblok component map
 * (see {@link module:storyblok}).
 *
 * @module components-storyblok/Article
 */

import { StoryblokServerRichText } from "@storyblok/react/rsc";

/**
 * Display a Storyblok article (heading + rich-text body).
 *
 * @param params          - Storyblok component props.
 * @param params.blok     - The `article` blok payload containing
 *                          `article_title` and `article_content`.
 * @returns An `<article>` element with styled heading and prose content.
 */
const Article = (params: any) => {
  return (
    <article className="page-shell">
      <div className="featured-heading">
        <h2 className="featured-heading-label">{params.blok.article_title}</h2>
      </div>
      <div className="prose mx-auto m-6 max-w-[70ch]">
        <StoryblokServerRichText doc={params.blok.article_content} />
      </div>
    </article>
  );
};

export default Article;
