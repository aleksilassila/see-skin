"use client";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { PropsWithChildren, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import SkinTypeSelectPanel, {
  useSkinTypeSelectPanelState,
} from "./panels/skin-type-select-panel";
import ProductSelectPanel, {
  useProductSelectPanelState,
} from "./panels/product-select-panel";
import IrritantResultsPanel, {
  useResultsPanelState,
} from "./panels/irritant-results-panel";
import { useUser } from "../../user";
import { NextTab, PreviousTab } from "./tab-controls";
import IngredientSelectPanel, {
  useIngredientSelectPanelState,
} from "./panels/ingredient-select-panel";

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
    if (currentTab === 1) {
      if (user.user) {
        resultsState.refetchResults().then(() => setCurrentTab(2));
      } else {
        setCurrentTab(2);
      }
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
        <div className=" flex font-medium text-sm ">
          <Tab.List className="border-b flex-1 px-4 grid grid-cols-3 divide-x">
            <TabLabel selectedIndex={currentTab} tabIndex={0}>
              Skin Type
            </TabLabel>
            <TabLabel selectedIndex={currentTab} tabIndex={1}>
              Irritative Products
            </TabLabel>
            {/*<TabLabel selectedIndex={currentTab} tabIndex={2}>*/}
            {/*  Select irritative ingredients*/}
            {/*</TabLabel>*/}
            <TabLabel selectedIndex={currentTab} tabIndex={2}>
              Results
            </TabLabel>
          </Tab.List>
        </div>
        <Tab.Panels className="p-2">
          <SkinTypeSelectPanel {...skinTypeState} />
          <ProductSelectPanel {...productsState} />
          {/*<IngredientSelectPanel {...ingredientsState} />*/}
          <IrritantResultsPanel {...resultsState} />
        </Tab.Panels>
        <div className="flex gap-2 p-6 justify-center">
          <PreviousTab
            isHidden={currentTab === 0}
            // currentTab={currentTab}
            onClick={() => setCurrentTab((p) => p - 1)}
          />
          <NextTab
            isHidden={currentTab === 2}
            // currentTab={0}
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
  const className = classNames("p-2 flex gap-2 items-center", {
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
        <FontAwesomeIcon icon={faChevronRight} className="h-2.5" />
      )}
    </Tab>
  );
}
