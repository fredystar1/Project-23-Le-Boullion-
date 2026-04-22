/**
 * Legacy event list component.
 *
 * Renders an event's image and rich-text description side-by-side in a
 * simple flex row.  This component is largely superseded by
 * {@link EventCard} and {@link EventListItem} and may be removed in a
 * future iteration.
 *
 * @module ListedEvent
 */

import Image from "next/image";
import { StoryblokServerRichText } from "@storyblok/react/rsc";

/**
 * Display an event as a horizontal image + description block.
 *
 * @param props          - Storyblok story wrapper.
 * @param props.story    - The full Storyblok story object containing
 *                         `content.image` and `content.event_description`.
 * @returns A flex row with the event image on the left and rich-text
 *          description on the right.
 */
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
