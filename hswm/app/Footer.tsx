import Link from "next/link";

const Footer = () => {
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
