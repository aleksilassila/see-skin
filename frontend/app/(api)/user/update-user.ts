import { IngredientClass, SkinType } from "../api-types";
import { fetchApi } from "../api";

interface Params {
  irritativeIngredientIds: string[];
  irritativeProductIds: string[];
  irritantIds: string[];
  irritativeClasses: IngredientClass[];
  skinType: SkinType;
  email: string;
  name: string;
}

export default function updateUser(params: Partial<Params>) {
  return fetchApi("/user/update", {
    method: "PUT",
    data: { ...params },
  });
}
