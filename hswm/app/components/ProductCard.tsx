/**
 * Product card component — renders a Storyblok product in one of four
 * visual variants by composing props for {@link BaseCard}.
 *
 * @module ProductCard
 */

import { DatetimeFormatStyle, datetimeFormatter } from "../lib/helpers";
import { Tilt, itemVariantsUI } from "../lib/styling-types";
import { BaseCard } from "./BaseCard";
import Link from "next/link";
import { StoryblokServerRichText } from "@storyblok/react/rsc";

/**
 * Shape of the product data consumed by {@link ProductCard}.
 *
 * Supports two image field names (`image` and `product_image`) because
 * different Storyblok content types use different field keys.
 */
type ProductContent = {
  /** Display name of the product. */
  product_name?: string;
  /** Storyblok rich-text field with the product description. */
  product_description?: any;
  /** Optional availability start date. */
  product_start?: string;
  /** Optional availability end date. */
  product_end?: string;
  /** Product price in USD. */
  price?: string | number;
  /** Primary image asset. */
  image?: {
    filename?: string;
    meta_data?: {
      alt?: string;
    };
  };
  /** Alternate image field (used by some content types). */
  product_image?: {
    filename?: string;
    meta_data?: {
      alt?: string;
    };
  };
};

/**
 * Props accepted by the {@link ProductCard} component.
 */
type ProductCardProps = {
  /** Product content from Storyblok. */
  product: ProductContent;
  /**
   * Visual variant determining the CSS classes and which content
   * slots are displayed.
   */
  variant: itemVariantsUI;
  /** Full slug for linking to the product detail page. */
  slug?: string;
  /** Tilt direction forwarded to `BaseCard`. */
  tilt?: Tilt;
  /** Eyebrow label rendered above the title. */
  eyebrowText?: string;
  /** Controls how start/end dates are formatted. */
  datetimeFormat?: DatetimeFormatStyle;
};

/**
 * Renders a product as a card by mapping product data onto the generic
 * {@link BaseCard} slot props.
 *
 * Variant-specific behaviour:
 *
 * | Variant         | Photo frame? | Description? | CSS prefix        |
 * | --------------- | ------------ | ------------ | ----------------- |
 * | `"featured"`    | Yes          | No (hidden)  | `card-featured`   |
 * | `"detailed"`    | No           | Yes          | `product-detailed`|
 * | `"list"`        | No           | No           | `product-list-item`|
 * | `"pricingItem"` | No           | Yes          | `pricing-item`    |
 *
 * @param props - See {@link ProductCardProps}.
 * @returns A composed `BaseCard` element.
 */
export const ProductCard = ({
  product,
  variant = "list",
  slug,
  tilt,
  eyebrowText,
  datetimeFormat,
}: ProductCardProps) => {
  const formattedDatetime = datetimeFormatter(
    product?.product_start,
    product?.product_end,
    datetimeFormat,
  );

  const showDescription = variant !== "list";
  const type = "product";

  /** CSS class map keyed by variant. */
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
