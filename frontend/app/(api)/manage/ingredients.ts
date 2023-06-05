import { Ingredient } from "../api-types";
import { fetchApi } from "../api";

export async function fetchIngredients() {
  return undefined; //await fetchApi<Ingredient[]>("/manage/issues/ingredients");
}
