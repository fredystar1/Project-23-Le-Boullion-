import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { Tilt } from "../lib/styling-types";

interface PageProps {
  blok: any;
  colorSet?: string;
}

export const Page = ({
  blok,
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
            colorSet={colorSet}
          />
        );
      })}
    </section>
  );
};
