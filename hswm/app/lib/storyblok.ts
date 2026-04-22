/**
 * Storyblok SDK initialisation and component registry.
 *
 * Calling {@link getStoryblokApi} performs two things:
 *
 * 1. Initialises the Storyblok React SDK (`storyblokInit`) with the
 *    project's access token, API plugin, and a component map that wires
 *    every Storyblok content-type name to its React rendering component.
 * 2. Returns a typed Storyblok API client that is used throughout the app
 *    to fetch stories via `client.getStory(…)`.
 *
 * The map keys (`event`, `product_offering`, `page`, …) **must** match the
 * technical names configured inside the Storyblok space.
 *
 * @module storyblok
 */

import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import { Event } from "../components-storyblok/Event";
import { Product } from "../components-storyblok/Product";
import { Page } from "../components-storyblok/Page";
import { UpcomingEventsSection } from "../components-storyblok/UpcomingEventsSection";
import FeaturedEventSection from "../components-storyblok/FeaturedEventSection";
import ProductSection from "../components-storyblok/ProductSection";
import Article from "../components-storyblok/Article";
import PromotionSelection from "../components-storyblok/PromotionSelection";
import FeaturedProductSection from "../components-storyblok/FeaturedProductSection";
import MultiProduct from "../components-storyblok/MultiProduct";

/**
 * Initialise the Storyblok SDK and return the API client singleton.
 *
 * The access token is read from the `STORYBLOK_API_TOKEN` environment
 * variable (set in `.env.local`).  The `enableFallbackComponent` flag
 * ensures that unknown content types render a placeholder instead of
 * crashing the page.
 *
 * @returns A fully initialised `StoryblokClient` instance.
 */
export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components: {
    event: Event,
    product_offering: Product,
    multi_product: MultiProduct,
    featured_product: FeaturedProductSection,
    page: Page,
    upcoming_events: UpcomingEventsSection,
    featured_event: FeaturedEventSection,
    product_section: ProductSection,
    article: Article,
    promo_selection: PromotionSelection,
  },
  enableFallbackComponent: true,
});
