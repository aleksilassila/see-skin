"use client";
import { Ingredient } from "./ingredient";
import IssuesContainer from "../issues-container";
import { useQuery } from "react-query";
import { fetchIngredients } from "../../(api)/manage/ingredients";

export default function IngredientsPage() {
  // const { data: ingredients } = useQuery(
  //   "manage-issues-ingredients",
  //   fetchIngredients
  // );

  // if (!ingredients) return null;
  //
  // return (
  //   <IssuesContainer
  //     title="Ingredients:"
  //     items={ingredients.map((ingredient, id) => (
  //       <div key={id} className="py-2">
  //         <Ingredient ingredient={ingredient} />
  //       </div>
  //     ))}
  //   />
  // );

  return <div></div>;
}
