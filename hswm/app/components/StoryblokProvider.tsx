/**
 * Storyblok client-side provider.
 *
 * This component is marked `"use client"` and calls
 * {@link getStoryblokApi} on mount to ensure the Storyblok SDK is
 * initialised in the browser context.  It is placed at the root of the
 * component tree (in `layout.tsx`) so that all client components have
 * access to the SDK singleton.
 *
 * The component itself does not render any additional DOM — it simply
 * passes `children` through.
 *
 * @module StoryblokProvider
 */

"use client";

import { PropsWithChildren } from "react";
import { getStoryblokApi } from "../lib/storyblok";

/**
 * Initialise the Storyblok SDK on the client and render children.
 *
 * @param props - Standard React `PropsWithChildren`.
 * @returns The children, unmodified.
 */
export const StoryblokProvider = ({ children }: PropsWithChildren) => {
  getStoryblokApi();
  return children;
};
