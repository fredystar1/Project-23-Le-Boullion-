import { ProductCard } from "./ProductCard";

export const Product = ({ blok }: any) => {
  return <ProductCard variant={"detailed"} product={blok} />;
};
