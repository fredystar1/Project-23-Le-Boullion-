import Image from "next/image";
import { ReactNode } from "react";
import { Tilt } from "../lib/styling-types";

interface BaseCardProps {
  title?: string;
  image?:
    | string
    | {
        filename?: string;
        alt?: string;
      };
  datetimeNode?: ReactNode;
  priceNode?: ReactNode;
  descriptionNode?: ReactNode;
  actionNode?: ReactNode;
  cardClassName?: string;
  mediaClassName?: string;
  imageClassName?: string;
  asPhotoStyle?: boolean;
  tilt?: Tilt;
  eyebrowText?: string;
}

export const BaseCard = ({
  title,
  image,
  datetimeNode,
  priceNode,
  descriptionNode,
  actionNode,
  cardClassName = "",
  mediaClassName = "media-container",
  imageClassName = "",
  asPhotoStyle = false,
  tilt = "none",
  eyebrowText,
}: BaseCardProps) => {
  const photoFrameClass = {
    none: "photo-frame",
    left: "photo-frame-left",
    right: "photo-frame-right",
  };

  const imageUrl = typeof image === "string" ? image : image?.filename;
  const imageAlt = typeof image === "object" ? image?.alt : "";

  const imagePortion = (
    <div className="card-layered-container holepunch bg-[var(--surface-muted)]">
      <div className="striped rounded-2xl p-8">
        <div className="card-inner"></div>
        <div className={mediaClassName}>
          {imageUrl &&
            (asPhotoStyle ? (
              <div className={photoFrameClass[tilt]}>
                <Image
                  src={imageUrl}
                  width={800}
                  height={800}
                  alt={imageAlt || title || ""}
                  className={imageClassName}
                />
              </div>
            ) : (
              <Image
                src={imageUrl}
                width={800}
                height={800}
                alt={imageAlt || title || ""}
                className={imageClassName}
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
        {datetimeNode}
        {priceNode}
        {descriptionNode}
        {actionNode}
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

  return <article className={cardClassName}>{content}</article>;
};

export default BaseCard;
