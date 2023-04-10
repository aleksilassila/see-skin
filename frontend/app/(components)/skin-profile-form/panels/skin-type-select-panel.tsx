"use client";
import { PropsWithChildren, useState } from "react";
import { getButtonColoring, getButtonSizing } from "../../../(ui)/button";
import classNames from "classnames";
import { SkinType } from "../../../(api)/types";
import Toggle, { ToggleData, useToggleState } from "../../../(ui)/toggle";
import { Tab } from "@headlessui/react";

const skinTypes = [
  { id: 1, name: "Dry" },
  { id: 2, name: "Normal" },
  { id: 3, name: "Oily" },
  { id: 4, name: "Combination" },
];

const sensitive = {
  sensitive: false,
} satisfies ToggleData;

const skinTypeToggleData = {
  dry: false,
  normal: false,
  oily: false,
  combination: false,
} satisfies ToggleData;

const skinTypeToggleLabels = {
  dry: "Dry",
  normal: "Normal",
  oily: "Oily",
  combination: "Combination",
};

export type SkinTypeSelectPanelState = ReturnType<
  typeof useSkinTypeSelectPanelState
>;

export function useSkinTypeSelectPanelState() {
  const skinTypeToggles = useToggleState(skinTypeToggleData, false);
  const sensitiveToggle = useToggleState(sensitive, false);
  const [selectedSkinType, setSelectedSkinType] = useState(skinTypes[1]);
  const [isSensitive, setIsSensitive] = useState(false);

  function getSkinType(): SkinType {
    if (!sensitiveToggle.values.sensitive) {
      switch (skinTypeToggles.getFirstActive()) {
        case "dry":
          return SkinType.DRY;
        case "normal":
          return SkinType.NORMAL;
        case "oily":
          return SkinType.OILY;
        case "combination":
          return SkinType.COMBINATION;
      }
    } else {
      switch (skinTypeToggles.getFirstActive()) {
        case "dry":
          return SkinType.DRY_SENSITIVE;
        case "normal":
          return SkinType.NORMAL_SENSITIVE;
        case "oily":
          return SkinType.OILY_SENSITIVE;
        case "combination":
          return SkinType.COMBINATION_SENSITIVE;
      }
    }

    return SkinType.NORMAL;
  }

  return {
    skinTypeToggles,
    sensitiveToggle,
    getSkinType,
  };
}

export default function SkinTypeSelectPanel(
  state: ReturnType<typeof useSkinTypeSelectPanelState>
) {
  const buttonClasses = classNames(
    "flex items-center gap-2 justify-between",
    "w-40",
    getButtonColoring({}),
    getButtonSizing("md")
  );

  const floaterClasses = classNames(
    "absolute z-10 mt-2 w-40",
    "bg-white rounded-xl shadow overflow-hidden",
    "border bg-white font-medium rounded-md",
    "divide-y"
  );

  const floaterItemClasses = classNames(
    "px-2 md:px-4 py-2",
    "cursor-pointer hover:bg-stone-100"
  );

  return (
    <Tab.Panel className="flex flex-col gap-4 items-center">
      <h2 className="text-center text-lg font-medium mt-4 text-zinc-800">
        What is your skin type?
      </h2>
      <div className="grid grid-cols-2 gap-4 w-64">
        <Toggle
          value={state.skinTypeToggles.values.dry}
          toggle={state.skinTypeToggles.toggle("dry")}
        >
          Dry
        </Toggle>
        <Toggle
          value={state.skinTypeToggles.values.normal}
          toggle={state.skinTypeToggles.toggle("normal")}
        >
          Normal
        </Toggle>
        <Toggle
          value={state.skinTypeToggles.values.oily}
          toggle={state.skinTypeToggles.toggle("oily")}
        >
          Oily
        </Toggle>
        <Toggle
          value={state.skinTypeToggles.values.combination}
          toggle={state.skinTypeToggles.toggle("combination")}
        >
          Combination
        </Toggle>
      </div>
      <div className="mb-2 flex flex-col items-center">
        <h2 className="text-sm text-zinc-800 mb-2">
          Do you have a sensitive skin?
        </h2>
        <Toggle
          value={state.sensitiveToggle.values.sensitive}
          toggle={state.sensitiveToggle.toggle("sensitive")}
          className="w-32"
        >
          Sensitive
        </Toggle>
      </div>
    </Tab.Panel>
  );
}

function Label(props: PropsWithChildren<{}>) {
  return <p className="text-xs mb-1 text-stone-500">{props.children}</p>;
}
