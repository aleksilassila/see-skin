"use client";
import { useInfiniteQuery } from "react-query";
import ProductFeedCard from "./product-feed-card";
import { ProductFiltersState } from "../product-filters/product-filters";
import { ProductSearchState } from "../product-search/product-search";
import classNames from "classnames";
import ProductFeedLoader, { useProductFeedLoader } from "./product-feed-loader";
import { Product } from "../../(api)/api-types";
import { useEffect, useState } from "react";
import { ProductDetailsState } from "../product-details/product-details";
import { fetchApi } from "../../(api)/api";
import { GetProducts } from "../../(api)/api-routes";

interface Props {
  filterState: ProductFiltersState;
  searchState: ProductSearchState;
  productDetailsState: ProductDetailsState;
}

export default function ProductFeed({
  filterState,
  searchState,
  productDetailsState,
}: Props) {
  const isQueryEnabled = useDirtyInfiniteQueryServerFix(); // FIXME remove this when react-query is fixed
  const { data, fetchNextPage, isFetching } = useInfiniteQuery<Product[]>(
    [
      "products",
      {
        searchString: searchState.searchStr,
        ...filterState.irritantFilterToggle.state,
        ...filterState.effectSwitch.state,
        ...filterState.categorySwitch.state,
      },
    ],
    async ({ pageParam = 0, queryKey }) =>
      fetchApi<GetProducts>("/products", {
        params: {
          name: searchState.searchStr,
          filterIrritants:
            filterState.irritantFilterToggle.state.irritantFiltering,
          category: filterState.categorySwitch.activeItem,
          effect: filterState.effectSwitch.activeItem,
          take: 25,
          skip: pageParam * 25,
        },
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length;
      },
      enabled: isQueryEnabled,
    }
  );

  const feedLoader = useProductFeedLoader(fetchNextPage);

  const gridClassName = classNames(
    "flex flex-wrap justify-center",
    "max-w-screen-2xl mx-auto p-1",
    "gap-6"
  );

  return (
    <div className={gridClassName}>
      {data?.pages.flat().map((product, key) => (
        <ProductFeedCard
          showProductDetails={productDetailsState.show}
          product={product}
          key={key}
        />
      ))}
      <ProductFeedLoader loaderRef={feedLoader.ref} isLoading={isFetching} />
    </div>
  );
}

function useDirtyInfiniteQueryServerFix() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => setEnabled(true), []);

  return enabled;
}
