import { Modal, ModalHeader } from "../ui/modal";
import { useVisibleState } from "../ui/drawer";
import Step, { useStepsState } from "../ui/step";
import {
  SkinTypeSelect,
  useSkinTypeSelectState,
} from "./panels/skin-type-select";
import ProductSelect from "./panels/product-select";
import { Product, SkinType } from "../../(api)/api-types";
import { useEffect, useState } from "react";
import SkinProfileResults, {
  useSkinProfileResultsState,
} from "./panels/skin-profile-results";
import { useLocalStorage } from "../../utils/localstorage";
import { fetchApi } from "../../(api)/api";
import { GetProductId } from "../../(api)/api-routes";

export type CreateSkinProfileModalState = ReturnType<
  typeof useCreateSkinProfileModalState
>;

interface CacheState {
  productIds: string[];
  skinType?: SkinType;
  restored: boolean;
}

export function useCreateSkinProfileModalState(defaultIndex: number = 0) {
  const modalState = useVisibleState();
  const stepsState = useStepsState(defaultIndex);

  const skinTypeSelectState = useSkinTypeSelectState();
  const [selectedProducts, setSelectedProducts] = useLocalStorage<Product[]>(
    [],
    "cached-products"
  );
  const resultsState = useSkinProfileResultsState();
  const [returnFromLogin, setReturnFromLogin] = useLocalStorage(
    false,
    "return-from-login"
  );

  useEffect(() => {
    if (
      returnFromLogin &&
      skinTypeSelectState.getSkinType() &&
      selectedProducts.length &&
      !modalState.isVisible &&
      stepsState.currentIndex === 0
    ) {
      setReturnFromLogin(false);

      stepsState.open(1);
      modalState.open();
    }
  }, [returnFromLogin]);

  // const [cachedState, setCachedState] = useLocalStorage<CacheState>(
  //   {
  //     productIds: [],
  //     restored: true,
  //   },
  //   "create-skin-profile-cached"
  // );

  // useEffect(() => setCachedState({ ...cachedState, restored: false }), []);
  //
  // // Restore state
  // useEffect(() => {
  //   async function restoreState() {
  //     const products = await Promise.all(
  //       cachedState.productIds.map((id) =>
  //         fetchApi<GetProductId>(("/products/" + id) as any)
  //       )
  //     );
  //     setSelectedProducts(products);
  //     if (cachedState.skinType)
  //       skinTypeSelectState.setSkinType(cachedState.skinType);
  //   }
  //
  //   if (!cachedState.restored) {
  //     console.log("Restoring state...");
  //     setCachedState({ ...cachedState, restored: true });
  //
  //     restoreState().catch(console.error);
  //   }
  // }, [cachedState]);
  //
  // // Store state
  // const skinType = skinTypeSelectState.getSkinType();
  // useEffect(() => {
  //   const store =
  //     (skinTypeSelectState.getSkinType() || selectedProducts) &&
  //     cachedState.restored;
  //
  //   if (store) {
  //     console.log("Storing state...");
  //     setCachedState({
  //       productIds: selectedProducts.map((product) => product.id),
  //       skinType: skinTypeSelectState.getSkinType(),
  //       restored: true,
  //     });
  //   }
  // }, [selectedProducts, skinType]);

  return {
    modalState,
    stepsState,
    skinTypeSelectState,
    selectedProducts,
    setSelectedProducts,
    returnFromLogin,
    setReturnFromLogin,
    resultsState,
  };
}

export default function CreateSkinProfileModal(
  state: CreateSkinProfileModalState
) {
  function createSkinProfile() {
    state.resultsState.setData({
      skinType: state.skinTypeSelectState.getSkinType(),
      productIds: state.selectedProducts.map((product) => product.id),
    });
    state.stepsState.open(2);
  }

  return (
    <Modal size="none" {...state.modalState}>
      <ModalHeader background={true} {...state.modalState}></ModalHeader>
      <div className="flex flex-col gap-4 max-w-3xl self-center w-full">
        <Step index={0} heading="Select Skin Type" {...state.stepsState}>
          <div className="flex items-center flex-col gap-4">
            <SkinTypeSelect {...state.skinTypeSelectState} />
          </div>
        </Step>
        <Step index={1} heading="Add Irritating Products" {...state.stepsState}>
          <ProductSelect
            products={state.selectedProducts}
            setProducts={state.setSelectedProducts}
            advance={createSkinProfile}
            skinType={state.skinTypeSelectState.getSkinType()}
            handleLogin={() => state.setReturnFromLogin(true)}
          />
        </Step>
        <Step index={2} heading="View Results" {...state.stepsState}>
          <SkinProfileResults {...state.resultsState} />
        </Step>
      </div>
    </Modal>
  );
}
