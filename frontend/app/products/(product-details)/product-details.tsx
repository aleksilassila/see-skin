import { PropsWithChildren, useState } from "react";
import Image from "next/image";
import { Product } from "../../(api)/types";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faXmark } from "@fortawesome/free-solid-svg-icons";
import { PRODUCT_PLACEHOLDER_URL } from "../../config";
import { AnchorButton, Button } from "../../(ui)/button";

export type ProductDetailsState = ReturnType<typeof useProductDetailsState>;

export function useProductDetailsState() {
  const [product, setProduct] = useState<Product | null>(null);
  return { product, setProduct };
}

interface Props {}

export default function ProductDetails({
  children,
  product,
  ...state
}: ProductDetailsState & PropsWithChildren<Props>) {
  if (product === null) {
    return null;
  }

  const containerStyle = classNames(
    "w-full max-w-md",
    "absolute right-0 top-0 bottom-0 z-10",
    "bg-white shadow-lg p-4",
    "flex flex-col gap-2"
  );

  function close() {
    state.setProduct(null);
  }

  return (
    <>
      <div className="bg-[#00000022] absolute inset-0" onClick={close} />
      <div className={containerStyle}>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={close}
          className="h-5 text-zinc-500 cursor-pointer p-1 self-start"
        />
        <div className="rounded overflow-hidden flex justify-center">
          <Image
            width={200}
            height={200}
            quality={50}
            src={product.imageUrl || PRODUCT_PLACEHOLDER_URL}
            alt={product.name}
            className="w-auto h-auto"
          />
        </div>
        <div>
          <div className="uppercase font-medium text-xs text-zinc-400">
            cleanser
          </div>
          <div className="text-lg font-medium text-zinc-900">
            {product.name}
          </div>
        </div>
        {product.description && (
          <div className="text-zinc-900">{product.description}</div>
        )}
        <AnchorButton
          intent="primary"
          disabled={!product.shopPageUrl}
          href={product.shopPageUrl || ""}
          newTab
        >
          {product.shopPageUrl ? "View store page" : "No store page available"}
        </AnchorButton>
      </div>
    </>
  );
}
