import { Ingredient } from "./ingredient";
import Api from "../../(api)/api";
import { Ingredient as IngredientType } from "../ManageResponseTypes";
import IssuesContainer from "../issues-container";

async function fetchIssues(): Promise<IngredientType[]> {
  const data = await Api.fetch("/api/manage/issues/ingredients");

  if (!data.ok) {
    throw new Error("Could not load ingredients.");
  }

  return data.json();
}

export default async function IngredientsPage() {
  const ingredients = await fetchIssues();

  return (
    <IssuesContainer
      title="Ingredients:"
      items={ingredients.map((ingredient, id) => (
        <div key={id} className="py-2">
          <Ingredient ingredient={ingredient} />
        </div>
      ))}
    />
  );
}
