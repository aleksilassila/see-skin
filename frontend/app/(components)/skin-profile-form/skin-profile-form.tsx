"use client";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { PropsWithChildren, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import SkinTypeSelect, { useSkinTypeSelectState } from "./skin-type-select";
import IrritativeProductSelect, {
  useIrriativeProductSelectState,
} from "./irritative-product-select";
import Results from "./results";
import fetchIrritantsCalculation, {
  IrritantsCalculationResponse,
} from "../../(api)/solver/fetch-irritants-calculation";
import { useQuery } from "react-query";
import updateUser from "../../(api)/user/update-user";
import { useUser } from "../../user";
import { tabControls } from "./tab-controls";
import IrritativeIngredientSelect from "./irritative-ingredient-select";

export default function SkinProfileForm() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const skinTypeSelectState = useSkinTypeSelectState();
  const productSearchState = useIrriativeProductSelectState();

  const user = useUser();

  const resultsQueryResult = useQuery<IrritantsCalculationResponse>(
    "irritants",
    () =>
      fetchIrritantsCalculation(
        productSearchState.productSearchState.products,
        [],
        skinTypeSelectState.getSkinType()
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

  useEffect(() => {
    if (!!resultsQueryResult.data && user.user) {
      console.log("Updating user irritants");

      updateUser({
        skinType: skinTypeSelectState.getSkinType(),
        irritativeProductIds:
          productSearchState.productSearchState.products.map((p) => p.id),
        irritativeIngredientIds: [],
        irritantIds: resultsQueryResult.data.duplicates.map(
          (d) => d.ingredient.id
        ),
        irritativeClasses: [
          ...new Set(
            resultsQueryResult.data.skinTypeIrritants.flatMap(
              (s) => s.ingredientClasses
            )
          ),
        ],
      });
    }
  }, [resultsQueryResult.data, user]);

  const container = classNames(
    "flex flex-col",
    "bg-white rounded-xl shadow overflow-hidden"
  );

  const TabControlsRendered = tabControls({
    selectedIndex,
    setSelectedIndex,
    resultsQuery: resultsQueryResult,
  });

  return (
    <div className={container}>
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={(toIndex) => {
          if (toIndex < selectedIndex) {
            setSelectedIndex(toIndex);
          }
        }}
      >
        <div className="border-b flex justify-between divide-x font-medium text-sm px-4">
          <h2 id="title" className="py-2">
            Create a skin profile
          </h2>
          <Tab.List className="flex divide-x">
            <TabItem selectedIndex={selectedIndex} tabIndex={0}>
              Select skin type
            </TabItem>
            <TabItem selectedIndex={selectedIndex} tabIndex={1}>
              Select irritative products
            </TabItem>
            <TabItem selectedIndex={selectedIndex} tabIndex={2}>
              Select irritative ingredients
            </TabItem>
            <TabItem selectedIndex={selectedIndex} tabIndex={3}>
              Results
            </TabItem>
          </Tab.List>
        </div>
        <Tab.Panels className="p-2">
          <Tab.Panel>
            <SkinTypeSelect
              {...skinTypeSelectState}
              TabControls={TabControlsRendered}
            />
          </Tab.Panel>
          <Tab.Panel>
            <IrritativeProductSelect
              {...productSearchState}
              TabControls={TabControlsRendered}
            />
          </Tab.Panel>
          <Tab.Panel>
            <IrritativeIngredientSelect
              {...productSearchState}
              TabControls={TabControlsRendered}
            />
          </Tab.Panel>
          <Tab.Panel>
            <Results
              productSelectState={productSearchState}
              useQueryResult={resultsQueryResult}
              TabControls={TabControlsRendered}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

function TabItem(
  props: PropsWithChildren<{
    selectedIndex: number;
    tabIndex: number;
  }>
) {
  const className = classNames("px-2 flex gap-1 items-center", {
    "text-zinc-500": props.selectedIndex < props.tabIndex,
    "cursor-default": props.selectedIndex <= props.tabIndex,
    "cursor-pointer hover:bg-zinc-100": props.selectedIndex > props.tabIndex,
  });

  return (
    <Tab className={className}>
      {props.children}
      {props.selectedIndex >= props.tabIndex && (
        <FontAwesomeIcon icon={faChevronRight} className="h-3" />
      )}
    </Tab>
  );
}
