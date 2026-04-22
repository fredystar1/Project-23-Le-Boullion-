/**
 * Storyblok bridge: `page` content type.
 *
 * Acts as a **page-level orchestrator** that iterates over the blok's
 * `childrenBlocks` array and renders each child via
 * `<StoryblokServerComponent>`.  Alternating tilt directions
 * (`"left"` / `"right"`) are assigned automatically based on index.
 *
 * Registered as `"page"` in the Storyblok component map
 * (see {@link module:storyblok}).
 *
 * @module components-storyblok/Page
 */

import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { contentPageType, itemVariantsUI, Tilt } from "../lib/styling-types";

/**
 * Props accepted by the {@link Page} component.
 */
interface PageProps {
  /** Storyblok blok payload containing `childrenBlocks`. */
  blok: any;
  /** UI variant propagated to every child section. */
  variant: itemVariantsUI;
  /** CSS class prefix propagated to every child section. */
  contentPageType: contentPageType;
  /** Optional color-set class propagated to every child section. */
  colorSet?: string;
}

/**
 * Render a Storyblok page by iterating its child blocks.
 *
 * Each child block is rendered via the Storyblok component registry.
 * Even-indexed children receive `tilt="left"` and odd-indexed children
 * receive `tilt="right"`, producing an alternating visual rhythm.
 *
 * @param props - See {@link PageProps}.
 * @returns A `<section>` element containing all rendered child blocks.
 */
export const Page = ({
  blok,
  variant,
  contentPageType,
  colorSet,
}: PageProps) => {
  return (
    <section>
      {blok.childrenBlocks.map((blok: any, index: number) => {
        const tilt: Tilt = index % 2 === 0 ? "left" : "right";
        return (
          <StoryblokServerComponent
            blok={blok}
            key={blok._uid}
            tilt={tilt}
            variant={variant}
            contentPageType={contentPageType}
            colorSet={colorSet}
          />
        );
      })}
    </section>
  );
};
