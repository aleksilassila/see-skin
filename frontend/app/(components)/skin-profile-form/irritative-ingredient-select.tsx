import { PropsWithChildren } from "react";
import { TabControlsRendered } from "./tab-controls";

export type IrritativeIngredientSelectState = ReturnType<
  typeof useIrritativeIngredientSelectState
>;

export function useIrritativeIngredientSelectState() {
  return {};
}

interface Props {
  TabControls: TabControlsRendered;
}

export default function IrritativeIngredientSelect({
  children,
  ...state
}: IrritativeIngredientSelectState & PropsWithChildren<Props>) {
  return <div>{children}</div>;
}
