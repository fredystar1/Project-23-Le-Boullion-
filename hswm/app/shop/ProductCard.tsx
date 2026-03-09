import Image from "next/image";

type WineCardProps = {
  id: number;
  title: string;
  vendor: string;
  image_url: string;
  category: string;
  available: boolean;
  description: string;
  price: number;
};

export default function ProductCard({
  title,
  vendor,
  image_url,
  category,
  available,
  price,
}: WineCardProps) {
  return (
    <div className="shop-item-card">
      <div className="shop-item-media">
        <div className="shop-item-mediaInner">
          <Image
            src={image_url}
            alt={title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
            className="shop-item-image"
          />
        </div>
      </div>

      <p className="shop-item-vendor">{vendor}</p>
      <p className="shop-item-title">{title}</p>
      <p className="shop-item-meta">{category.replaceAll("_", " ")}</p>

      <div className="shop-item-bottom">
        <p className="shop-item-price">${price.toFixed(2)}</p>
        <span
          className={`shop-item-badge ${available ? "shop-item-badge--in" : "shop-item-badge--out"}`}
        >
          {available ? "In stock" : "Sold out"}
        </span>
      </div>
    </div>
  );
}
