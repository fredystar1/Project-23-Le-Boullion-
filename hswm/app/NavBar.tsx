/**
 * Responsive navigation bar with brand lockup and mobile hamburger menu.
 *
 * This is a **client component** (`"use client"`) because it manages
 * the open/closed state of the mobile navigation drawer via React state
 * and listens for viewport changes with `matchMedia`.
 *
 * The nav links alternate between `color-set-1` and `color-set-2` using
 * a modulo index to produce the characteristic striped button style.
 *
 * @module NavBar
 */

"use client";

import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

/**
 * Site-wide navigation bar.
 *
 * Layout:
 * - **Desktop (≥ 768 px)** — horizontal link row with 3-D styled buttons;
 *   the hamburger icon is hidden.
 * - **Mobile (< 768 px)** — only the brand lockup and hamburger icon are
 *   shown; tapping the icon toggles a vertical link list.
 *
 * The mobile drawer auto-closes when the viewport crosses the 768 px
 * breakpoint (handled via a `matchMedia` listener in `useEffect`).
 *
 * @returns The rendered `<nav>` element.
 */
const NavBar = () => {
  /** Whether the mobile navigation drawer is open. */
  const [open, setOpen] = useState(false);

  /*
   * Close the mobile drawer automatically when the viewport widens
   * past 768 px so it doesn't stay open if the user resizes.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setOpen(false);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  /** Navigation link definitions. */
  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/events", label: "Events" },
    { href: "/wine-club", label: "Wine Club" },
    { href: "/wine-dispensers", label: "Dispensers" },
    // { href: "/about", label: "About" },
    // { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-row">
          <Link href="/" className="brand-lockup">
            <h4 className="brand-title text-3D">HOWARD STREET</h4>
            <h4 className="brand-script">Wine Merchant!</h4>
          </Link>

          <div className="nav-links">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link-wrapper"
              >
                <span
                  className={`nav-link-shadow striped color-set-${(index % 2) + 1}`}
                />
                <span
                  className={`nav-link-face text-3D-sm color-set-${(index % 2) + 1}`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <button
            type="button"
            className={`nav-menu-button ${open ? "nav-menu-button-active" : ""}`}
            aria-label="Open navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <GiHamburgerMenu className="nav-menu-icon" />
          </button>
        </div>

        {open && (
          <div className="mobile-nav">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
