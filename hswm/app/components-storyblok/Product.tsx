import { ProductCard } from "../components/ProductCard";

export const Product = ({ blok }: any) => {
  return <ProductCard variant={"detailed"} product={blok} />;
};
