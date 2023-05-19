import { Modal, ModalHeader, ModalState } from "./ui/modal";
import { useFetchApi, useMutateApiWithParams } from "../(api)/api";
import routes, { ApiTypes } from "../(api)/api-routes";
import Input, { useInputState } from "./ui/input";
import { useEffect } from "react";
import { ProductListItem } from "./common/product-list-item";
import { Button, ButtonProps, XmarkButton } from "./ui/button";
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
  const shouldDisplayProducts = inputState.value.length >= 3;
  const shouldFetchProducts = shouldDisplayProducts && inputState.didStopTyping;

  const findQuery = useFetchApi<ApiTypes["getProducts"]>(
    routes.getProducts,
    {
      params: {
        name: inputState.value,
        take: 7,
      },
    },
    {
      enabled: false,
      suspense: false,
      retry: false,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (shouldFetchProducts) {
      findQuery.refetch().then();
    }
  }, [inputState.didStopTyping]);

  const selectedProductIds = selectedProducts.map((product) => product.id);

  const products = findQuery.data || [];

  return (
    <Modal top={5} {...modalState}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Input
            value={inputState.value}
            onValueChange={inputState.setValue}
            placeholder="Search for products..."
            className="flex-1"
          />
          <XmarkButton handleClick={modalState.close} />
        </div>
        {shouldDisplayProducts && products.length ? (
          <div className={findQuery.isRefetching ? "opacity-70" : ""}>
            {products.map((product, key) => {
              const isSelected = selectedProductIds.includes(product.id);
              return (
                <ProductListItem
                  product={product}
                  key={key}
                  actionElement={
                    <Button
                      intent="secondary"
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
        ) : null}
      </div>
    </Modal>
  );
}

function Heading() {
  return <div></div>;
}
