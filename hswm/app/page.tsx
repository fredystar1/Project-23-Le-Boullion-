/**
 * Home page — `/`
 *
 * Fetches the `home` story from Storyblok (with featured event and
 * product relations resolved) and renders it via `<StoryblokStory>`.
 * A static info banner with the store's location, hours, and happy-hour
 * details is displayed above the dynamic CMS content.
 *
 * @module pages/home
 */

import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "./lib/storyblok";

/**
 * Fetch the `home` story from Storyblok.
 *
 * Resolves the `featured_event.featured_event` and
 * `featured_product.product` relations so their content is inlined.
 *
 * @returns The fully resolved Storyblok story object.
 *
 * @internal
 */
const fetchHomePage = async () => {
  const client = getStoryblokApi();
  const res = await client.getStory(`home`, {
    version: "draft",
    resolve_relations: "featured_event.featured_event,featured_product.product",
  });
  return res.data.story;
};

/**
 * Async server component for the home page.
 *
 * Renders:
 * 1. A three-section info banner (location, hours, happy hour).
 * 2. The Storyblok-managed content blocks (featured events, products, etc.).
 *
 * @returns The full home page JSX.
 */
const HomePage = async () => {
  const story = await fetchHomePage();
  return (
    <>
      <div className="banner color-set-6 font-change">
        <div className="banner-section">
          <div className="banner-subsurface">
            <h2 className="banner-subheading text-3D-sm">Location</h2>
            <address className="banner-address">
              <span className="banner-value">1013 Howard St</span>
              <span className="banner-value">Omaha, NE 68102</span>
            </address>
          </div>
        </div>

        <div className="banner-section">
          <div className="banner-subsurface">
            <h3 className="banner-subheading text-3D-sm">Hours</h3>
            <ul className="banner-list">
              <li>
                <span className="banner-label">Monday:</span>{" "}
                <span className="banner-value">2pm – 9pm</span>
              </li>
              <li>
                <span className="banner-label">Tuesday – Friday:</span>{" "}
                <span className="banner-value">12pm – 9pm</span>
              </li>
              <li>
                <span className="banner-label">Saturday:</span>{" "}
                <span className="banner-value">11am – 9pm</span>
              </li>
              <li>
                <span className="banner-label">Sunday:</span>{" "}
                <span className="banner-value">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="banner-section ">
          <div className="banner-subsurface">
            <h3 className="banner-subheading text-3D-sm">Happy Hour</h3>
            <ul className="banner-list">
              <li>
                <span className="banner-label">Monday – Saturday:</span>{" "}
                <span className="banner-value">3pm – 6pm</span>
              </li>
            </ul>
            <span className="banner-hero-text">30% off Wines On Tap</span>
          </div>
        </div>
      </div>
      <StoryblokStory
        story={story}
        variant="featured"
        contentPageType="editorial-page"
      />
    </>
  );
};

export default HomePage;
