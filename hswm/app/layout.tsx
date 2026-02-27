import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import NavBar from "./NavBar";
import { StoryblokProvider } from "./components/StoryblokProvider";

const brandFont = localFont({
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
        <body
          className={`${brandFont.variable} antialiased min-h-screen flex flex-col`}
        >
          <NavBar />
          {children}
        </body>
      </html>
    </StoryblokProvider>
  );
}
