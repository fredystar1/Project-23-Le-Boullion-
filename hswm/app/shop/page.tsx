import ShopClient from "./ShopClient";
import winesData from "../wines.json";
import type { Product } from "../lib/products";
import HeroBanner from "../HeroBanner";
import Button from "../Button";
import Link from "next/link";

type WineRecord = {
  id: number;
  title: string;
  vendor: string;
  image_url?: string;
  category: string;
  available: boolean;
  description?: string;
  price: number | string;
};

export default function Page() {
  const wines = winesData.wines as WineRecord[];

  // Convert JSON -> Product[]
  const products: Product[] = wines.map((w) => ({
    id: w.id,
    title: w.title,
    vendor: w.vendor,
    image_url: w.image_url ?? "/image_placeholder_800px.png",
    category: w.category,
    available: w.available,
    description: w.description ?? "",
    price: Number(w.price),
  }));

  return (
    <>
      <HeroBanner
        message="Explore your perfect wine match"
        actionButton={
          <Link href="/winequiz">
            <Button
              buttonText="Take the quiz &rarr;"
              className="action-button"
            />
          </Link>
        }
      />
      <ShopClient products={products} />
    </>
  );
}
