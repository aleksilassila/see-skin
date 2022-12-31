"use client";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import SkinTypeSelect, { useSkinTypeSelectState } from "./skin-type-select";
import IrritativeProductSelect, {
  useIrriativeProductSelectState,
} from "./irritative-product-select";
import { Button } from "../../(ui)/Button";
import Results from "./results";
import fetchIrritantsCalculation, {
  Ingredient,
  IrritantsCalculationResponse,
} from "../../(api)/solver/fetch-irritants-calculation";
import { useQuery, UseQueryResult } from "react-query";

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

export type TabControlsRendered = ReturnType<typeof tabControls>;

function tabControls({
  selectedIndex,
  setSelectedIndex,
  resultsQuery,
}: {
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  resultsQuery: UseQueryResult<any>;
}) {
  return function TabControls({ canAdvance }: { canAdvance: boolean }) {
    const nextButton = (
      <Button
        size="sm"
        disabled={!canAdvance}
        loading={resultsQuery.isLoading}
        onClick={() => {
          if (selectedIndex === 1 && !resultsQuery.isLoading) {
            resultsQuery
              .refetch()
              .then(() => setSelectedIndex((prev) => prev + 1))
              .catch();
          } else {
            setSelectedIndex((prev) => prev + 1);
          }
        }}
      >
        Next
      </Button>
    );
    const previousButton = (
      <Button size="sm" onClick={() => setSelectedIndex((prev) => prev - 1)}>
        Previous
      </Button>
    );

    if (selectedIndex === 0) {
      return nextButton;
    } else if (selectedIndex === 2) {
      return previousButton;
    }

    return (
      <div className="flex gap-2">
        {previousButton}
        {nextButton}
      </div>
    );
  };
}
export default function SkinProfileForm() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const skinTypeSelectState = useSkinTypeSelectState();
  const productSearchState = useIrriativeProductSelectState();

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
