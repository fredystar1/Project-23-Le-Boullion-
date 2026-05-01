import Image from "next/image";
import { ReactNode } from "react";
import { photoFrameClass, Tilt } from "../lib/styling-types";

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
  hideImage?: boolean;
  tilt?: Tilt;
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
  hideImage = false,
  tilt = "none",
}: BaseCardProps) => {
  const imageUrl = typeof image === "string" ? image : image?.filename;
  const imageAlt = typeof image === "object" ? image?.alt : "";

  const imagePortion = (
    <div className="card-layered-container holepunch bg-[var(--surface-muted)]">
      <div className="striped rounded-2xl p-8">
        <div className="card-inner">
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
    </div>
  );

  const textPortion = (
    <div className="card-word-content">
      <div className="card-word-inner">
        {title && <h3 className="card-title">{title}</h3>}
        {datetimeNode}
        {priceNode}
        {descriptionNode}
        {actionNode}
      </div>
    </div>
  );

  const content = hideImage ? (
    textPortion
  ) : tilt !== "right" ? (
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
