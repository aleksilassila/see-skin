import { HTMLAttributes, PropsWithChildren, useState } from "react";
import classNames from "classnames";

export type DrawerState = ReturnType<typeof useDrawerState>;

export function useDrawerState() {
  const [open, setOpen] = useState(false);

  return { open, setOpen, close: () => setOpen(false) };
}

interface Props {}

export default function Drawer({
  children,
  open,
  close,
  bgStyle = "",
  ...props
}: DrawerState &
  PropsWithChildren<
    {
      bgStyle?: HTMLAttributes<any>["className"];
    } & HTMLAttributes<HTMLDivElement>
  >) {
  if (!open) {
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
