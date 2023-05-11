"use client";
import { Button } from "../../../(components)/ui/button";
import SelectIngredientClasses, {
  useSelectIngredientClassState,
} from "./select-ingredient-classes";
import { useQuery } from "react-query";
import { fetchApi } from "../../../(api)/api";
import { Ingredient } from "../../../(api)/api-types";
import IngredientSearch, {
  useIngredientSearchState,
} from "../../../(components)/ingredient-search";

export default function ManageIngredientsActions() {
  const {
    data: updatedIngredients,
    isLoading,
    refetch,
  } = useQuery<Ingredient[]>("update-ingredient-classes", updateQueryClasses, {
    refetchOnWindowFocus: false,
    enabled: false,
  });
  const ingredientSearchState = useIngredientSearchState();
  const selectIngredientClassState = useSelectIngredientClassState();

  function updateQueryClasses() {
    return Promise.all(
      ingredientSearchState.selected.map((ingredient) =>
        fetchApi("/ingredients/update/" + ingredient.id, {
          method: "PUT",
          data: {
            ingredientClasses: selectIngredientClassState.classes,
          },
        })
      )
    );
  }

  const loading = isLoading;
  const saveResetDisabled = ingredientSearchState.selected.length === 0;

  return (
    <div>
      <div className="mb-2 border-b">
        <IngredientSearch {...ingredientSearchState} />
      </div>
      <div className="flex flex-col">
        <div id="actions" className="inline-flex gap-2">
          <SelectIngredientClasses {...selectIngredientClassState} />
        </div>
        <div className="inline-flex gap-2 border-b mb-2">
          <Button
            disabled={saveResetDisabled}
            loading={loading}
            intent="primary"
            onClick={() => refetch()}
          >
            Save
          </Button>
        </div>
        {updatedIngredients && (
          <div>
            <div>Classes saved successfully! Updated classes:</div>
            <div>
              {updatedIngredients.map((ingredient, key) => (
                <div key={key}>
                  {ingredient.name}: {ingredient.ingredientClasses.join(", ")}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
