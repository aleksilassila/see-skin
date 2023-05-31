"use client";
import ProductFilters, {
  useProductFiltersState,
} from "./product-filters/product-filters";
import { useProductSearchState } from "./product-search/product-search";
import ProductFeed from "./product-feed/product-feed";
import ProductDetails, {
  useProductDetailsState,
} from "./product-details/product-details";
import { useVisibleState } from "../(components)/ui/drawer";

import { WithNavigation } from "../(navigation)/with-navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../(components)/ui/button";

function ProductsPage() {
  const productFilterState = useProductFiltersState();
  const productSearchState = useProductSearchState();
  const productDetailsState = useProductDetailsState();
  const filtersVisibleState = useVisibleState(false);

  return (
    <div className="flex-1 grid grid-cols-2 px-8 md:px-12 lg:px-16 gap-y-8 relative">
      <div className="col-span-2 border-b py-8 flex items-center justify-between bg-white sticky top-0 z-[1]">
        <div className="text-stone-500 text-4xl font-medium flex gap-4">
          <FontAwesomeIcon icon={faShoppingBag} />
          Personalized Skin Care
        </div>
        <div className="flex gap-4 items-center">
          Sort by:
          <Button>Popular</Button>
        </div>
      </div>
      <ProductFilters
        isVisible={filtersVisibleState.isVisible}
        {...productFilterState}
      />
      <div className="overflow-y-scroll">
        <ProductFeed
          filterState={productFilterState}
          searchState={productSearchState}
          productDetailsState={productDetailsState}
        />
      </div>
      <ProductDetails {...productDetailsState} />
    </div>
  );
}

export default WithNavigation(ProductsPage);
