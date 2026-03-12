import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import { Event } from "../components/Event";
import { Page } from "../components/Page";
import { UpcomingEvents } from "../components/UpcomingEvents";
import FeaturedEvent from "../components/FeaturedEvent";
import ProductSection from "../components/ProductSection";
import Article from "../components/Article";
import PromotionSelection from "../components/PromotionSelection";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components: {
    event: Event,
    page: Page,
    upcoming_events: UpcomingEvents,
    featured_event: FeaturedEvent,
    product_section: ProductSection,
    article: Article,
    promo_selection: PromotionSelection,
  },
  enableFallbackComponent: true,
});
