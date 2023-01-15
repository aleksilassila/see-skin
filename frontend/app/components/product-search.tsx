"use client";

import Input from "../(ui)/input";
import Api from "../(api)/api";
import { Product } from "../(api)/types";
import {
  RemoteSelectState,
  useRemoteSelectState,
} from "../(hooks)/remote-select";

export function useProductSearchState() {
  return useRemoteSelectState<Product>((searchTerm, selected) =>
    Api.fetch<Product[]>("/products/find", {
      params: {
        name: searchTerm,
      },
    }).then((res) =>
      res.data.filter(
        (product) => !selected.flatMap((s) => s.id).includes(product.id)
      )
    )
  );
}

export default function ProductSearch(state: RemoteSelectState<Product>) {
  const addProduct = (product: Product) => () => {
    state.setSelected([...state.selected, product]);
    state.setSearchTerm("");
  };

  const removeProduct = (product: Product) => () => {
    state.setSelected(state.selected.filter((i) => i.id !== product.id));
  };

  return (
    <div>
      <div className="p-1 bg-stone-200 flex flex-col">
        <Input
          value={state.searchTerm}
          onValueChange={state.setSearchTerm}
          placeholder="Search for products"
        />
        {state.searchResults.length > 0 && (
          <div>
            <div className="absolute bg-white shadow-md p-2 rounded-xl mt-2 divide-y">
              {state.searchResults.map((product, key) => (
                <div
                  key={key}
                  className="cursor-pointer hover:bg-stone-200"
                  onClick={addProduct(product)}
                >
                  {product.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        Selected:
        {state.selected.map((product, key) => (
          <div key={key} className="flex">
            <span className="flex-1">{product.name}</span>
            <span
              className="underline cursor-pointer"
              onClick={removeProduct(product)}
            >
              Remove
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
