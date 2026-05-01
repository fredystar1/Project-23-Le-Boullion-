import { DatetimeFormatStyle, datetimeFormatter } from "../lib/helpers";
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
  repeat_cost?: "" | "week" | "month" | "year";
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
  key_features?: {
    _uid: string;
    subheading?: string;
    features?: any;
    component: string;
  }[];
};

type ProductCardProps = {
  product: ProductContent;
  variant: itemVariantsUI;
  slug?: string;
  tilt?: Tilt;
  datetimeFormat?: DatetimeFormatStyle;
};

/**
 * Formats a price with an optional repeat cost suffix.
 * e.g. "$100.00" or "$100.00/month"
 */
const formatPrice = (price: string | number, repeatCost?: string): string => {
  const base = `$${price}`;
  if (repeatCost && repeatCost !== "") {
    return `${base}/${repeatCost}`;
  }
  return base;
};

export const ProductCard = ({
  product,
  variant = "list",
  slug,
  tilt,
  datetimeFormat,
}: ProductCardProps) => {
  const formattedDatetime = datetimeFormatter(
    product?.product_start,
    product?.product_end,
    datetimeFormat,
  );

  const isPricing = variant === "pricingItem";
  const showDescription = variant !== "list" && !isPricing;
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

  // For pricing items, render key_features instead of description
  const keyFeaturesNode =
    isPricing && product.key_features?.length
      ? product.key_features.map((section) => (
          <div key={section._uid} className="pricing-features">
            {section.subheading && (
              <h4 className="pricing-subheading">{section.subheading}</h4>
            )}
            {section.features && (
              <StoryblokServerRichText doc={section.features} />
            )}
          </div>
        ))
      : null;

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
      hideImage={isPricing}
      datetimeNode={
        formattedDatetime ? (
          <div className={`${type}-datetime`}>{formattedDatetime}</div>
        ) : null
      }
      priceNode={
        product.price ? (
          <p className={isPricing ? "pricing-price" : `${type}-price`}>
            {formatPrice(product.price, product.repeat_cost ?? undefined)}
          </p>
        ) : null
      }
      descriptionNode={
        keyFeaturesNode ||
        (showDescription && product.product_description ? (
          <div className="card-body-text">
            <StoryblokServerRichText doc={product.product_description} />
          </div>
        ) : null)
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
    />
  );
};

export default ProductCard;
