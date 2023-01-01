import Api from "../api";
import { IngredientClass, SkinType } from "../types";

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
  return Api.fetch("/user/update", {
    method: "PUT",
    data: { ...params },
  });
}
