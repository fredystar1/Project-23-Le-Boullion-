import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import { Event } from "../components-storyblok/Event";
import { Product } from "../components-storyblok/Product";
import { Page } from "../components-storyblok/Page";
import { UpcomingEventsSection } from "../components-storyblok/UpcomingEventsSection";
import FeaturedEventSection from "../components-storyblok/FeaturedEventSection";
import ProductSection from "../components-storyblok/ProductSection";
import Article from "../components-storyblok/Article";
import PromotionSelection from "../components-storyblok/PromotionSelection";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components: {
    event: Event,
    product_offering: Product,
    page: Page,
    upcoming_events: UpcomingEventsSection,
    featured_event: FeaturedEventSection,
    product_section: ProductSection,
    article: Article,
    promo_selection: PromotionSelection,
  },
  enableFallbackComponent: true,
});
