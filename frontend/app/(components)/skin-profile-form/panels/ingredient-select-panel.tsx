import { PropsWithChildren } from "react";
import { Tab } from "@headlessui/react";
import { useRemoteSelectState } from "../../../(hooks)/remote-select";
import { Ingredient } from "../../../(api)/types";
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
