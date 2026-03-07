import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import NavBar from "./NavBar";
import { StoryblokProvider } from "./components/StoryblokProvider";
import Footer from "./Footer";

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
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </StoryblokProvider>
  );
}
