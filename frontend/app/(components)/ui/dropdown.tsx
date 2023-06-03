import { Listbox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AnchorButton, ButtonProps } from "./button";
import {
  faChevronDown,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type DropdownItem = {
  id?: any;
  value: string;
  display?: string;
  disabled?: boolean;
  leadingIcon?: IconDefinition;
};

export type DropdownItems = DropdownItem[];

export type DropdownState = ReturnType<typeof useDropdownState>;

export function useDropdownState(
  items: DropdownItems,
  defaultItem?: DropdownItem
) {
  const [selectedItem, setSelectedItem] = useState<DropdownItem>(
    defaultItem || items[0]
  );

  return {
    items,
    selectedItem,
    setSelectedItem,
  };
}

export default function Dropdown({
  items,
  selectedItem,
  setSelectedItem,
  ...props
}: DropdownState & ButtonProps<any>) {
  const containerStyle = classNames(
    "rounded-md drop-shadow-sm cursor-pointer",
    "border bg-white divide-y absolute right-0 mt-2 w-56 overflow-hidden"
  );

  const itemStyle = classNames(
    "py-2 hover:bg-stone-100 flex gap-2 items-center font-medium",
    {
      sm: { "text-sm px-2 md:px-4": true },
      md: { "px-3 md:px-4": true },
      lg: { "px-2 md:px-8": true },
    }[props.size || "md"]
  );

  return (
    <Listbox
      value={selectedItem}
      onChange={setSelectedItem}
      as="div"
      className="relative"
    >
      <Listbox.Button as={Fragment}>
        <AnchorButton
          href=""
          trailingIcon={faChevronDown}
          leadingIcon={selectedItem.leadingIcon}
          {...props}
        >
          {selectedItem.display || selectedItem.value}
        </AnchorButton>
      </Listbox.Button>
      <Listbox.Options className={containerStyle}>
        {items.map((item) => (
          <Listbox.Option
            key={item.id || item.value}
            value={item}
            disabled={item.disabled}
            className={itemStyle}
          >
            {item.leadingIcon ? (
              <FontAwesomeIcon className="h-3.5" icon={item.leadingIcon} />
            ) : null}
            {item.display || item.value}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
