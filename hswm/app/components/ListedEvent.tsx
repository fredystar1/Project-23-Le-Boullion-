import Image from "next/image";
import { StoryblokServerRichText } from "@storyblok/react/rsc";

export const ListedEvent = (props: any) => {
  return (
    <div className="flex outline rounded">
      <div>
        <Image
          src={props.story.content.image?.filename}
          width={800}
          height={800}
          alt={props.story.content.image?.meta_data?.alt || ""}
        />
      </div>
      <div>
        <StoryblokServerRichText doc={props.story.content.event_description} />
      </div>
    </div>
  );
};
