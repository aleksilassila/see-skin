import React, { HTMLAttributes, MouseEvent } from "react";
import { useRouter } from "next/router";

interface Props {
  href?: string;
}

const Button = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (props.href) {
      router.push(props.href).then();
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

export const BlueButton = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  return (
    <Button
      {...props}
      className={`bg-sky-300 h-12 px-8 flex justify-center items-center rounded-md text-sm ${props.className}`}
    >
      {props.children}
    </Button>
  );
};

export const WhiteButton = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <Button
      {...props}
      className={`bg-white h-12 px-8 flex justify-center items-center rounded-full text-sm ${props.className}`}
    >
      {props.children}
    </Button>
  );
};

export default Button;
