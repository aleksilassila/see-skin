import { IngredientClass, SkinType } from "../types";
import { fetch } from "../api";

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
  return fetch("/user/update", {
    method: "PUT",
    data: { ...params },
  });
}
