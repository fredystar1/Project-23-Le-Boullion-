export type WineRow = {
  id: number;
  title: string;
  vendor: string;
  image_url: string | null;
  category: string;
  available: boolean;
  description: string;
  price: string;
};

export type Product = {
  id: number;
  title: string;
  vendor: string;
  image_url: string;
  category: string;
  available: boolean;
  description: string;
  price: number;
};

export function normalizeWineToProduct(w: WineRow): Product {
  return {
    id: w.id,
    title: w.title,
    vendor: w.vendor,
    image_url: w.image_url ?? "/image_placeholder_800px.png",
    category: w.category,
    available: w.available,
    description: w.description,
    price: Number(w.price),
  };
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const start = (currentPage - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  return { pageItems, totalItems, totalPages, currentPage, pageSize };
}
