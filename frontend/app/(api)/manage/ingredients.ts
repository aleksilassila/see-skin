import Api from "../api";
import { Ingredient } from "../../manage/ManageResponseTypes";

export async function fetchIngredients() {
  return await Api.fetch<Ingredient[]>("/manage/issues/ingredients").then(
    (r) => r.data
  );
}
