import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import { Event } from "../components/Event";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components: {
    event: Event,
  },
  enableFallbackComponent: true,
});
