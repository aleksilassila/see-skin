import { Product } from "../../(api)/types";
import Image from "next/image";
import { PRODUCT_PLACEHOLDER_URL } from "../../config";
import { Button } from "../ui/button";

interface Props {
  product: Product;
}

export function ProductListItem({ product }: Props) {
  return (
    <div className="flex items-center justify-between h-24 bg-stone-50 px-4 gap-2">
      <div className="flex gap-2">
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
        <div>{product.name}</div>
      </div>
      <div>
        <Button intent="secondary" size="sm">
          Remove
        </Button>
      </div>
    </div>
  );
}
