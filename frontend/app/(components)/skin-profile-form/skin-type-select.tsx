"use client";
import { Listbox } from "@headlessui/react";
import { PropsWithChildren, useState } from "react";
import { getButtonColoring, getButtonSizing } from "../../(ui)/Button";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { TabControlsRendered } from "./skin-profile-form";
import { SkinType } from "../../(api)/solver/fetch-irritants-calculation";

const skinTypes = [
  { id: 1, name: "Dry" },
  { id: 2, name: "Normal" },
  { id: 3, name: "Oily" },
  { id: 4, name: "Combination" },
];

export function useSkinTypeSelectState() {
  const [selectedSkinType, setSelectedSkinType] = useState(skinTypes[1]);
  const [isSensitive, setIsSensitive] = useState(false);

  function getSkinType(): SkinType {
    if (!isSensitive) {
      switch (selectedSkinType.name) {
        case "Dry":
          return SkinType.DRY;
        case "Normal":
          return SkinType.NORMAL;
        case "Oily":
          return SkinType.OILY;
        case "Combination":
          return SkinType.COMBINATION;
      }
    } else {
      switch (selectedSkinType.name) {
        case "Dry":
          return SkinType.DRY_SENSITIVE;
        case "Normal":
          return SkinType.NORMAL_SENSITIVE;
        case "Oily":
          return SkinType.OILY_SENSITIVE;
        case "Combination":
          return SkinType.COMBINATION_SENSITIVE;
      }
    }

    return SkinType.NORMAL;
  }

  return {
    selectedSkinType,
    setSelectedSkinType,
    isSensitive,
    setIsSensitive,
    getSkinType,
  };
}

export default function SkinTypeSelect({
  TabControls,
  ...state
}: ReturnType<typeof useSkinTypeSelectState> & {
  TabControls: TabControlsRendered;
}) {
  const buttonClasses = classNames(
    "flex items-center gap-2 justify-between",
    "w-40",
    getButtonColoring(true, {}),
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
    <div className="flex gap-2">
      <Listbox
        value={state.selectedSkinType}
        onChange={state.setSelectedSkinType}
      >
        {({ open }) => (
          <div className="">
            <Label>Select your skin type</Label>
            <Listbox.Button className={buttonClasses}>
              {state.selectedSkinType.name}
              <FontAwesomeIcon
                icon={open ? faChevronUp : faChevronDown}
                className="h-3"
              />
            </Listbox.Button>
            <Listbox.Options className={floaterClasses}>
              {skinTypes.map((skinType) => (
                <Listbox.Option
                  key={skinType.id}
                  value={skinType}
                  className={floaterItemClasses}
                >
                  {skinType.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
      <div>
        <Label>Do you have sensitive skin?</Label>
        <input
          type="checkbox"
          checked={state.isSensitive}
          onChange={() => state.setIsSensitive(!state.isSensitive)}
        />
      </div>
      <TabControls canAdvance={true} />
    </div>
  );
}

function Label(props: PropsWithChildren<{}>) {
  return <p className="text-xs mb-1 text-stone-500">{props.children}</p>;
}
