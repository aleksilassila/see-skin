import { Ingredient } from "../api-types";
import { fetchApi } from "../api";

export async function fetchIngredients() {
  return await fetchApi<Ingredient[]>("/manage/issues/ingredients");
}
