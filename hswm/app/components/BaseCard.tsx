import Image from "next/image";
import Link from "next/link";
import { StoryblokServerRichText } from "@storyblok/react/rsc";
import { ReactNode } from "react";

type CardVariant = "featured" | "detailed" | "list";

interface BaseCardProps {
  title?: string;
  description?: any;
  price?: string | number;
  image?: string | {
    filename?: string;
    alt?: string;
  };
  variant?: CardVariant;
  type: "event" | "product";
  slug?: string;
  datetime?: string | ReactNode;
  className?: string;
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
}: BaseCardProps) => {
  const showDescription = type === "product" ? variant !== "list" : variant === "detailed";
  const showPrice = type === "event" ? variant !== "featured" : true;

  const appliedClass = {
    featured: {
      cardStyle: `${type}-featured`,
      imageStyle: `${type}-featured-image`,
    },
    detailed: {
      cardStyle: `${type}-detailed`,
      imageStyle: `${type}-detailed-image`,
    },
    list: {
      cardStyle: `${type}-list-item`,
      imageStyle: `${type}-list-item-image`,
    },
  };

  const activeCardStyle = appliedClass[variant].cardStyle;
  const activeImageStyle = appliedClass[variant].imageStyle;

  const imageUrl = typeof image === "string" ? image : image?.filename;
  const imageAlt = typeof image === "object" ? image?.alt : "";

  const content = (
    <>
      <div className={`${type}-media`}>
        {imageUrl && (
          <Image
            src={imageUrl}
            width={800}
            height={800}
            alt={imageAlt || title || ""}
            className={activeImageStyle}
          />
        )}
      </div>

      <div className={`${type}-body`}>
        {title && <h3 className={`${type}-title`}>{title}</h3>}

        {datetime && <div className={`${type}-datetime`}>{datetime}</div>}

        {showPrice && price && (
          <p className={`${type}-price`}>${price}</p>
        )}

        {showDescription && description && (
          <div className={`${type}-description`}>
            <StoryblokServerRichText doc={description} />
          </div>
        )}
      </div>
    </>
  );

  const combinedCardStyle = `${activeCardStyle} ${className}`.trim();

  if (slug) {
    return (
      <Link href={`/${slug}`} className={combinedCardStyle}>
        {content}
      </Link>
    );
  }

  return <article className={combinedCardStyle}>{content}</article>;
};

export default BaseCard;
