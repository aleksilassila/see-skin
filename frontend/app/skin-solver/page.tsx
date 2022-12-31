"use client";
import ProductSelect, {
  useProductSearchState,
} from "./(product-search)/product-search";
import fetchIrritantsCalculation, {
  Ingredient,
} from "../(api)/solver/fetch-irritants-calculation";
import { useQuery } from "react-query";
import IrritantItem from "./irritant-item";
import { Button } from "../(ui)/Button";

function ShowIrritants({ irritants }: { irritants: Ingredient[] }) {
  if (irritants.length === 0) {
    return <div>No irritants found</div>;
  }

  return (
    <div>
      <div>
        The following ingredients are present in more than one product and may
        be the cause of irritation:
      </div>
      <div className="flex flex-col divide-y">
        {irritants.map((irritant, key) => (
          <IrritantItem irritant={irritant} key={key} />
        ))}
      </div>
    </div>
  );
}

export default function SkinSolverPage() {
  const productSelectState = useProductSearchState();

  const {
    data: irritants,
    refetch,
    isRefetching,
    isLoading,
  } = useQuery<Ingredient[]>("irritants", fetch, {
    // refetchOnReconnect: false,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchInterval: false,
    // refetchIntervalInBackground: false,
    enabled: false,
  });

  async function fetch(): Promise<Ingredient[]> {
    return fetchIrritantsCalculation(productSelectState.products);
  }

  return (
    <div>
      <div>Skin solver</div>
      <ProductSelect {...productSelectState} />
      <Button
        onClick={() => refetch()}
        loading={isLoading || isRefetching}
        disabled={productSelectState.products.length < 2}
      >
        Calculate
      </Button>
      {irritants ? <ShowIrritants irritants={irritants} /> : null}
    </div>
  );
}
