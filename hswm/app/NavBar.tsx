import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="flex gap-6 mx-auto items-center font-change text-2xl">
        <div className="flex flex-col items-center leading-tight bg-[#e9eef3] p-2 rounded-2xl outline-solid outline-red-800">
          <h4 className="font-governor font-bold text-5xl tracking-tighter text-[#ffe575] uppercase text-3D">
            HOWARD STREET
          </h4>
          <h4 className="font-dynalight text-2xl -rotate-4 translate-x-2 text-red-800">
            Wine Merchant!
          </h4>
        </div>
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/about">About</Link>
        <Link href="/events">Events</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/wineclub">Wine Club</Link>
        <Link href="/winedispensers">Wine Dispensers</Link>
      </div>
    </nav>
  );
};

export default NavBar;
