import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import NavBar from "./NavBar";

const brandFont = localFont({
  src: "./fonts/governor.woff2",
  variable: "--font-governor",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${brandFont.variable} antialiased min-h-screen flex flex-col`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
