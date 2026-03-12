import type { Metadata } from "next";
import "./globals1.css";
import localFont from "next/font/local";
import NavBar from "./NavBar";
import { StoryblokProvider } from "./components/StoryblokProvider";
import Footer from "./Footer";
import PromotionBar from "./components/PromotionBar";

const brandFont1 = localFont({
  src: "./fonts/governor.woff2",
  variable: "--font-governor",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Howard Street Wine Merchant",
  description: "Omaha's Premier Wine Vendor",
};

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
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </StoryblokProvider>
  );
}
