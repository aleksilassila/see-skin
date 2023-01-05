import Image from "next/image";
import classNames from "classnames";
import { Product } from "../../(api)/types";
import { ProductDetailsState } from "../(product-details)/product-details";
import { PRODUCT_PLACEHOLDER_URL } from "../../config";

interface Props {
  product: Product;
  setProductDetails: ProductDetailsState["setProduct"];
}

export default function ProductItem({ product, setProductDetails }: Props) {
  const className = classNames(
    "w-52 h-72",
    "flex flex-col",
    "w-full h-full",
    "border rounded-md p-2"
  );
  return (
    <div className={className}>
      <div className="flex-shrink grow min-h-0 flex justify-center">
        <Image
          width={200}
          height={200}
          quality={50}
          src={product.imageUrl || PRODUCT_PLACEHOLDER_URL}
          alt={product.name}
          className="w-auto h-auto"
        />
      </div>
      <div className="flex-initial">
        <div className="font-medium text-sm mb-2">{product.name}</div>
        {product.description && (
          <div className="text-sm mb-2">{product.description}</div>
        )}
        <InfoButton onClick={() => setProductDetails(product)} />
      </div>
    </div>
  );
}

function InfoButton({ onClick }: { onClick: () => void }) {
  const className = classNames(
    "border-2 border-black text-sm font-medium rounded",
    "hover:bg-black hover:text-white",
    "p-1 w-full block text-center cursor-pointer"
  );
  return (
    <div onClick={onClick} className={className}>
      SHOW DETAILS
    </div>
  );
}
