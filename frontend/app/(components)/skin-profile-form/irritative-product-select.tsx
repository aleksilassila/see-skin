import ProductSearch, {
  useProductSearchState,
} from "../../skin-solver/(product-search)/product-search";
import { TabControlsRendered } from "./skin-profile-form";

export function useIrriativeProductSelectState() {
  const productSearchState = useProductSearchState();

  return { productSearchState };
}

interface Props extends ReturnType<typeof useIrriativeProductSelectState> {
  TabControls: TabControlsRendered;
}

export default function IrritativeProductSelect({
  TabControls,
  ...state
}: Props) {
  const canAdvance = state.productSearchState.products.length >= 2;
  return (
    <div className="flex flex-col gap-2">
      <ProductSearch {...state.productSearchState} />

      <div>
        {!canAdvance && (
          <p className="text-xs text-zinc-500">
            Please select at least 2 products
          </p>
        )}
        <TabControls canAdvance={canAdvance} />
      </div>
    </div>
  );
}
