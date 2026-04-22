/**
 * Storyblok bridge: `featured_event` section.
 *
 * Resolves a featured event relation and renders it as a hero-style
 * `EventCard` inside a themed `Section` wrapper.
 *
 * Registered as `"featured_event"` in the Storyblok component map
 * (see {@link module:storyblok}).
 *
 * @module components-storyblok/FeaturedEventSection
 */

import { contentPageType, itemVariantsUI, Tilt } from "../lib/styling-types";
import { EventCard } from "../components/EventCard";
import { Section } from "../components/Section";

/**
 * Props accepted by {@link FeaturedEventSection}.
 */
interface FeaturedEventSectionProps {
  /** The Storyblok blok payload; contains the `featured_event` relation. */
  blok: any;
  /** Tilt direction forwarded to the event card. */
  tilt?: Tilt;
  /** UI variant forwarded to the wrapping `Section`. */
  variant: itemVariantsUI;
  /** Determines the CSS class prefix for the section content area. */
  contentPageType: contentPageType;
}

/**
 * Render a featured event inside a full-width section.
 *
 * The `featured_event` field in Storyblok may be an array (when the
 * relation is resolved) or a single object; this component normalises
 * that to a single story and bails early with `null` if no content is
 * available.
 *
 * @param props - See {@link FeaturedEventSectionProps}.
 * @returns A section containing a featured `EventCard`, or `null` if
 *          the event story has no content.
 */
const FeaturedEventSection = ({
  blok,
  tilt,
  variant,
  contentPageType,
}: FeaturedEventSectionProps) => {
  const featuredStory = Array.isArray(blok.featured_event)
    ? blok.featured_event[0]
    : blok.featured_event;

  if (!featuredStory?.content) {
    return null;
  }

  return (
    <div className="section bg-[var(--surface)]">
      <Section className={`${contentPageType}-content`} variant={variant}>
        <EventCard
          event={featuredStory.content}
          slug={featuredStory.full_slug}
          variant="featured"
          tilt={tilt}
          eyebrowText={blok.eyebrow_text}
        />
      </Section>
    </div>
  );
};

export default FeaturedEventSection;
