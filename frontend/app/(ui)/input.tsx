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
}

export default function Input({ type = "text", ...props }: InputProps) {
  const className = classNames({});

  return (
    <input
      value={props.value}
      onChange={(e) => props.onValueChange(e.target.value)}
      type={type}
      placeholder={props.placeholder}
      className={className}
    />
  );
}
