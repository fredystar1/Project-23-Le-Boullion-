/**
 * Root layout for the Howard Street Wine Merchant Next.js application.
 *
 * This server component defines the outermost HTML structure, loads
 * custom fonts, and wraps every page in the common chrome:
 *
 * 1. `<StoryblokProvider>` — initialises the Storyblok SDK on the client.
 * 2. `<PromotionBar>` — displays the active site-wide promotion.
 * 3. `<NavBar>` — responsive navigation bar with brand lockup.
 * 4. `<main>` — page content injected via the `children` slot.
 * 5. `<Footer>` — store info, hours, and policy links.
 *
 * @module layout
 */

import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import NavBar from "./NavBar";
import { StoryblokProvider } from "./components/StoryblokProvider";
import Footer from "./Footer";
import PromotionBar from "./components/PromotionBar";

/**
 * Local "Governor" brand font loaded from the `fonts/` directory.
 *
 * Exposed as the CSS custom property `--font-governor` for use
 * in stylesheets via `font-family: var(--font-governor)`.
 */
const brandFont1 = localFont({
  src: "./fonts/governor.woff2",
  variable: "--font-governor",
  display: "swap",
});

/**
 * Default `<head>` metadata for the site.
 *
 * Individual pages may override or extend this via their own
 * `export const metadata` declarations.
 */
export const metadata: Metadata = {
  title: "Howard Street Wine Merchant",
  description: "Omaha's Premier Wine Vendor",
};

/**
 * Application root layout.
 *
 * @param props          - Standard Next.js layout props.
 * @param props.children - The active page component rendered inside `<main>`.
 * @returns The full HTML document shell.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoryblokProvider>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="/fonts/grand-slam/grand-slam.css" />
          <link
            rel="preload"
            href="/fonts/grand-slam/grand-slam-script-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/grand-slam/grand-slam-script-swash.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </head>
        <body
          className={`${brandFont1.variable} antialiased min-h-screen flex flex-col`}
        >
          <PromotionBar />
          <NavBar />
          <main className="color-set-4 page-shell checkered">{children}</main>
          <Footer />
        </body>
      </html>
    </StoryblokProvider>
  );
}
