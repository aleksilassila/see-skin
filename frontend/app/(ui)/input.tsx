import { HTMLAttributes } from "react";
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

export default function Input({ type = "text", ...props }: InputProps) {
  const className = classNames(props.className, {});

  return (
    <input
      {...props}
      value={props.value}
      onChange={(e) => props.onValueChange(e.target.value)}
      type={type}
      placeholder={props.placeholder}
      className={props.overwriteStyles ? props.className : className}
    />
  );
}
