import Image from "next/image";
import classNames from "classnames";
import { Product } from "../../(api)/types";

const productPlaceholderUrl =
  "https://foodinnetwork.websites.co.in/touche/img/product-placeholder.png";

interface Props {
  product: Product;
}

export default function ProductItem({ product }: Props) {
  const className = classNames(
    "flex flex-col",
    "w-full h-full",
    "border rounded-md p-2"
  );
  return (
    <div className={className}>
      <Image
        width={200}
        height={200}
        quality={50}
        src={product.imageUrl || productPlaceholderUrl}
        alt={product.name}
        className="flex-1"
      />
      <div className="flex-initial">
        <div className="font-medium text-sm mb-2">{product.name}</div>
        {product.description && (
          <div className="text-sm mb-2">{product.description}</div>
        )}
        <BuyButton href={product.shopPageUrl} />
      </div>
    </div>
  );
}

function BuyButton({ href }: { href?: string }) {
  const className = classNames(
    "border-2 border-black text-sm font-medium rounded",
    "hover:bg-black hover:text-white",
    "p-1 w-full block text-center cursor-pointer"
  );
  return (
    <a href={href} target="_blank" className={className} rel="noreferrer">
      SHOW DETAILS
    </a>
  );
}
