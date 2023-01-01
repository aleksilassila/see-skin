import Api from "../api";
import { Ingredient } from "../types";

export async function fetchIngredients() {
  return await Api.fetch<Ingredient[]>("/manage/issues/ingredients").then(
    (r) => r.data
  );
}
