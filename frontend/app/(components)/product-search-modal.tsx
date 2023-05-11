import { Modal, ModalHeader, ModalState } from "./ui/modal";
import { useFetchApi } from "../(api)/api";
import routes, { ApiTypes } from "../(api)/api-routes";
import Input, { useInputState } from "./ui/input";
import { useEffect } from "react";
import { ProductListItem } from "./common/product-list-item";
import { Button, ButtonProps } from "./ui/button";
import { Product } from "../(api)/api-types";

interface Props {
  buttonText?: string;
  handleProductSelect: (product: Product) => void;
  handleProductUnselect: (product: Product) => void;
  selectedProducts: Product[];
  buttonProps?: ButtonProps<any> | any;
}

export function ProductSearchModal({
  handleProductSelect,
  handleProductUnselect,
  selectedProducts,
  buttonProps,
  ...modalState
}: ModalState & Props) {
  const inputState = useInputState();
  const shouldFetchProducts = inputState.value.length >= 3;

  const query = useFetchApi<ApiTypes["findProducts"]>(
    routes.findProducts,
    {
      params: {
        name: inputState.value,
        take: 7,
      },
    },
    {
      enabled: shouldFetchProducts,
      suspense: false,
      retry: false,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (shouldFetchProducts) query.refetch();
  }, [inputState.value]);

  const selectedProductIds = selectedProducts.map((product) => product.id);

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
          {query.data?.map((product, key) => {
            const isSelected = selectedProductIds.includes(product.id);
            return (
              <ProductListItem
                product={product}
                key={key}
                actionElement={
                  <Button
                    intent="secondary" //{isSelected ? "danger" : "secondary"}
                    size="sm"
                    onClick={() =>
                      isSelected
                        ? handleProductUnselect(product)
                        : handleProductSelect(product)
                    }
                    {...buttonProps}
                  >
                    {isSelected ? "Remove" : "Add"}
                  </Button>
                }
              />
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
