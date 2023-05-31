import { Fragment, PropsWithChildren } from "react";
import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { XmarkButton } from "./button";
import { useVisibleState } from "./drawer";

export type ModalState = ReturnType<typeof useVisibleState>;

interface Props {
  size?: "sm" | "md" | "lg";
  top?: number;
}

export function Modal({
  size = "md",
  top,
  ...props
}: ModalState & PropsWithChildren<Props>) {
  const panelStyle = classNames("bg-white rounded-xl p-8 py-6 shadow-lg", {
    "flex-grow w-full h-full": size === "lg",
    "max-w-2xl flex-grow": size === "md",
  });

  return (
    <Transition appear show={props.isVisible} as={Fragment}>
      <Dialog open={props.isVisible} onClose={() => close()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 z-50" />
        </Transition.Child>

        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="fixed inset-0 p-8 flex justify-center z-[51]"
          style={{
            marginTop: top ? `${top}vh` : undefined,
            alignItems: !top ? "center" : "flex-start",
          }}
        >
          <Dialog.Panel className={panelStyle}>{props.children}</Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export function ModalHeader(props: PropsWithChildren<ModalState>) {
  return (
    <div className="flex justify-between items-center mb-2">
      <div className="text-xl font-medium">{props.children}</div>
      <XmarkButton handleClick={props.close} />
    </div>
  );
}
