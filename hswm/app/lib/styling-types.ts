/**
 * Shared UI styling type aliases used across components.
 *
 * These types form a small design-token vocabulary that keeps layout-related
 * props consistent between the card, section, and page-level components.
 *
 * @module styling-types
 */

/**
 * Controls the horizontal tilt direction applied to card imagery.
 *
 * - `"left"` — image is offset / rotated slightly to the left.
 * - `"right"` — image is offset / rotated slightly to the right;
 *   also causes the text portion to render *before* the image in `BaseCard`.
 * - `"none"` — no tilt effect.
 */
export type Tilt = "left" | "right" | "none";

/**
 * Determines which visual variant a card or section is rendered in.
 *
 * | Variant        | Description                                              |
 * | -------------- | -------------------------------------------------------- |
 * | `"featured"`   | Large hero-style card with photo-frame styling.          |
 * | `"detailed"`   | Full-detail view used on individual content pages.       |
 * | `"list"`       | Compact representation used in lists / grids.            |
 * | `"pricingItem"`| Pricing-oriented layout (e.g. wine-club tier cards).     |
 */
export type itemVariantsUI = "featured" | "detailed" | "list" | "pricingItem";

/**
 * Identifies the kind of content page so that section wrappers can
 * apply the correct CSS class prefix.
 *
 * - `"product-page"` — used on product / wine-club detail pages.
 * - `"editorial-page"` — used on the home page and editorial layouts.
 */
export type contentPageType = "product-page" | "editorial-page";
