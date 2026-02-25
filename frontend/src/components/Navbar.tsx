const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="flex gap-6 mx-auto items-center">
        <li className="flex flex-col items-center leading-tight bg-[#e9eef3] p-2 rounded-2xl outline-solid outline-red-800">
          <h4 className="font-varela font-bold text-5xl tracking-tighter text-[#ffe575] uppercase text-3D">
            HOWARD STREET
          </h4>
          <h4 className="font-dynalight text-2xl -rotate-6 translate-x-2 text-red-800">
            Wine Merchant!
          </h4>
        </li>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/shop">Shop</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/events">Events</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/wineclub">Wine Club</a>
        </li>
        <li>
          <a href="/winedispensers">Wine Dispensers</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
