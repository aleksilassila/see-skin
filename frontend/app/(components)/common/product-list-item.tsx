import { Product } from "../../(api)/api-types";
import Image from "next/image";
import { PRODUCT_PLACEHOLDER_URL } from "../../config";
import { ReactNode } from "react";

interface Props {
  product: Product;
  actionElement?: ReactNode;
}

export function ProductListItem({ product, actionElement }: Props) {
  return (
    <div className="flex items-center justify-between h-24 bg-stone-50 px-4 gap-4">
      <div className="flex-shrink-0 h-20 w-20 flex items-center justify-center overflow-hidden bg-white border border-stone-300 rounded p-1">
        <Image
          src={product.imageUrl || PRODUCT_PLACEHOLDER_URL}
          alt={product.name}
          width={150}
          height={150}
          quality={50}
          className="w-auto h-full"
        />
      </div>
      <div className="min-w-0 flex flex-1 flex-col justify-center">
        <div className="overflow-ellipsis whitespace-nowrap overflow-hidden text-stone-800 font-medium">
          {product.name}
        </div>
        <div className="font-light text-stone-600">{product.brand}</div>
      </div>
      {actionElement && <div className="flex-shrink-0">{actionElement}</div>}
    </div>
  );
}
