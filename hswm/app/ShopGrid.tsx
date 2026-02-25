import React from "react";
import ProductCard from "./ProductCard";

type Product = {
  id: number;
  productName: string;
  productDescription: string;
  productImageURL: string;
};

const productList: Product[] = [
  {
    id: 0,
    productName: "Wine 1",
    productDescription: "A yummy wine",
    productImageURL: "/image_placeholder_800px.png",
  },
  {
    id: 1,
    productName: "Wine 2",
    productDescription: "A yummy wine",
    productImageURL: "/image_placeholder_800px.png",
  },
  {
    id: 2,
    productName: "Wine 3",
    productDescription: "A yummy wine",
    productImageURL: "/image_placeholder_800px.png",
  },
  {
    id: 3,
    productName: "Wine 4",
    productDescription: "A yummy wine",
    productImageURL: "/image_placeholder_800px.png",
  },
  {
    id: 4,
    productName: "Wine 5",
    productDescription: "A yummy wine",
    productImageURL: "/image_placeholder_800px.png",
  },
  {
    id: 5,
    productName: "Wine 6",
    productDescription: "A yummy wine",
    productImageURL: "/image_placeholder_800px.png",
  },
  {
    id: 6,
    productName: "Wine 7",
    productDescription: "A yummy wine",
    productImageURL: "/image_placeholder_800px.png",
  },
  {
    id: 7,
    productName: "Wine 8",
    productDescription: "A yummy wine",
    productImageURL: "/image_placeholder_800px.png",
  },
  {
    id: 8,
    productName: "Wine 9",
    productDescription: "A yummy wine",
    productImageURL: "/image_placeholder_800px.png",
  },
];

const ShopGrid = () => {
  return (
    <div className="m-4 grid grid-cols-4 gap-4">
      {productList.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ShopGrid;
