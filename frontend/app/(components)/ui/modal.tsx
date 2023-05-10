import { Fragment, PropsWithChildren, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

export type ModalState = ReturnType<typeof useModalState>;

interface Props {
  size?: "sm" | "md" | "lg";
  top?: number;
}

export function Modal({
  size = "md",
  top,
  ...props
}: ReturnType<typeof useModalState> & PropsWithChildren<Props>) {
  const { isOpen, open, close } = props;

  const panelStyle = classNames("bg-white rounded-xl p-8 shadow-lg", {
    "flex-grow w-full h-full": size === "lg",
    "max-w-2xl flex-grow": size === "md",
  });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={() => close()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 z-30" />
        </Transition.Child>

        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="fixed inset-0 p-8 flex justify-center z-[31]"
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

export function useModalState() {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
}

export function ModalHeader(props: PropsWithChildren<ModalState>) {
  return (
    <div className="flex justify-between items-center mb-2">
      <div className="text-2xl font-medium">{props.children}</div>
      <FontAwesomeIcon
        icon={faXmark}
        className="text-stone-500 hover:text-stone-700 cursor-pointer w-6 h-6"
        onClick={() => props.close()}
      />
    </div>
  );
}
