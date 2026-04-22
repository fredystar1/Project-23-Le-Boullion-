/**
 * Shop page — `/shop`
 *
 * Server component that loads the static wine catalogue from
 * `wines.json`, normalises it into {@link Product} objects, and hands
 * the data off to the client-side {@link ShopClient} for filtering,
 * pagination, and rendering.
 *
 * A hero banner with a link to the wine quiz is displayed above the
 * shop grid.
 *
 * @module pages/shop
 */

import ShopClient from "./ShopClient";
import winesData from "../wines.json";
import type { Product } from "../lib/products";
import HeroBanner from "../HeroBanner";
import Button from "../Button";
import Link from "next/link";

/**
 * Shape of a single record in `wines.json`.
 *
 * This is a local convenience type for the JSON import; the data is
 * normalised to {@link Product} before being passed to the client.
 */
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

/**
 * Render the shop page.
 *
 * Converts the raw wine JSON into a `Product[]` array (substituting
 * placeholder images and coercing prices to numbers) and passes it to
 * `ShopClient` for interactive display.
 *
 * @returns The hero banner and the `ShopClient` component.
 */
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
