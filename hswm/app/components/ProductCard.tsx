import Image from "next/image";
import { StoryblokServerRichText } from "@storyblok/react/rsc";

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
};

type ProductCardVariants = "featured" | "detailed" | "list";

type ProductCardProps = {
  product: ProductContent;
  variant: ProductCardVariants;
};

export const ProductCard = ({
  product,
  variant = "list",
}: ProductCardProps) => {
  const showDescription = variant === "detailed";
  const appliedClass = {
    featured: {
      cardStyle: "product-featured",
      imageStyle: "product-featured-image",
    },
    detailed: {
      cardStyle: "product-detailed",
      imageStyle: "product-detailed-image",
    },
    list: {
      cardStyle: "product-list-item",
      imageStyle: "product-list-item-image",
    },
  };
  const activeCardStyle = appliedClass[variant].cardStyle;
  const activeImageStyle = appliedClass[variant].imageStyle;

  return (
    <article className={activeCardStyle}>
      <div className="product-media">
        {product.image?.filename && (
          <Image
            src={product.image.filename}
            width={800}
            height={800}
            alt={product.image.meta_data?.alt || product.product_name || ""}
            className={activeImageStyle}
          />
        )}
      </div>

      <div className="product-body">
        {product.product_name && (
          <h3 className="product-title">{product.product_name}</h3>
        )}

        {product.price && <p className="product-price">${product.price}</p>}

        {showDescription && product.product_description && (
          <div className="product-description">
            <StoryblokServerRichText doc={product.product_description} />
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
