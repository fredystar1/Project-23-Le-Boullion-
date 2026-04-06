import Image from "next/image";
import Link from "next/link";
import { StoryblokServerRichText } from "@storyblok/react/rsc";
import { ReactNode } from "react";
import { Tilt, itemVariantsUI } from "../lib/styling-types";

interface BaseCardProps {
  title?: string;
  description?: any;
  price?: string | number;
  image?:
    | string
    | {
        filename?: string;
        alt?: string;
      };
  variant?: itemVariantsUI;
  type: "event" | "product";
  slug?: string;
  datetime?: string | ReactNode;
  className?: string;
  actionText?: string;
  tilt?: Tilt;
  eyebrowText?: string;
}

export const BaseCard = ({
  title,
  description,
  price,
  image,
  variant = "list",
  type,
  slug,
  datetime,
  className = "",
  actionText,
  tilt = "none",
  eyebrowText,
}: BaseCardProps) => {
  const showDescription =
    type === "product" ? variant !== "list" : variant === "detailed";
  const showPrice = type === "event" ? variant !== "featured" : true;
  const asPhotoStyle = true;
  // const asPhotoStyle = type === "event" && variant === "featured";

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

  const photoFrameClass = {
    none: "photo-frame",
    left: "photo-frame-left",
    right: "photo-frame-right",
  };

  const activeCardStyle = appliedClass[variant].cardStyle;
  const activeImageStyle = appliedClass[variant].imageStyle;

  const imageUrl = typeof image === "string" ? image : image?.filename;
  const imageAlt = typeof image === "object" ? image?.alt : "";

  const imagePortion = (
    <div className="card-layered-container holepunch bg-[var(--surface-muted)]">
      <div className="striped rounded-2xl p-8">
        <div className="card-inner"></div>
        <div className={`${type}-media`}>
          {imageUrl &&
            (asPhotoStyle ? (
              <div className={photoFrameClass[tilt]}>
                <Image
                  src={imageUrl}
                  width={800}
                  height={800}
                  alt={imageAlt || title || ""}
                  className={activeImageStyle}
                />
              </div>
            ) : (
              <Image
                src={imageUrl}
                width={800}
                height={800}
                alt={imageAlt || title || ""}
                className={activeImageStyle}
              />
            ))}
        </div>
      </div>
    </div>
  );

  const textPortion = (
    <div className="card-word-content">
      <div className="card-word-inner">
        {eyebrowText && <span className="eyebrow">{eyebrowText}</span>}
        {title && <h3 className="card-title">{title}</h3>}
        {datetime && <div className={`${type}-datetime`}>{datetime}</div>}
        {showPrice && price && <p className={`${type}-price`}>${price}</p>}
        {showDescription && description && (
          <div className="card-body-text">
            <StoryblokServerRichText doc={description} />
          </div>
        )}
        {slug && (
          <div className="rect-button-container color-set-1">
            <Link className="rect-button-top" href={slug}>
              {actionText || `Explore ${title}`}
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  const content =
    tilt !== "right" ? (
      <>
        {imagePortion}
        {textPortion}
      </>
    ) : (
      <>
        {textPortion}
        {imagePortion}
      </>
    );

  const combinedCardStyle = `${activeCardStyle} ${className}`.trim();

  return <article className={combinedCardStyle}>{content}</article>;
};

export default BaseCard;
