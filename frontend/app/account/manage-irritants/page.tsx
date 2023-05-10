"use client";
import {
  getQueryKey,
  useFetchApi,
  useMutateApiWithParams,
} from "../../(api)/api";
import routes, { ApiTypes } from "../../(api)/api-routes";
import { ProductListItem } from "../../(components)/common/product-list-item";
import { Button } from "../../(components)/ui/button";
import ListContainer from "../../(components)/common/list-container";
import { useModalState } from "../../(components)/ui/modal";
import { ProductSearchModal } from "../../(components)/product-search-modal";
import { Product } from "../../(api)/api-types";
import { useQueryClient } from "react-query";

export default function ManageIrritants() {
  const productSearchModalState = useModalState();

  const { data: skinProfile, ...userQuery } = useFetchApi<
    ApiTypes["skinProfile"]["get"]
  >(routes.skinProfile);

  const [mutateProductsPost, mutateProductsDelete] = useProductMutations();

  if (!skinProfile) return null;

  function removeProduct(product: Product) {
    mutateProductsDelete.mutate({
      irritatingProductIds: [product.id],
    });
  }

  function addProduct(product: Product) {
    mutateProductsPost.mutate({
      irritatingProductIds: [product.id],
    });
  }

  const explicitlyAddedProducts = skinProfile.explicitlyAddedProducts || [];
  const productsFromIngredients = [];

  const buttonsLoading =
    mutateProductsDelete.isLoading ||
    mutateProductsPost.isLoading ||
    userQuery.isLoading;

  return (
    <div className="m-auto max-w-md lg:max-w-xl xl:max-w-2xl">
      <div className="flex justify-between items-start flex-col gap-2 mb-4 lg:flex-row lg:items-end">
        <h1 className="font-bold text-xl">Mange Your Irritants</h1>
        <div className="flex gap-2">
          <Button size="sm" disabled>
            Add From Ingredients
          </Button>
          <Button
            size="sm"
            intent="primary"
            onClick={() => productSearchModalState.open()}
          >
            Add Products
          </Button>
          <ProductSearchModal
            handleProductSelect={(product) => addProduct(product)}
            handleProductUnselect={(product) => removeProduct(product)}
            selectedProducts={explicitlyAddedProducts}
            buttonProps={{ disabled: buttonsLoading }}
            {...productSearchModalState}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ListContainer
          heading="Products"
          empty="Your irritative products will appear here."
        >
          {explicitlyAddedProducts.length &&
            explicitlyAddedProducts.map((product, key) => (
              <ProductListItem
                product={product}
                key={key}
                actionElement={
                  <Button
                    intent="secondary"
                    size="sm"
                    onClick={() => removeProduct(product)}
                    loading={buttonsLoading}
                  >
                    Remove
                  </Button>
                }
              />
            ))}
        </ListContainer>
        <ListContainer
          heading="Products From Ingredinets"
          empty="Your custom products will appear here."
        />
      </div>
    </div>
  );
}

function useProductMutations() {
  const queryClient = useQueryClient();

  const onSuccess = (data: any) =>
    queryClient.setQueryData(getQueryKey(routes.skinProfile), data);

  const mutateProductsDelete = useMutateApiWithParams<
    ApiTypes["skinProfile"]["delete"]
  >(
    routes.skinProfile,
    {
      method: "DELETE",
    },
    {
      onSuccess,
    }
  );

  const mutateProductsPost = useMutateApiWithParams<
    ApiTypes["skinProfile"]["post"]
  >(
    routes.skinProfile,
    {
      method: "POST",
    },
    {
      onSuccess,
    }
  );

  return [mutateProductsPost, mutateProductsDelete];
}
