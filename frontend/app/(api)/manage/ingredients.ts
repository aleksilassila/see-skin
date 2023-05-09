import { Ingredient } from "../types";
import { fetch } from "../api";

export async function fetchIngredients() {
  return await fetch<Ingredient[]>("/manage/issues/ingredients").then(
    (r) => r.data
  );
}
