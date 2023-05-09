import { Product } from "../../(api)/types";
import Image from "next/image";
import { PRODUCT_PLACEHOLDER_URL } from "../../config";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface Props {
  product: Product;
  actionElement?: ReactNode;
}

export function ProductListItem({ product, actionElement }: Props) {
  return (
    <div className="flex items-center justify-between h-24 bg-stone-50 px-4 gap-2">
      <div className="flex gap-2 min-w-0">
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
          <div className="font-medium text-sm text-stone-700">
            {product.brand}
          </div>
          <div className="overflow-ellipsis whitespace-nowrap overflow-hidden">
            {product.name}
          </div>
        </div>
      </div>
      {actionElement && <div className="flex-shrink-0">{actionElement}</div>}
    </div>
  );
}
