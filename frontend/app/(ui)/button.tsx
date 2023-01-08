"use client";
import React, { HTMLAttributes, MouseEvent } from "react";
import classNames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ButtonProps<T extends HTMLElement> extends HTMLAttributes<T> {
  disabled?: boolean;
  icon?: string;
  intent?: "none" | "primary" | "secondary" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  leadingIcon?: IconProp;
  trailingIcon?: IconProp;
  round?: boolean;
}

export function Button({
  disabled = false,
  loading = false,
  intent = "none",
  size = "md",
  leadingIcon,
  trailingIcon,
  round,
  onClick = () => {},
  ...props
}: ButtonProps<HTMLButtonElement> & {
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  const active = !disabled && !loading;
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (disabled) return;

    onClick(e);
  };

  const style = classNames(
    getButtonSizing(size),
    getButtonColoring({ active, intent, round })
  );

  return (
    <button
      {...props}
      type="button"
      disabled={!active}
      className={props.className || style}
      onClick={handleClick}
    >
      {leadingIcon && <FontAwesomeIcon icon={leadingIcon} />}
      {loading ? "Button loading..." : props.children}
      {trailingIcon && <FontAwesomeIcon icon={trailingIcon} />}
    </button>
  );
}

export function AnchorButton({
  disabled = false,
  intent = "none",
  size = "md",
  round = false,
  leadingIcon,
  trailingIcon,
  newTab = false,
  ...props
}: ButtonProps<HTMLAnchorElement> & { href: string; newTab?: boolean }) {
  const style = classNames(
    getButtonSizing(size),
    getButtonColoring({
      active: !disabled,
      intent,
      round,
    }),
    "inline-flex items-center justify-center"
  );

  return (
    <a
      {...props}
      {...(newTab && { target: "_blank", rel: "noreferrer" })}
      href={props.href}
      className={props.className || style}
    >
      {props.children}
    </a>
  );
}

export function getButtonSizing(size: ButtonProps<any>["size"] = "md") {
  return classNames({
    ...{
      sm: { "text-sm h-8 px-2 md:px-4": true },
      md: { "h-10 px-2 md:px-4": true },
      lg: { "h-12 px-2 md:px-8": true },
    }[size],
  });
}

export function getButtonColoring({
  active = true,
  round = false,
  intent = "none",
}: {
  active?: boolean;
  round?: ButtonProps<any>["round"];
  intent?: ButtonProps<any>["intent"];
}) {
  return classNames("font-medium rounded-md text-center drop-shadow-sm", {
    "cursor-pointer": active,
    ...{
      none: {
        "border bg-white": true,
        "text-black": active,
        "text-stone-500": !active,
        "hover:bg-stone-100": active,
        "active:bg-stone-200": active,
        "focus-within:ring": active,
      },
      primary: {
        "bg-blue-500 text-white drop-shadow": true,
        "hover:bg-blue-400": active,
        "active:bg-blue-500": active,
        "focus-within:ring ": active,
      },
      secondary: {
        "border bg-white": true,
        "text-black": active,
        "text-stone-500": !active,
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
  });
}
