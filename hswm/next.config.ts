/**
 * Next.js configuration.
 *
 * Registers the remote image domains that Next.js `<Image>` is allowed
 * to optimise.  Any `<Image src="…">` pointing to a hostname not listed
 * here will fail at build / runtime.
 *
 * Allowed origins:
 * - `cdn.shopify.com` — wine product images from the Shopify catalogue.
 * - `a.storyblok.com` — images uploaded through the Storyblok CMS.
 *
 * @module next.config
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
    ],
  },
};

export default nextConfig;
