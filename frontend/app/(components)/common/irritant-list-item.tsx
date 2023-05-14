import { Ingredient } from "../../(api)/api-types";
import { ReactNode } from "react";
import { ListItemContainer, ListItemProps } from "./list-container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faClone,
  faCopy,
  faHandDots,
} from "@fortawesome/free-solid-svg-icons";

interface Props extends ListItemProps {
  ingredient: Ingredient;
  reason: "duplicate" | "skinType" | "explicit";
}

export default function IrritantListItem({ ingredient, ...props }: Props) {
  const icon = {
    duplicate: faCopy,
    skinType: faHandDots,
    explicit: faBan,
  }[props.reason];

  return (
    <ListItemContainer actionElement={props.actionElement} size="sm">
      <div>
        <FontAwesomeIcon icon={icon} className="h-8" />
      </div>
      <div className="min-w-0 flex flex-1 flex-col justify-center">
        <div className="overflow-ellipsis whitespace-nowrap overflow-hidden text-stone-800 font-medium hover:underline cursor-pointer">
          {ingredient.name}
        </div>
        <div className="font-light text-stone-600 line-clamp-2">
          {ingredient.function.charAt(0) +
            ingredient.function.slice(1).toLowerCase()}
        </div>
      </div>
    </ListItemContainer>
  );
}
