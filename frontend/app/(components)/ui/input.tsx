import { HTMLAttributes, useEffect, useState } from "react";
import classNames from "classnames";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: boolean;
  errorText?: string;
  overwriteStyles?: boolean;
}

export function useInputState<T extends object = {}>(
  updateFn: (value: string) => T = () => ({} as T)
) {
  const [value, setValue] = useState("");
  const [didStopTyping, setDidStopTyping] = useState(false);

  useEffect(() => {
    setDidStopTyping(false);
    const lastValue = value;

    const timer = setTimeout(() => {
      if (lastValue === value) {
        setDidStopTyping(true);
      }
    }, 900);
    return () => clearTimeout(timer);
  }, [value]);

  const toAdd = updateFn(value);

  return {
    value,
    setValue,
    onValueChange: (value: string) => setValue(value),
    didStopTyping,
    ...toAdd,
  };
}

export default function Input({
  type = "text",
  onValueChange,
  overwriteStyles,
  ...props
}: InputProps) {
  const className = classNames(
    props.className,
    "rounded-md border border-stone-300",
    "px-2 py-0.5 outline-offset-1",
    "focus:bg-stone-50",
    "shadow-sm"
  );

  return (
    <input
      {...props}
      value={props.value}
      onChange={(e) => onValueChange(e.target.value)}
      type={type}
      placeholder={props.placeholder}
      className={overwriteStyles ? props.className : className}
    />
  );
}
