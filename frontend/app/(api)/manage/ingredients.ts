import Api from "../api";
import { Ingredient } from "../solver/fetch-irritants";

export interface IngredientAlias {
  id: string;
  name: string;
  ingredientId: string;
}

export async function fetchIngredients() {
  return await Api.fetch<Ingredient[]>("/manage/issues/ingredients").then(
    (r) => r.data
  );
}
