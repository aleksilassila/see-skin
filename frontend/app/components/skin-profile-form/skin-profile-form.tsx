"use client";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { PropsWithChildren, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import SkinTypeSelectPanel, {
  useSkinTypeSelectPanelState,
} from "./skin-type-select-panel";
import ProductSelectPanel, {
  useProductSelectPanelState,
} from "./product-select-panel";
import IrritantResultsPanel, {
  useResultsPanelState,
} from "./irritant-results-panel";
import { useUser } from "../../user";
import { NextTab, PreviousTab } from "./tab-controls";
import IngredientSelectPanel, {
  useIngredientSelectPanelState,
} from "./ingredient-select-panel";

export default function SkinProfileForm() {
  const [currentTab, setCurrentTab] = useState(0);
  const skinTypeState = useSkinTypeSelectPanelState();
  const productsState = useProductSelectPanelState();
  const ingredientsState = useIngredientSelectPanelState();
  const resultsState = useResultsPanelState(
    skinTypeState.getSkinType(),
    productsState.selected,
    []
  );

  const user = useUser();

  function advance() {
    if (currentTab === 2) {
      resultsState.refetchResults().then(() => setCurrentTab(3));
    } else {
      setCurrentTab((t) => t + 1);
    }
  }

  const canAdvance =
    {
      0: !!skinTypeState.skinTypeToggles.getFirstActive(),
      // 1: productsState.selected.length > 0,
      // 2: ingredientsState.selected.length > 0,
    }[currentTab] ?? true;

  const container = classNames(
    "flex flex-col",
    "bg-white rounded-xl shadow overflow-hidden"
  );

  return (
    <div className={container}>
      <Tab.Group
        selectedIndex={currentTab}
        onChange={(toIndex) => {
          if (toIndex < currentTab) {
            setCurrentTab(toIndex);
          }
        }}
      >
        <div className="border-b flex justify-between divide-x font-medium text-sm px-2">
          <Tab.List className="flex divide-x">
            <TabLabel selectedIndex={currentTab} tabIndex={0}>
              Select skin type
            </TabLabel>
            <TabLabel selectedIndex={currentTab} tabIndex={1}>
              Select irritative products
            </TabLabel>
            <TabLabel selectedIndex={currentTab} tabIndex={2}>
              Select irritative ingredients
            </TabLabel>
            <TabLabel hidden selectedIndex={currentTab} tabIndex={3}>
              Results
            </TabLabel>
          </Tab.List>
        </div>
        <Tab.Panels className="p-2">
          <SkinTypeSelectPanel {...skinTypeState} />
          <ProductSelectPanel {...productsState} />
          <IngredientSelectPanel {...ingredientsState} />
          <IrritantResultsPanel {...resultsState} />
        </Tab.Panels>
        <div className="flex gap-2 p-2 justify-center">
          <PreviousTab
            isHidden={currentTab === 0}
            currentTab={currentTab}
            onClick={() => setCurrentTab((p) => p - 1)}
          />
          <NextTab
            isHidden={currentTab === 3}
            currentTab={0}
            isDisabled={!canAdvance}
            isLoading={resultsState.resultsQuery.isFetching ?? false}
            onClick={advance}
          />
        </div>
      </Tab.Group>
    </div>
  );
}

function TabLabel({
  hidden = false,
  ...props
}: PropsWithChildren<{
  selectedIndex: number;
  tabIndex: number;
  hidden?: boolean;
}>) {
  const className = classNames("p-2 flex gap-1 items-center", {
    hidden: hidden,
    "text-blue-500": props.selectedIndex === props.tabIndex,
    "text-zinc-500": props.selectedIndex !== props.tabIndex,
    "cursor-default": props.selectedIndex <= props.tabIndex,
    "cursor-pointer hover:bg-zinc-100": props.selectedIndex > props.tabIndex,
  });

  return (
    <Tab className={className}>
      <div className="rounded-full border h-0 w-0 p-3 flex items-center justify-center">
        {props.tabIndex + 1}
      </div>
      {props.children}
      {props.selectedIndex >= props.tabIndex && (
        <FontAwesomeIcon icon={faChevronRight} className="h-3" />
      )}
    </Tab>
  );
}
