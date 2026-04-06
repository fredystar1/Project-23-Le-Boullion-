import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { contentPageType, itemVariantsUI, Tilt } from "../lib/styling-types";

interface PageProps {
  blok: any;
  variant: itemVariantsUI;
  contentPageType: contentPageType;
  colorSet?: string;
}

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
