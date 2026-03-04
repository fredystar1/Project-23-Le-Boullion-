import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import { Event } from "../components/Event";
import { Page } from "../components/Page";
import { UpcomingEvents } from "../components/UpcomingEvents";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components: {
    event: Event,
    page: Page,
    upcoming_events: UpcomingEvents,
  },
  enableFallbackComponent: true,
});
