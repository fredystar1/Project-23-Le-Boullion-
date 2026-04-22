/**
 * Composable content card used as the foundation for all card variants
 * (event cards, product cards, pricing cards, etc.).
 *
 * `BaseCard` follows a **slot-based** design: instead of accepting raw
 * data, it receives pre-built React nodes for each content zone (image,
 * title, datetime, price, description, action).  Higher-level components
 * like `EventCard` and `ProductCard` prepare those nodes and delegate
 * rendering here.
 *
 * @module BaseCard
 */

import Image from "next/image";
import { ReactNode } from "react";
import { Tilt } from "../lib/styling-types";

/**
 * Props accepted by {@link BaseCard}.
 */
interface BaseCardProps {
  /** Card heading text. */
  title?: string;
  /**
   * Image source — may be either a plain URL string or a Storyblok-style
   * object with `filename` and `alt` fields.
   */
  image?:
    | string
    | {
        filename?: string;
        alt?: string;
      };
  /** Slot for a rendered date / time element. */
  datetimeNode?: ReactNode;
  /** Slot for a rendered price element. */
  priceNode?: ReactNode;
  /** Slot for a rendered description / body-text element. */
  descriptionNode?: ReactNode;
  /** Slot for a rendered call-to-action element (e.g. a link button). */
  actionNode?: ReactNode;
  /** CSS class applied to the outer `<article>` wrapper. */
  cardClassName?: string;
  /** CSS class applied to the media container `<div>`. */
  mediaClassName?: string;
  /** CSS class applied to the `<Image>` element itself. */
  imageClassName?: string;
  /**
   * When `true`, the image is wrapped in a decorative photo-frame `<div>`
   * whose tilt direction is determined by the {@link tilt} prop.
   */
  asPhotoStyle?: boolean;
  /**
   * Controls the visual tilt of the photo frame and the ordering of
   * image vs. text.  When `"right"`, the text portion renders *before*
   * the image portion.
   *
   * @defaultValue `"none"`
   */
  tilt?: Tilt;
  /** Small label rendered above the title (e.g. "Featured Event"). */
  eyebrowText?: string;
}

/**
 * A composable, slot-based content card.
 *
 * The card is split into two halves:
 *
 * 1. **Image portion** — a layered container with a hole-punch effect,
 *    striped inner border, and optional photo-frame tilt.
 * 2. **Text portion** — eyebrow, title, datetime, price, description,
 *    and action nodes stacked vertically.
 *
 * When `tilt` is `"right"`, the text portion is rendered first so that
 * the image appears on the right side of the card.
 *
 * @param props - See {@link BaseCardProps}.
 * @returns A rendered `<article>` element.
 */
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
  /** Maps tilt direction → photo-frame CSS class name. */
  const photoFrameClass = {
    none: "photo-frame",
    left: "photo-frame-left",
    right: "photo-frame-right",
  };

  const imageUrl = typeof image === "string" ? image : image?.filename;
  const imageAlt = typeof image === "object" ? image?.alt : "";

  /** Image half of the card. */
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

  /** Text half of the card. */
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
