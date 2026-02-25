import Image from "next/image";
import ShopGrid from "./ShopGrid";

export default function Home() {
  return (
    <>
      <h1 className="flex justify-center text-5xl">Hero Text!</h1>
      <ShopGrid />
    </>
  );
}
