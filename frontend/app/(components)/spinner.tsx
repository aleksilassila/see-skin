import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

interface Props {
  size?: "sm" | "md" | "lg";
}

export default function Spinner({ size = "sm" }: Props) {
  const style = classNames("animate-spin text-stone-500", {
    "h-4": size === "sm",
    "h-6": size === "md",
    "h-8": size === "lg",
  });

  return <FontAwesomeIcon icon={faCircleNotch} className={style} />;
}
