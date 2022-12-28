"use client";
import React, { HTMLAttributes, MouseEvent } from "react";
import classNames from "classnames";

interface ButtonProps<T extends HTMLElement> extends HTMLAttributes<T> {
  disabled?: boolean;
  icon?: string;
  intent?: "none" | "primary" | "secondary" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  minimal?: boolean;

  loading?: boolean;
  onClick?: (event: MouseEvent<T>) => void;

  href: string;
}

function getColoring(
  active: boolean,
  {
    size = "md",
    intent = "none",
    ...props
  }: Pick<ButtonProps<any>, "size" | "intent" | "className" | "minimal">
) {
  return classNames(props.className, "font-medium rounded-md", {
    "cursor-pointer": active,
    ...{
      none: {
        "border bg-white text-black": true,
        "hover:bg-stone-100": active,
        "active:bg-stone-200": active,
        "focus-within:ring": active,
      },
      primary: {
        "bg-blue-400": true,
        "hover:bg-blue-500": active,
        "active:bg-blue-500": active,
        "focus-within:ring ": active,
      },
      secondary: {
        "border bg-white text-black": true,
        "hover:bg-stone-100": active,
        "active:bg-stone-200": active,
        "focus-within:ring": active,
      },
      warning: {
        "bg-orange-400": true,
        "hover:bg-orange-200": active,
        "active:bg-orange-300": active,
        "focus-within:ring": active,
      },
      danger: {
        "bg-red-500 border": true,
        "hover:bg-red-600": active,
        "active:bg-red-700": active,
        "focus-within:ring": active,
      },
    }[intent],
    ...{
      sm: { "text-sm h-8 px-2 md:px-4": true },
      md: { "h-10 px-2 md:px-4": true },
      lg: { "h-12 px-2 md:px-8": true },
    }[size],
  });
}

export function Button({
  disabled = false,
  loading = false,
  intent = "none",
  size = "md",
  minimal = false,
  onClick = () => {},
  ...props
}: Omit<ButtonProps<HTMLButtonElement>, "href">) {
  const active = !disabled && !loading;
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (disabled) return;

    onClick(e);
  };

  const className = classNames(
    getColoring(active, {
      ...props,
      intent,
      size,
      minimal,
    })
  );

  return (
    <button
      {...props}
      type="button"
      disabled={!active}
      className={className}
      onClick={handleClick}
    >
      {loading ? "Button loading..." : props.children}
    </button>
  );
}

export function AnchorButton({
  disabled = false,
  intent = "none",
  size = "md",
  minimal = false,
  ...props
}: Omit<ButtonProps<HTMLAnchorElement>, "onClick" | "loading">) {
  const className = classNames(
    getColoring(!disabled, {
      ...props,
      intent,
      size,
      minimal,
    }),
    "inline-flex items-center"
  );

  return (
    <a {...props} href={props.href} className={className}>
      {props.children}
    </a>
  );
}
