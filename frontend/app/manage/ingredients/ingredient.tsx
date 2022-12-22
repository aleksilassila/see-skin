"use client";

import { ManageIngredient } from "../../(api)/manage/ingredients";

interface Props {
  ingredient: ManageIngredient;
}

export function Ingredient(props: Props) {
  return (
    <>
      <div className="font-medium">{props.ingredient.name}</div>
      <div className="">Group: {props.ingredient.groupId}</div>
    </>
  );
}
