import { HTMLAttributes, PropsWithChildren, useState } from "react";
import classNames from "classnames";

export type VisibleState = ReturnType<typeof useVisibleState>;

export function useVisibleState(initialState: boolean = false) {
  const [isVisible, setIsVisible] = useState(initialState);

  return {
    isVisible,
    setIsVisible,
    close: () => setIsVisible(false),
    open: () => setIsVisible(true),
    toggle: () => setIsVisible(!isVisible),
  };
}

interface Props {}

export default function Drawer({
  children,
  isVisible,
  close,
  bgStyle = "",
  ...props
}: VisibleState &
  PropsWithChildren<
    {
      bgStyle?: HTMLAttributes<any>["className"];
    } & HTMLAttributes<HTMLDivElement>
  >) {
  if (!isVisible) {
    return null;
  }

  const style = classNames("absolute", props.className, {
    "bg-white": !props.className,
  });

  return (
    <>
      <div
        className={"bg-[#00000022] absolute inset-0 " + bgStyle}
        onClick={close}
      />
      <div {...props} className={style}>
        {children}
      </div>
    </>
  );
}
