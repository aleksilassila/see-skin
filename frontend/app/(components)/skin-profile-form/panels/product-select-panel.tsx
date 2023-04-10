import ProductSearch, { useProductSearchState } from "../../product-search";
import { Tab } from "@headlessui/react";

export type ProductSelectPanelState = ReturnType<
  typeof useProductSelectPanelState
>;

export function useProductSelectPanelState() {
  return useProductSearchState();
}

interface Props {}

export default function ProductSelectPanel(
  state: ReturnType<typeof useProductSelectPanelState>
) {
  const canAdvance = state.selected.length >= 1;
  return (
    <Tab.Panel className="flex flex-col gap-2">
      <ProductSearch {...state} />

      {/*<div>*/}
      {/*  {!canAdvance && (*/}
      {/*    <p className="text-xs text-zinc-500">*/}
      {/*      Please select at least one products*/}
      {/*    </p>*/}
      {/*  )}*/}
      {/*</div>*/}
    </Tab.Panel>
  );
}
