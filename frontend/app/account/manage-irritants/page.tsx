"use client";
import {
  getQueryKey,
  useFetchApi,
  useMutateApiWithBody,
} from "../../(api)/api";
import {
  DeleteSkinProfile,
  GetSkinProfile,
  PostSkinProfile,
} from "../../(api)/api-routes";
import { Button } from "../../(components)/ui/button";
import ListContainer, {
  RemovableProductList,
} from "../../(components)/common/list-container";
import { ProductSearchModal } from "../../(components)/product-search-modal";
import { Product } from "../../(api)/api-types";
import { useQueryClient } from "react-query";
import { CreateSkinProfileFirst } from "./create-skin-profile-first";
import ProductDetails, {
  useProductDetailsState,
} from "../../products/product-details/product-details";
import { useVisibleState } from "../../(components)/ui/drawer";

export default function ManageIrritants() {
  const productSearchModalState = useVisibleState();
  const productDetailsState = useProductDetailsState();

  const { data: skinProfile, ...skinProfileQuery } =
    useFetchApi<GetSkinProfile>(
      "/skin-profile",
      {},
      {
        suspense: false,
      }
    );

  const [mutateProductsPost, mutateProductsDelete] = useProductMutations();

  if (!skinProfile) return <CreateSkinProfileFirst />;

  function removeProduct(product: Product) {
    mutateProductsDelete.mutate({
      productIds: [product.id],
    });
  }

  function addProduct(product: Product) {
    mutateProductsPost.mutate({
      productIds: [product.id],
    });
  }

  const explicitlyAddedProducts = skinProfile.explicitlyAddedProducts || [];
  const productsFromIngredients = [];

  const buttonsLoading =
    mutateProductsDelete.isLoading ||
    mutateProductsPost.isLoading ||
    skinProfileQuery.isLoading;

  return (
    <>
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
        <RemovableProductList
          products={explicitlyAddedProducts}
          handleRemove={removeProduct}
          handleClick={productDetailsState.show}
          buttonsLoading={buttonsLoading}
          loading={skinProfileQuery.isLoading}
        />
        <ListContainer
          heading="Products From Ingredinets"
          empty="Your custom products will appear here."
        />
      </div>
      <ProductDetails {...productDetailsState} />
    </>
  );
}

function useProductMutations(): [
  ReturnType<typeof useMutateApiWithBody<DeleteSkinProfile>>,
  ReturnType<typeof useMutateApiWithBody<PostSkinProfile>>
] {
  const queryClient = useQueryClient();

  const onSuccess = (data: any) =>
    queryClient.setQueryData(getQueryKey("/skin-profile"), data);

  const mutateProductsDelete = useMutateApiWithBody<DeleteSkinProfile>(
    "/skin-profile",
    {
      method: "DELETE",
    },
    {
      onSuccess,
    }
  );

  const mutateProductsPost = useMutateApiWithBody<PostSkinProfile>(
    "/skin-profile",
    {
      method: "POST",
    },
    {
      onSuccess,
    }
  );

  return [mutateProductsPost, mutateProductsDelete];
}
