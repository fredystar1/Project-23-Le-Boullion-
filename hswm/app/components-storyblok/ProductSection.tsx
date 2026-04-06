import { Tilt, contentPageType, itemVariantsUI } from "../lib/styling-types";
import { ProductCard } from "../components/ProductCard";
import { Section } from "../components/Section";

interface ProductSectionProps {
  blok: any;
  variant: itemVariantsUI;
  tilt?: Tilt;
  contentPageType: contentPageType;
  colorSet?: string;
}

const ProductSection = ({
  blok,
  tilt,
  variant,
  contentPageType,
  colorSet,
}: ProductSectionProps) => {
  const itemList = blok.products;
  return (
    <div
      className={`section ${colorSet ? colorSet : "color-set-2"} bg-[var(--surface)]`}
    >
      <Section
        className={`${contentPageType}-content`}
        tilt={tilt}
        variant={variant}
      >
        {...itemList.map((item: any) => (
          <ProductCard
            key={item.uuid}
            product={item.content}
            variant={variant}
            slug={item.full_slug}
            tilt={tilt}
            eyebrowText={blok.eyebrow_text}
          />
        ))}
      </Section>
    </div>
  );
};

export default ProductSection;
