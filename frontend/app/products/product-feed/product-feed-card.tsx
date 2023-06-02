import Image from "next/image";
import classNames from "classnames";
import { Product } from "../../(api)/api-types";
import { ProductDetailsState } from "../product-details/product-details";
import { PRODUCT_PLACEHOLDER_URL } from "../../config";
import { Button } from "../../(components)/ui/button";

interface Props {
  product: Product;
  showProductDetails: ProductDetailsState["show"];
}

export default function ProductFeedCard({
  product,
  showProductDetails,
}: Props) {
  const className = classNames(
    "w-full sm:w-64 h-96",
    "flex flex-col gap-4 space-between",
    "shadow rounded-md p-2 bg-white"
  );
  return (
    <div className={className}>
      <div className="flex-shrink grow min-h-0 flex justify-center">
        <Image
          width={300}
          height={300}
          quality={50}
          src={product.imageUrl || PRODUCT_PLACEHOLDER_URL}
          alt={product.name}
          className="w-auto h-auto"
        />
      </div>
      <div className="flex-initial">
        <div className="mb-2">
          <div className="font-medium text-sm">
            {product.name.substring(0, 24).trimEnd()}
            {product.name.length >= 24 && "..."}
          </div>
          {product.description && (
            <div className="text-sm mb-2">{product.description}</div>
          )}
          {product.price && (
            <div className="text-zinc-600 text-sm">${product.price}</div>
          )}
        </div>
        <InfoButton onClick={() => showProductDetails(product)} />
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
    <Button
      onClick={onClick}
      intent="secondary"
      size="sm"
      className="w-full text-zinc-800 uppercase"
    >
      Show details
    </Button>
  );
}
