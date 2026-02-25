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

const ProductCard = ({
  title,
  vendor,
  image_url,
  category,
  available,
  price,
}: WineCardProps) => {
  return (
    <div className="w-full max-w-sm rounded-xl border bg-morning-haze p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Image Area */}
      <div
        className="
          relative
          flex
          items-center
          justify-center
          w-full
          h-64
          rounded-lg
          border
          mb-4
          bg-[radial-gradient(circle_at_center,white_70%,#e9e4ff_100%)]
        "
      >
        <Image
          src={image_url}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 flex-grow">
        <p className="text-xs uppercase tracking-wide opacity-60">{vendor}</p>
        <p className="font-semibold text-sm leading-snug">{title}</p>
        <p className="text-xs text-gray-600">{category}</p>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <p className="text-sm font-medium">${price.toFixed(2)}</p>
          <p
            className={`text-xs ${available ? "text-green-600" : "text-red-500"}`}
          >
            {available ? "In stock" : "Sold out"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
