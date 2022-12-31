"use client";

import { Ingredient } from "../../(api)/solver/fetch-irritants-calculation";

interface Props {
  ingredient: Ingredient;
}

export function Ingredient(props: Props) {
  return (
    <>
      <div className="font-medium">{props.ingredient.name}</div>
      <div className="">Function: {props.ingredient.function}</div>
      <div className="">Classes: {props.ingredient.ingredientClasses}</div>
    </>
  );
}
