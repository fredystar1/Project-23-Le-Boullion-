import ProductCard from "../components/ProductCard";
import Section from "../components/Section";
import { contentPageType, itemVariantsUI, Tilt } from "../lib/styling-types";

interface MultiProductProps {
  blok: any;
  variant: itemVariantsUI;
  tilt?: Tilt;
  contentPageType: contentPageType;
  colorSet?: string;
}
const MultiProduct = ({
  blok,
  variant,
  tilt,
  contentPageType,
  colorSet,
}: MultiProductProps) => {
  const productList = blok.product_list;
  return (
    <Section
      className={`${contentPageType}-content`}
      tilt={tilt}
      variant={variant}
      colorSet={colorSet ? colorSet : "color-set-2"}
    >
      {...productList.map((product: any) => (
        <ProductCard
          key={product.uuid}
          product={product.content}
          variant={variant}
          slug={product.full_slug}
          tilt={tilt}
          eyebrowText={blok.eyebrow_text}
        />
      ))}
    </Section>
  );
};

export default MultiProduct;
