import Api from "../api";

export interface ManageIngredient {
  id: string;
  name: string;
  groupId: string;
}

export async function fetchIngredients() {
  return await Api.fetch<ManageIngredient[]>("/manage/issues/ingredients").then(
    (r) => r.data
  );
}
