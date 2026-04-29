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
import FeaturedStorySection from "../components-storyblok/FeaturedStorySection";
import MultiLinkSection from "../components-storyblok/MultiLinkSection";
import FeaturedWineCategoriesSection from "../components-storyblok/FeaturedWineCategoriesSection";
import FeaturedWineDispensersSection from "../components-storyblok/FeaturedWineDispensersSection";
import MultiLinkAndImageSection from "../components-storyblok/MultiLinkAndImageSection";
import FeaturedCustomCaseSection from "../components-storyblok/FeaturedCustomCaseSection";
import CustomCaseForm from "../components-storyblok/CustomCaseForm";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components: {
    featured_product: FeaturedProductSection,
    featured_event: FeaturedEventSection,
    featured_story: FeaturedStorySection,
    featured_wine_categories: FeaturedWineCategoriesSection,
    featured_wine_dispensers: FeaturedWineDispensersSection,
    featured_custom_case: FeaturedCustomCaseSection,
    event: Event,
    product_offering: Product,
    multi_product: MultiProduct,
    multi_link: MultiLinkSection,
    multi_link_and_image: MultiLinkAndImageSection,
    page: Page,
    upcoming_events: UpcomingEventsSection,
    product_section: ProductSection,
    article: Article,
    promo_selection: PromotionSelection,
    custom_case_form: CustomCaseForm,
  },
  enableFallbackComponent: true,
});
