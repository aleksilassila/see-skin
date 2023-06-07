"use client";

import {
  RemoteSelectState,
  useRemoteSelectState,
} from "../(hooks)/remote-select";
import Input from "./ui/input";
import { Ingredient } from "../(api)/api-types";

export function useIngredientSearchState() {
  return useRemoteSelectState<Ingredient>(
    (searchTerm, selected) => undefined as any
  ); //fetchApi<GetProducts>("/ingredients/find", {
  //   params: {
  //     name: searchTerm,
  //   },
  // }).then((data) =>
  //   data.filter(
  //     (ingredient) => !selected.flatMap((s) => s.id).includes(ingredient.id)
  //   )
  // )
}

export default function IngredientSearch(state: RemoteSelectState<Ingredient>) {
  const addIngredient = (ingredient: Ingredient) => () => {
    state.setSelected([...state.selected, ingredient]);
    state.setSearchTerm("");
  };

  const removeIngredient = (ingredient: Ingredient) => () => {
    state.setSelected(state.selected.filter((i) => i.id !== ingredient.id));
  };

  return (
    <div>
      <div className="p-1 bg-stone-200 flex flex-col">
        <Input
          value={state.searchTerm}
          onValueChange={state.setSearchTerm}
          placeholder="Search for ingredients"
        />
        {state.searchResults.length > 0 && (
          <div>
            <div className="absolute bg-white shadow-md p-2 rounded-xl mt-2 divide-y">
              {state.searchResults.map((ingredient, key) => (
                <div
                  key={key}
                  className="cursor-pointer hover:bg-stone-200"
                  onClick={addIngredient(ingredient)}
                >
                  {ingredient.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        Selected:
        {state.selected.map((ingredient, key) => (
          <div key={key} className="flex">
            <span className="flex-1">{ingredient.name}</span>
            <span
              className="underline cursor-pointer"
              onClick={removeIngredient(ingredient)}
            >
              Remove
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
