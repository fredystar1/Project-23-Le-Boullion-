"use client";

import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

const NavBar = () => {
  const [open, setOpen] = useState(false);

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
            className="nav-menu-button"
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
