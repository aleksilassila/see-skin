"use client";
import ProductFilters, {
  useProductFiltersState,
} from "./(product-filters)/product-filters";
import ProductSearch, {
  useProductSearchState,
} from "./(product-search)/product-search";
import ProductFeed from "./(product-feed)/product-feed";
import ProductDetails, {
  useProductDetailsState,
} from "./(product-details)/product-details";
import Navigation from "../(navigation)/Navigation";
import { useDrawerState } from "../(ui)/drawer";

export default function ProductsPage() {
  const productFilterState = useProductFiltersState();
  const productSearchState = useProductSearchState();
  const productDetailsState = useProductDetailsState();
  const drawerState = useDrawerState();

  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex min-h-0 relative">
        <ProductFilters drawerState={drawerState} {...productFilterState} />
        <div className="flex-1 min-h-0 overflow-y-scroll bg-stone-50">
          <ProductSearch drawerState={drawerState} {...productSearchState} />
          <ProductFeed
            filterState={productFilterState}
            searchState={productSearchState}
            productDetailsState={productDetailsState}
          />
        </div>
        <ProductDetails {...productDetailsState} />
      </div>
    </div>
  );
}
