import Link from "next/link";

const NavBar = () => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
    { href: "/wineclub", label: "Wine Club" },
    { href: "/winedispensers", label: "Dispensers" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-row">
          <div className="brand-lockup">
            <h4 className="brand-title text-3D">HOWARD STREET</h4>
            <h4 className="brand-script">Wine Merchant</h4>
          </div>

          <div className="nav-links">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
