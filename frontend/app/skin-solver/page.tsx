"use client";
import Input from "../(ui)/Input";
import { useState } from "react";
import { ManageProduct } from "../(api)/manage/products";
import ProductSelect, {
  useProductSelectState,
} from "./(product-search)/product-search";
import Button from "../(ui)/SimpleButton";
import {
  fetchIngredients,
  ManageIngredient,
} from "../(api)/manage/ingredients";
import Api from "../(api)/api";
import fetchIrritants, {
  IngredientGroup,
} from "../(api)/solver/fetch-irritants";
import { useQuery } from "react-query";
import IrritantItem from "./irritant-item";

function ShowIrritants({ irritants }: { irritants: IngredientGroup[] }) {
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
  const productSelectState = useProductSelectState();

  const {
    data: irritants,
    refetch,
    isRefetching,
    isLoading,
  } = useQuery<IngredientGroup[]>("irritants", fetch, {
    // refetchOnReconnect: false,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchInterval: false,
    // refetchIntervalInBackground: false,
    enabled: false,
  });

  async function fetch(): Promise<IngredientGroup[]> {
    return fetchIrritants(productSelectState.products);
  }

  return (
    <div>
      <div>Skin solver</div>
      <ProductSelect productSelectState={productSelectState} />
      <Button
        onButtonClick={() => {
          if (productSelectState.products.length > 0) {
            refetch();
          }
        }}
        text="Calculate"
        active={
          !(
            isLoading ||
            isRefetching ||
            productSelectState.products.length === 0
          )
        }
      />
      {irritants ? <ShowIrritants irritants={irritants} /> : null}
    </div>
  );
}
