import { Tab } from "@headlessui/react";
import IngredientSearch, {
  useIngredientSearchState,
} from "../../ingredient-search";

export type IngredientSelectPanelState = ReturnType<
  typeof useIngredientSelectPanelState
>;

export function useIngredientSelectPanelState() {
  return useIngredientSearchState();
}

interface Props {}

export default function IngredientSelectPanel(
  state: IngredientSelectPanelState
) {
  return (
    <Tab.Panel>
      <IngredientSearch {...state} />
    </Tab.Panel>
  );
}
