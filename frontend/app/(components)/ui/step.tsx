import { PropsWithChildren, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export type StepsState = ReturnType<typeof useStepsState>;

export function useStepsState(defaultIndex: number = 0) {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [clickableIndex, setClickableIndex] = useState(defaultIndex);

  return {
    currentIndex,
    clickableIndex,
    setClickableIndex,
    unlockNext: () => setClickableIndex((v) => v + 1),
    open: (index: number) => {
      setCurrentIndex(index);
      if (currentIndex < index) setClickableIndex(index);
    },
  };
}

interface Props extends StepsState {
  heading: string;
  index: number;
}

export default function Step(props: PropsWithChildren<Props>) {
  const isOpen = props.index === props.currentIndex;
  const isDisabled = props.index > props.clickableIndex;

  const stepStyle = classNames("bg-white rounded-xl shadow-lg divide-y", {
    "cursor-pointer": !isOpen && !isDisabled,
    "text-stone-500": isDisabled,
  });

  const ringStyle = classNames(
    "rounded-full border h-0 w-0 p-3 flex items-center justify-center",
    {
      "border-blue-500 bg-blue-50": isOpen,
      "border-gray-300 bg-gray-50": !isOpen && !isDisabled,
    }
  );

  return (
    <div className={stepStyle}>
      <div
        onClick={() => !isDisabled && props.open(props.index)}
        className="flex justify-between items-center px-4 py-2"
      >
        <div className="flex gap-2 items-center">
          <div className={ringStyle}>{props.index + 1}</div>
          <h1 className="font-medium text-lg">{props.heading}</h1>
        </div>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </div>
      {props.index === props.currentIndex && (
        <div className="p-4">{props.children}</div>
      )}
    </div>
  );
}
