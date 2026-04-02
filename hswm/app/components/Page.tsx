import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { Tilt } from "../lib/styling-types";

export const Page = (params: any) => {
  return (
    <section>
      {params.blok.childrenBlocks.map((blok: any, index: number) => {
        const tilt: Tilt = index % 2 === 0 ? "left" : "right";
        return (
          <StoryblokServerComponent blok={blok} key={blok._uid} tilt={tilt} />
        );
      })}
    </section>
  );
};
