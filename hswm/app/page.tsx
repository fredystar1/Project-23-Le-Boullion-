import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "./lib/storyblok";
import HeroBanner from "./HeroBanner";

const fetchHomePage = async () => {
  const client = getStoryblokApi();
  const res = await client.getStory(`home`, {
    version: "draft",
    resolve_relations: "featured_event.featured_event,product_section.products",
  });
  return res.data.story;
};

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
