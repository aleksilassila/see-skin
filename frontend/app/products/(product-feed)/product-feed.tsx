"use client";
import { useInfiniteQuery } from "react-query";
import fetchProductsFeed from "../../(api)/products/fetch-products-feed";
import ProductItem from "./product-item";
import { useProductFiltersState } from "../(product-filters)/product-filters";
import { useProductSearchState } from "../(product-search)/product-search";
import classNames from "classnames";
import ProductFeedLoader, { useProductFeedLoader } from "./product-feed-loader";
import { Product } from "../../(api)/types";
import { useEffect, useState } from "react";

interface Props {
  filterState: ReturnType<typeof useProductFiltersState>;
  searchState: ReturnType<typeof useProductSearchState>;
}

function useDirtyInfiniteQueryServerFix() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => setEnabled(true), []);

  return enabled;
}

export default function ProductFeed({ filterState, searchState }: Props) {
  const infiniteQueryServerFix = useDirtyInfiniteQueryServerFix(); // FIXME remove this when react-query is fixed
  const { data, fetchNextPage, isFetching } = useInfiniteQuery<Product[]>(
    ["products", { searchStr: searchState.searchStr }],
    async ({ pageParam = 0, queryKey }) =>
      fetchProductsFeed(pageParam, searchState.getSearchStr()),
    {
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length;
      },
      enabled: infiniteQueryServerFix,
    }
  );

  const feedLoader = useProductFeedLoader(fetchNextPage);

  const gridClassName = classNames(
    "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
    "gap-2 p-2"
  );

  return (
    <div className={gridClassName}>
      {data?.pages.flat().map((product, key) => (
        <ProductItem product={product} key={key} />
      ))}
      <ProductFeedLoader loaderRef={feedLoader.ref} isLoading={isFetching} />
    </div>
  );
}
