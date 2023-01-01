"use client";

import Input from "../../(ui)/Input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Api from "../../(api)/api";
import ProductSearchItem from "./product-search-item";
import { Product } from "../../(api)/types";

interface ProductSelectState {
  searchResults: Product[];
  setSearchResults: Dispatch<SetStateAction<Product[]>>;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

export function useProductSearchState(): ProductSelectState {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.length > 2) {
      Api.fetch<Product[]>("/products/find", {
        params: {
          name: searchTerm,
        },
      })
        .then((res) => {
          setSearchResults(
            res.data.filter(
              (product) => !products.flatMap((p) => p.id).includes(product.id)
            )
          );
        })
        .catch(console.error);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return {
    searchResults,
    setSearchResults,
    searchTerm,
    setSearchTerm,
    products,
    setProducts,
  };
}

interface Props {
  productSelectState: ProductSelectState;
}

export default function ProductSearch(
  state: ReturnType<typeof useProductSearchState>
) {
  return (
    <div className="bg-stone-100 p-2 flex flex-col gap-2">
      <Input
        value={state.searchTerm}
        onValueChange={state.setSearchTerm}
        placeholder="Search Products"
      />
      <div className="divide-y">
        {state.searchResults.map((product, id) => (
          <ProductSearchItem
            onClick={() => {
              state.setProducts((products) => [...products, product]);
              state.setSearchResults([]);
              state.setSearchTerm("");
            }}
            product={product}
            key={id}
          />
        ))}
      </div>
      <div>Selected:</div>
      <div className="divide-y">
        {state.products.map((product, id) => (
          <ProductSearchItem
            product={product}
            onClick={() =>
              state.setProducts((products) =>
                products.filter((p) => p.id !== product.id)
              )
            }
            key={id}
          />
        ))}
      </div>
    </div>
  );
}
