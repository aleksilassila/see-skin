import { HTMLAttributes, useState } from "react";
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

export function useInputState() {
  const [value, setValue] = useState("");

  return {
    value,
    setValue,
    onValueChange: (value: string) => setValue(value),
  };
}

export default function Input({
  type = "text",
  onValueChange,
  ...props
}: InputProps) {
  const className = classNames(props.className, {});

  return (
    <input
      {...props}
      value={props.value}
      onChange={(e) => onValueChange(e.target.value)}
      type={type}
      placeholder={props.placeholder}
      className={props.overwriteStyles ? props.className : className}
    />
  );
}
