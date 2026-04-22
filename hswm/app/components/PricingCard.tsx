/**
 * Pricing card renderer — displays a set of Storyblok product stories
 * as pricing-tier cards inside a {@link Section} wrapper.
 *
 * Used on pages like the Wine Club where multiple membership tiers are
 * shown side-by-side.  Each tier is rendered via {@link BaseCard} in the
 * `"pricingItem"` variant.
 *
 * @module PricingCard
 */

import Section from "./Section";
import { BaseCard } from "./BaseCard";
import Link from "next/link";
import { StoryblokServerRichText } from "@storyblok/react/rsc";

/**
 * Render an array of Storyblok product stories as pricing-tier cards.
 *
 * @param blok - An array of Storyblok story objects. Each story is
 *               expected to have `content.product_name`,
 *               `content.image` (or `content.product_image`),
 *               `content.price`, and `content.product_description`.
 * @returns A `<Section>` containing one `BaseCard` per tier, or an empty
 *          section if the array is empty.
 */
const PricingCard = (blok: any) => {
  return (
    <Section variant="pricingItem">
      {blok.length > 0 && blok.map((tier: any) => {
        const content = tier.content;
        return (
          <BaseCard
            key={tier.uuid}
            title={content.product_name}
            image={{
              filename: content.image?.filename || content.product_image?.filename,
              alt: content.image?.meta_data?.alt || content.product_image?.meta_data?.alt,
            }}
            cardClassName="pricing-item"
            imageClassName="pricing-item-image"
            mediaClassName="product-media"
            priceNode={content.price ? <p className="product-price">${content.price}</p> : null}
            descriptionNode={content.product_description ? (
              <div className="card-body-text">
                <StoryblokServerRichText doc={content.product_description} />
              </div>
            ) : null}
            actionNode={tier.full_slug ? (
              <div className="rect-button-container color-set-1">
                <Link className="rect-button-top" href={tier.full_slug}>
                  Explore {content.product_name}
                </Link>
              </div>
            ) : null}
          />
        );
      })}
    </Section>
  );
};

export default PricingCard;
