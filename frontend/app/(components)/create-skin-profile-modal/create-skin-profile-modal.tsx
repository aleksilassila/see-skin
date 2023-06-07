import { Modal, ModalHeader } from "../ui/modal";
import { useVisibleState } from "../ui/drawer";
import Step, { useStepsState } from "../ui/step";
import {
  SkinTypeSelect,
  useSkinTypeSelectState,
} from "./panels/skin-type-select";
import ProductSelect from "./panels/product-select";
import { Product } from "../../(api)/api-types";
import { useEffect } from "react";
import SkinProfileResults, {
  useSkinProfileResultsState,
} from "./panels/skin-profile-results";
import { useLocalStorage } from "../../utils/localstorage";
import { useUser } from "../../user";

export type CreateSkinProfileModalState = ReturnType<
  typeof useCreateSkinProfileModalState
>;

export function useCreateSkinProfileModalState(defaultIndex: number = 0) {
  const session = useUser();

  const modalState = useVisibleState();
  const stepsState = useStepsState(defaultIndex);

  const skinTypeSelectState = useSkinTypeSelectState();
  const [selectedProducts, setSelectedProducts] = useLocalStorage<Product[]>(
    [],
    "cached-products"
  );
  const resultsState = useSkinProfileResultsState();

  useEffect(() => {
    if (
      session.openSkinProfileCreation &&
      skinTypeSelectState.getSkinType() &&
      selectedProducts.length &&
      !modalState.isVisible &&
      stepsState.currentIndex === 0
    ) {
      session.setOpenSkinProfileCreation(false);

      stepsState.open(1);
      modalState.open();
    }
  }, [session]);

  return {
    modalState,
    stepsState,
    skinTypeSelectState,
    selectedProducts,
    setSelectedProducts,
    resultsState,
    handleFormInterruption: () => session.setOpenSkinProfileCreation(true),
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
            handleLogin={state.handleFormInterruption}
          />
        </Step>
        <Step index={2} heading="View Results" {...state.stepsState}>
          <SkinProfileResults {...state.resultsState} />
        </Step>
      </div>
    </Modal>
  );
}
