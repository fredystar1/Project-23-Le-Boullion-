/**
 * Storyblok bridge: `promo_selection` content type.
 *
 * Renders the currently active site-wide promotion message.  The
 * `active_promo` relation is resolved at fetch time (in
 * `PromotionBar`) so that its content is available inline.
 *
 * Falls back to `"Omaha's Premier Wine Vendor"` when no promotion
 * message is defined.
 *
 * Registered as `"promo_selection"` in the Storyblok component map
 * (see {@link module:storyblok}).
 *
 * @module components-storyblok/PromotionSelection
 */

/**
 * Render the active promotion banner.
 *
 * @param props      - Storyblok component props.
 * @param props.blok - The `promo_selection` blok payload containing the
 *                     `active_promo` resolved relation.
 * @returns A `<div>` with the promotion text, or `null` if no
 *          promotion is active.
 */
export default function PromotionSelection({ blok }: { blok: any }) {
  const promo = blok.active_promo?.[0];

  if (!promo) return null;

  return (
    <div className="promo-banner">
      <p className="promo-text">
        {promo.content?.promo_message ?? "Omaha's Premier Wine Vendor"}
      </p>
    </div>
  );
}
