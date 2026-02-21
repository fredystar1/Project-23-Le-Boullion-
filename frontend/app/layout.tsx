"use client";

import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const hideHeader = pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en">
      <body>
        {!hideHeader && (
          <>
            {/* Promo bar */}
            <div className="w-full bg-white/80 text-center text-xs tracking-widest py-2">
              SAVE UP TO 10% ON CUSTOM CASES
            </div>

            {/* Dark header shell */}
            <header className="bg-gradient-to-b from-neutral-900 to-neutral-800 text-white">
              <div className="mx-auto max-w-6xl px-6 py-6 text-center">
                <div className="text-3xl font-medium tracking-wide">
                  Howard Street Wine Merchant
                </div>

                <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-white/80">
                  <a className="hover:text-white" href="#">
                    Shop
                  </a>
                  <a
                    className="text-white underline underline-offset-8"
                    href="/contact"
                  >
                    Contact Us
                  </a>
                  <a className="hover:text-white" href="#">
                    Classes and Events
                  </a>
                  <a className="hover:text-white" href="#">
                    Wine Club
                  </a>
                  <a className="hover:text-white" href="#">
                    Wine Dispensers
                  </a>
                </nav>
              </div>
            </header>
          </>
        )}

        {children}
      </body>
    </html>
  );
}
