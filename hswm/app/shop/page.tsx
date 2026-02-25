import ShopGrid from "../ShopGrid";
import Pagination from "../Pagination";
import winesData from "../wines.json";
import {
  normalizeWineToProduct,
  paginate,
  type WineRow,
} from "../lib/products";
import HeroBanner from "../HeroBanner";
import Button from "../Button";

const PAGE_SIZE = 16;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;

  const rows = winesData.wines as WineRow[];
  const products = rows.map(normalizeWineToProduct);

  const page = Number(sp.page ?? "1");
  const { pageItems, totalPages, currentPage } = paginate(
    products,
    page,
    PAGE_SIZE,
  );

  return (
    <>
      <HeroBanner
        message="Explore your perfect wine match"
        actionButton={
          <Button
            buttonText="Take the quiz &rarr;"
            className="action-button font-change"
          />
        }
      />
      <ShopGrid products={pageItems} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
