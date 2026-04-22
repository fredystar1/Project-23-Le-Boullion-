/**
 * Site-wide footer component.
 *
 * Displays the store's contact information, business hours, happy-hour
 * details, policy links, and a copyright line.  This is a **server
 * component** — it contains no client-side interactivity.
 *
 * @module Footer
 */

import Link from "next/link";

/**
 * Render the site footer.
 *
 * The footer is divided into a three-column grid:
 *
 * 1. **Brand / Contact** — store name, address, and email.
 * 2. **Hours** — regular hours and happy-hour information.
 * 3. **Policies** — links to refund, privacy, and ToS pages.
 *
 * A bottom bar displays the dynamic copyright year and tagline.
 *
 * @returns The rendered `<footer>` element.
 */
const Footer = () => {
  /** Policy page link definitions. */
  const links = [
    { href: "/policies/refund-policy", label: "Refund Policy" },
    { href: "/policies/privacy-policy", label: "Privacy Policy" },
    { href: "/policies/terms-of-service", label: "Terms of Service" },
  ];

  return (
    <footer className="footer">
      <div className="footer-accent-1" />
      <div className="footer-accent-2" />

      <div className="footer-content">
        <div className="footer-grid">
          {/* Store Info */}
          <div className="footer-section footer-section--brand">
            <h2 className="footer-title footer-brand">Howard Street Wine</h2>
            <div className="footer-stack">
              <p>1013 Howard St</p>
              <p>Omaha, NE 68102</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@howardstreetwine.com"
                  className="footer-inline-link"
                >
                  info@howardstreetwine.com
                </a>
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="footer-section">
            <h3 className="footer-title">Hours</h3>
            <div className="footer-stack">
              <p>
                <span className="footer-label">Monday:</span> 2pm – 9pm
              </p>
              <p>
                <span className="footer-label">Tuesday – Friday:</span> 12pm –
                9pm
              </p>
              <p>
                <span className="footer-label">Saturday:</span> 11am – 9pm
              </p>
              <p>
                <span className="footer-label">Sunday:</span> Closed
              </p>
            </div>

            <div className="footer-subsection">
              <h3 className="footer-title">Happy Hour</h3>
              <div className="footer-stack">
                <p>Monday – Saturday: 3pm – 6pm</p>
                <p>30% off Wines On Tap</p>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div className="footer-section">
            <h3 className="footer-title">Policies</h3>
            <ul className="footer-links">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Howard Street Wine</p>
          <p>Curated bottles, events, and neighborhood hospitality.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
