/**
 * Reusable hero banner component.
 *
 * Displays a large heading message with an optional action button
 * (e.g. a link to the wine quiz).  Used at the top of pages like
 * `/shop` and `/contact`.
 *
 * @module HeroBanner
 */

import { ReactNode } from "react";

/**
 * Props accepted by the {@link HeroBanner} component.
 */
type HeroBannerProps = {
  /** Primary heading text displayed inside the banner. */
  message: string;
  /** Optional call-to-action button rendered below the heading. */
  actionButton?: ReactNode;
};

/**
 * Render a full-width hero banner.
 *
 * @param props - See {@link HeroBannerProps}.
 * @returns A `<div>` containing the heading and optional action button.
 */
const HeroBanner = ({ message, actionButton }: HeroBannerProps) => {
  return (
    <div className="hero-banner">
      <h1 className="hero-message">{message}</h1>
      {actionButton && <div>{actionButton}</div>}
    </div>
  );
};

export default HeroBanner;
