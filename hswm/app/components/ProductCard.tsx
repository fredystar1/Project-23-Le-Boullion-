import { datetimeFormatter } from "../lib/helpers";
import { Tilt, itemVariantsUI } from "../lib/styling-types";
import { BaseCard } from "./BaseCard";
import Link from "next/link";
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
  product_image?: {
    filename?: string;
    meta_data?: {
      alt?: string;
    };
  };
};

type ProductCardProps = {
  product: ProductContent;
  variant: itemVariantsUI;
  slug?: string;
  tilt?: Tilt;
  eyebrowText?: string;
};

export const ProductCard = ({
  product,
  variant = "list",
  slug,
  tilt,
  eyebrowText,
}: ProductCardProps) => {
  const formattedDatetime = datetimeFormatter(
    product.product_start,
    product.product_end,
  );

  const showDescription = variant !== "list";
  const type = "product";

  const appliedClass = {
    featured: {
      cardStyle: "card-featured",
      imageStyle: "featured-image",
    },
    detailed: {
      cardStyle: `${type}-detailed`,
      imageStyle: `${type}-detailed-image`,
    },
    list: {
      cardStyle: `${type}-list-item`,
      imageStyle: `${type}-list-item-image`,
    },
    pricingItem: {
      cardStyle: "pricing-item",
      imageStyle: "pricing-item-image",
    },
  };

  const activeCardStyle = appliedClass[variant].cardStyle;
  const activeImageStyle = appliedClass[variant].imageStyle;
  const asPhotoStyle = variant === "featured";

  return (
    <BaseCard
      title={product.product_name}
      image={{
        filename: product.image?.filename || product.product_image?.filename,
        alt:
          product.image?.meta_data?.alt ||
          product.product_image?.meta_data?.alt,
      }}
      cardClassName={activeCardStyle}
      imageClassName={activeImageStyle}
      mediaClassName={`${type}-media`}
      asPhotoStyle={asPhotoStyle}
      datetimeNode={
        formattedDatetime ? (
          <div className={`${type}-datetime`}>{formattedDatetime}</div>
        ) : null
      }
      priceNode={
        product.price ? (
          <p className={`${type}-price`}>${product.price}</p>
        ) : null
      }
      descriptionNode={
        showDescription && product.product_description ? (
          <div className="card-body-text">
            <StoryblokServerRichText doc={product.product_description} />
          </div>
        ) : null
      }
      actionNode={
        slug ? (
          <div className="rect-button-container color-set-1">
            <Link className="rect-button-top" href={slug}>
              Explore {product.product_name}
            </Link>
          </div>
        ) : null
      }
      tilt={tilt}
      eyebrowText={eyebrowText}
    />
  );
};

export default ProductCard;
