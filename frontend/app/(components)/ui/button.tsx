"use client";
import React, { HTMLAttributes, MouseEvent, PropsWithChildren } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export interface ButtonProps<T extends HTMLElement> extends HTMLAttributes<T> {
  disabled?: boolean;
  icon?: string;
  iconStyle?: string;
  intent?: "none" | "primary" | "secondary" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  leadingIcon?: IconProp;
  trailingIcon?: IconProp;
  round?: boolean;
  overwriteStyles?: boolean;
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
  overwriteStyles,
  iconStyle,
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
    props.className,
    getButtonSizing(size),
    getButtonColoring({ active, intent, round })
  );

  return (
    <button
      {...props}
      type="button"
      disabled={!active}
      className={(overwriteStyles && props.className) || style}
      onClick={handleClick}
    >
      <IconWrapper
        leadingIcon={leadingIcon}
        trailingIcon={trailingIcon}
        size={size}
        iconStyle={iconStyle}
      >
        {loading ? "Button loading..." : props.children}
      </IconWrapper>
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
  nextLink = true,
  overwriteStyles,
  ...props
}: ButtonProps<HTMLAnchorElement> & {
  href: string;
  newTab?: boolean;
  nextLink?: boolean;
}) {
  const style = classNames(
    props.className,
    getButtonSizing(size),
    getButtonColoring({
      active: !disabled,
      intent,
      round,
    }),
    "flex"
  );

  if (nextLink) {
    return (
      <Link
        {...props}
        href={props.href}
        {...(newTab && { target: "_blank", rel: "noreferrer" })}
        className={(overwriteStyles && props.className) || style}
      >
        <IconWrapper
          leadingIcon={leadingIcon}
          trailingIcon={trailingIcon}
          size={size}
          iconStyle={props.iconStyle}
        >
          {props.children}
        </IconWrapper>
      </Link>
    );
  }

  return (
    <a
      {...props}
      {...(newTab && { target: "_blank", rel: "noreferrer" })}
      href={props.href}
      className={(overwriteStyles && props.className) || style}
    >
      <IconWrapper
        leadingIcon={leadingIcon}
        trailingIcon={trailingIcon}
        size={size}
        iconStyle={props.iconStyle}
      >
        {props.children}
      </IconWrapper>
    </a>
  );
}

function IconWrapper({
  leadingIcon,
  trailingIcon,
  size = "md",
  iconStyle,
  children,
}: PropsWithChildren<{
  leadingIcon: ButtonProps<any>["leadingIcon"];
  trailingIcon: ButtonProps<any>["trailingIcon"];
  size: ButtonProps<any>["size"];
  iconStyle: ButtonProps<any>["iconStyle"];
}>) {
  const style = classNames(
    {
      sm: "h-3",
      md: "h-3",
      lg: "h-4",
    }[size]
  );
  return (
    <div className="inline-flex items-center justify-center gap-2">
      {leadingIcon && (
        <FontAwesomeIcon icon={leadingIcon} className={iconStyle || style} />
      )}
      {children}
      {trailingIcon && (
        <FontAwesomeIcon icon={trailingIcon} className={iconStyle || style} />
      )}
    </div>
  );
}

export function getButtonSizing(size: ButtonProps<any>["size"] = "md") {
  return classNames({
    ...{
      sm: { "text-sm h-8 px-2 md:px-4": true },
      md: { "h-10 px-3 md:px-4": true },
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
        "text-white drop-shadow": true,
        "bg-blue-500": active,
        "bg-blue-400": !active,
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

export function XmarkButton(props: { handleClick: () => void }) {
  return (
    <FontAwesomeIcon
      icon={faXmark}
      className="text-stone-500 hover:text-stone-700 cursor-pointer w-6 h-6"
      onClick={() => props.handleClick()}
    />
  );
}
