"use client";
import fetchIrritantsCalculation, {
  IrritantsCalculationResponse,
} from "../../(api)/solver/fetch-irritants-calculation";
import { useQuery, UseQueryResult } from "react-query";
import { useProductSelectPanelState } from "./product-select-panel";
import { useUser } from "../../user";
import LoginButton from "../../(navigation)/LoginButton";
import { Tab } from "@headlessui/react";
import { Ingredient, Product, SkinType } from "../../(api)/types";
import updateUser from "../../(api)/user/update-user";
import { useEffect } from "react";

export function useResultsPanelState(
  skinType: SkinType,
  selectedProducts: Product[],
  selectedIngredients: Ingredient[]
) {
  const resultsQuery = useQuery<IrritantsCalculationResponse>(
    "irritants",
    () =>
      fetchIrritantsCalculation(
        skinType,
        selectedProducts,
        selectedIngredients
      ),
    {
      // refetchOnReconnect: false,
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      enabled: false,
    }
  );

  useEffect(() => console.log(resultsQuery), [resultsQuery]);

  function updateUserIrritants() {
    if (!resultsQuery.data) return;
    return updateUser({
      skinType,
      irritativeProductIds: selectedProducts.map((p) => p.id),
      irritativeIngredientIds: selectedIngredients.map((i) => i.id),
      irritantIds: resultsQuery.data.duplicates.map((d) => d.ingredient.id),
      irritativeClasses: [
        ...new Set(
          resultsQuery.data.skinTypeIrritants.flatMap(
            (s) => s.ingredientClasses
          )
        ),
      ],
    });
  }

  return {
    resultsQuery,
    refetchResults: () => resultsQuery.refetch(),
    updateUserIrritants,
  };
}

interface Props {
  productSelectState: ReturnType<typeof useProductSelectPanelState>;
  useQueryResult: UseQueryResult<IrritantsCalculationResponse>;
}

export default function IrritantResultsPanel(
  state: ReturnType<typeof useResultsPanelState>
) {
  const { data, isLoading, isError } = state.resultsQuery;
  const user = useUser();

  if (isError || !data) {
    return <Tab.Panel>Could not fetch irritants.</Tab.Panel>;
  }

  if (isLoading) {
    return <Tab.Panel>Loading...</Tab.Panel>;
  }

  const duplicates = (
    <div>
      <div>
        The following ingredients are present in more than one product and may
        be the cause of irritation:
      </div>
      {data.duplicates.map((irritant, key) => (
        <div key={key}>
          <div>{irritant.ingredient.name}</div>
          <div>This product was present in the following products:</div>
          {irritant.products.map((product, key) => (
            <div key={key}>{product.name}</div>
          ))}
        </div>
      ))}
    </div>
  );

  const irritants = (
    <div>
      <div>
        The following ingredients were present in some of your products and are
        known to cause irritation:
      </div>
      {data.skinTypeIrritants.map((irritant, key) => (
        <div key={key}>
          <div className="font-medium">{irritant.ingredient.name}</div>
          <div>
            Ingredient classes:{" "}
            {irritant.ingredientClasses.map((ingredientClass, key) => (
              <div key={key}>{ingredientClass}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const results =
    data.duplicates.length + data.skinTypeIrritants.length === 0 ? (
      <div>Did not find irritants. Nice</div>
    ) : (
      <>
        {data.duplicates.length && duplicates}
        {data.skinTypeIrritants.length && irritants}
      </>
    );
  return (
    <Tab.Panel>
      {results}
      {user.user === false && (
        <div>
          <div>
            Log in to browse skin products that are compatible with your skin!
          </div>
          <LoginButton />
        </div>
      )}
    </Tab.Panel>
  );
}