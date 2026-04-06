import Section from "./Section";
import { BaseCard } from "./BaseCard";
import Link from "next/link";
import { StoryblokServerRichText } from "@storyblok/react/rsc";

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
