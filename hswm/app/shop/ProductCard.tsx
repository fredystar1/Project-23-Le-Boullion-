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
    <div className="product-card">
      <div className="product-media">
        <div className="product-mediaInner">
          <Image
            src={image_url}
            alt={title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
            className="product-image"
          />
        </div>
      </div>

      <p className="product-vendor">{vendor}</p>
      <p className="product-title">{title}</p>
      <p className="product-meta">{category.replaceAll("_", " ")}</p>

      <div className="product-bottom">
        <p className="product-price">${price.toFixed(2)}</p>
        <span
          className={`product-badge ${available ? "product-badge--in" : "product-badge--out"}`}
        >
          {available ? "In stock" : "Sold out"}
        </span>
      </div>
    </div>
  );
}
