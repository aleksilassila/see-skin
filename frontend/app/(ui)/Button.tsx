"use client";
import React, { HTMLAttributes, MouseEvent } from "react";
import { useRouter } from "next/navigation";

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  href?: string;
  enabled?: boolean;
}

const Button = ({ enabled = true, ...props }: ButtonProps) => {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!enabled) return;

    if (props.href) {
      router.push(props.href);
    } else if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <div
      {...props}
      className={`cursor-pointer ${props.className}`}
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export const BlueButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      className={`bg-sky-300 h-12 px-8 flex justify-center items-center rounded-md text-sm ${props.className}`}
    >
      {props.children}
    </Button>
  );
};

export const WhiteButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      className={`${
        props.enabled ? "bg-white" : "bg-stone-200"
      } h-12 px-8 flex justify-center items-center rounded-full text-sm ${
        props.className
      }`}
    >
      {props.children}
    </Button>
  );
};

export default Button;
