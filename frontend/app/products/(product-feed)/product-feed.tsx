import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import fetchProductsFeed from "../../(api)/products/fetch-products-feed";
import ProductItem from "./product-item";
import { useProductFiltersState } from "../(product-filters)/product-filters";
import { useProductSearchState } from "../(product-search)/product-search";
import classNames from "classnames";

interface Props {
  filterState: ReturnType<typeof useProductFiltersState>;
  searchState: ReturnType<typeof useProductSearchState>;
}

export default function ProductFeed({ filterState, searchState }: Props) {
  const { data, fetchNextPage, isFetching } = useInfiniteQuery(
    ["products"],
    async ({ pageParam = 0 }) => fetchProductsFeed(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length;
      },
    }
  );
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!isFetching) fetchNextPage();
  }, [inView]);

  const gridClassName = classNames(
    "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
    "gap-2 p-2"
  );

  return (
    <div className={gridClassName}>
      {data?.pages.map((page, key) => (
        <Fragment key={key}>
          {page.data.map((product, key) => (
            <ProductItem product={product} key={key} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} />
    </div>
  );
}
