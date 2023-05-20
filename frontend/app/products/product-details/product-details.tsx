import { PropsWithChildren, useState } from "react";
import Image from "next/image";
import { Product } from "../../(api)/api-types";
import classNames from "classnames";
import { PRODUCT_PLACEHOLDER_URL } from "../../config";
import { AnchorButton, XmarkButton } from "../../(components)/ui/button";
import { faAmazon } from "@fortawesome/free-brands-svg-icons";
import { Transition } from "@headlessui/react";

export type ProductDetailsState = ReturnType<typeof useProductDetailsState>;

export function useProductDetailsState() {
  const [state, setState] = useState<{ product?: Product; visible: boolean }>({
    visible: false,
  });
  return {
    product: state.product,
    visible: state.visible,
    show: (product: Product) => setState({ ...state, product, visible: true }),
    close: () => setState({ ...state, visible: false }),
  };
}

interface Props {}

export default function ProductDetails({
  children,
  product,
  ...state
}: ProductDetailsState & PropsWithChildren<Props>) {
  const containerStyle = classNames(
    "w-full max-w-md",
    "absolute right-0 top-0 bottom-0 z-10",
    "bg-white shadow-lg",
    "flex flex-col gap-2"
  );

  return (
    <Transition show={state.visible} appear>
      <Transition.Child
        as="div"
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="bg-[#00000022] absolute inset-0"
          onClick={state.close}
        />
      </Transition.Child>
      <Transition.Child
        enter="ease-in-out duration-200"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="ease-in-out duration-100"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className={containerStyle}
      >
        {!!product && (
          <div className="sticky top-0 p-4">
            <XmarkButton handleClick={state.close} />
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
                {product.category}
              </div>

              <div className="flex space-between">
                <div className="text-lg font-medium text-zinc-900 flex-1">
                  {product.name}
                </div>
                {product.price && (
                  <div className="text-zinc-600">${product.price}</div>
                )}
              </div>
            </div>
            {product.description && (
              <div className="text-zinc-900">{product.description}</div>
            )}
            {!!product.effects.length && (
              <div className="flex w-full">
                <span className="text-zinc-400 font-medium">Effects</span>
                <div className="flex-1 text-right text-sm">
                  {product.effects.join(", ")}
                </div>
              </div>
            )}
            <AnchorButton
              intent="primary"
              disabled={!product.shopPageUrl}
              href={product.shopPageUrl || ""}
              leadingIcon={faAmazon}
              iconStyle={"h-4 mr-2"}
              newTab
            >
              {product.shopPageUrl
                ? "View store page"
                : "No store page available"}
            </AnchorButton>
          </div>
        )}
      </Transition.Child>
    </Transition>
  );
}
