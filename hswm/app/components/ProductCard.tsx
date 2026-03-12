import { datetimeFormatter } from "../lib/helpers";
import { BaseCard } from "./BaseCard";

type ProductContent = {
  product_name?: string;
  product_description?: any;
  product_start?: string;
  product_end?: string;
  price?: string | number;
  image?: {
    filename?: string;
    meta_data?: {
      alt?: string;
    };
  };
  product_image?: {
    filename?: string;
    meta_data?: {
      alt?: string;
    };
  };
};

type ProductCardVariants = "featured" | "detailed" | "list";

type ProductCardProps = {
  product: ProductContent;
  variant: ProductCardVariants;
  slug?: string;
};

export const ProductCard = ({
  product,
  variant = "list",
  slug,
}: ProductCardProps) => {
  const formattedDatetime = datetimeFormatter(
    product.product_start,
    product.product_end,
  );


  return (
    <BaseCard
      title={product.product_name}
      description={product.product_description}
      price={product.price}
      image={{
        filename: product.image?.filename || product.product_image?.filename,
        alt: product.image?.meta_data?.alt || product.product_image?.meta_data?.alt,
      }}
      variant={variant}
      type="product"
      datetime={formattedDatetime}
      slug={slug}
    />
  );
};

export default ProductCard;
