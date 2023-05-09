import { Modal, ModalHeader, ModalState, useModalState } from "./ui/modal";
import { useFetch } from "../(api)/api";
import routes, { ApiTypes } from "../(api)/api-routes";
import Input, { useInputState } from "./ui/input";
import { ReactNode, useEffect } from "react";
import { ProductListItem } from "./common/product-list-item";
import { Button } from "./ui/button";
import { Product } from "../(api)/types";

interface Props {
  buttonText?: string;
  handleProductSelect: (product: Product) => void;
}

export function ProductSearchModal({
  handleProductSelect,
  buttonText = "Add",
  ...modalState
}: ModalState & Props) {
  const inputState = useInputState();
  const shouldFetchProducts = inputState.value.length >= 3;

  const query = useFetch<ApiTypes["findProducts"]>(routes.findProducts, {
    params: {
      name: inputState.value,
      take: 7,
    },
    queryConfig: {
      enabled: shouldFetchProducts,
      suspense: false,
      retry: false,
    },
  });

  useEffect(() => {
    if (shouldFetchProducts) query.refetch();
  }, [inputState.value]);

  return (
    <Modal top={5} {...modalState}>
      <ModalHeader {...modalState}>Search Products</ModalHeader>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Input
            value={inputState.value}
            onValueChange={inputState.setValue}
            placeholder="Search for products..."
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          {query.data?.map((product, key) => (
            <ProductListItem
              product={product}
              key={key}
              actionElement={
                <Button
                  intent="secondary"
                  size="sm"
                  onClick={() => handleProductSelect(product)}
                >
                  {buttonText}
                </Button>
              }
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}
