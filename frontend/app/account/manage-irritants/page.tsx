"use client";
import { useFetch } from "../../(api)/api";
import routes, { ApiTypes } from "../../(api)/api-routes";
import { ProductListItem } from "../../(components)/common/product-list-item";
import { Button } from "../../(components)/ui/button";
import ListContainer from "../../(components)/common/list-container";

export default function ManageIrritants() {
  const { data } = useFetch<ApiTypes["user"]["get"]>(routes.user);

  if (!data) return null;

  const explicitlyAddedProducts = data.skinProfile.explicitlyAddedProducts;
  const productsFromIngredients = [];

  return (
    <div className="m-auto max-w-2xl">
      <div className="flex justify-between items-start flex-col gap-2 mb-4 lg:flex-row lg:items-end">
        <h1 className="font-bold text-xl">Mange Your Irritants</h1>
        <div className="flex gap-2">
          <Button size="sm">Add From Ingredients</Button>
          <Button size="sm" intent="primary">
            Add Products
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ListContainer
          heading="Products"
          empty="Your irritative products will appear here."
        >
          {explicitlyAddedProducts.length &&
            explicitlyAddedProducts.map((product, key) => (
              <ProductListItem product={product} key={key} />
            ))}
        </ListContainer>
        <ListContainer
          heading="Products From Ingredinets"
          empty="Your custom products will appear here."
        />
      </div>
    </div>
  );
}
