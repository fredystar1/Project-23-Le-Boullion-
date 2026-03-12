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
    <main>
      {/* <div className="banner">
        <h2>Visit Us</h2>
        <div className="banner-section">
          <h3>Location</h3>
          <p>1013 Howard St</p>
          <p>Omaha, NE 68102</p>
        </div>
        <div className="banner-section">
          <h3>Hours</h3>
          <p>
            <b>Monday:</b>2pm - 9pm
          </p>
          <p>
            <b>Tuesday - Friday:</b>12pm - 9pm
          </p>
          <p>
            <b>Saturday:</b>11am - 9pm
          </p>
          <p>
            <b>Sunday:</b>Closed
          </p>
        </div>
        <div className="banner-section">
          <h3>Happy Hour</h3>
          <p>Monday - Saturday: 3pm - 6pm</p>
          <p>30% off Wines On Tap.</p>
        </div>
      </div> */}
      <StoryblokStory story={story} />
    </main>
  );
};

export default HomePage;
