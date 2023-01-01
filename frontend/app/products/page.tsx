"use client";
import ProductFilters, {
  useProductFiltersState,
} from "./(product-filters)/product-filters";
import ProductSearch, {
  useProductSearchState,
} from "./(product-search)/product-search";
import ProductFeed from "./(product-feed)/product-feed";

export default function ProductsPage() {
  const productFilterState = useProductFiltersState();
  const productSearchState = useProductSearchState();

  return (
    <div className="flex">
      <ProductFilters {...productFilterState} />
      <div className="flex-1">
        <ProductSearch {...productSearchState} />
        <ProductFeed
          filterState={productFilterState}
          searchState={productSearchState}
        />
      </div>
    </div>
  );
}
