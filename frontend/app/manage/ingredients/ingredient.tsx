"use client";

import { Ingredient } from "../ManageResponseTypes";

interface Props {
  ingredient: Ingredient;
}

export function Ingredient(props: Props) {
  return (
    <>
      <div className="font-medium">{props.ingredient.name}</div>
      <div className="">Group: {props.ingredient.groupId}</div>
    </>
  );
}
