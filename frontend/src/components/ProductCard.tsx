interface ProductInterface {
  id: number;
  productName: string;
  productDescription: string;
  productImageURL: string;
}

const ProductCard = ({
  id,
  productName,
  productDescription,
  productImageURL,
}: ProductInterface) => {
  return (
    <div className="outline-solid outline-red-600 rounded">
      <img src={productImageURL} alt={productDescription} />
      <p>{id}</p>
      <p>{productName}</p>
      <p>{productDescription}</p>
    </div>
  );
};

export default ProductCard;
