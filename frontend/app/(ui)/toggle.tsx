import { HTMLAttributes, PropsWithChildren, useState } from "react";
import classNames from "classnames";
import { getButtonColoring, getButtonSizing } from "./button";

export type ToggleState = ReturnType<typeof useToggleState>;

export type ToggleData = {
  [key: string]: boolean;
};

export function useToggleState<T extends ToggleData>(
  initialData: T,
  multiple = false
) {
  const [values, setValues] = useState<T>(initialData);

  function getFirstActive(): keyof T | undefined {
    return Object.keys(values).find((key) => values[key]);
  }

  function toggle(key: keyof T) {
    return function () {
      setValues((selected) => {
        if (multiple) {
          return {
            ...selected,
            [key]: !selected[key],
          };
        } else {
          return {
            ...initialData,
            [key]: !selected[key],
          };
        }
      });
    };
  }

  return { values, toggle, setValues, getFirstActive };
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  value: boolean;
  toggle: Function;
  overrideStyles?: boolean;
}

export default function Toggle({
  children,
  value,
  toggle,
  overrideStyles = false,
  ...props
}: PropsWithChildren<Props>) {
  const style = classNames(
    props.className,
    getButtonSizing("md"),
    "border rounded-md flex items-center justify-center cursor-pointer",
    {
      "text-zinc-700": !value,
      "border-blue-400 bg-blue-50 text-blue-600": value,
    }
  );
  return (
    <div
      onClick={() => toggle()}
      className={overrideStyles ? props.className : style}
    >
      {children}
    </div>
  );
}
