"use client";
import {
  ProductFilters,
  ProductFiltersMobile,
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
import {
  faArrowDownWideShort,
  faChevronDown,
  faFilter,
  faShoppingBag,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../(components)/ui/button";

function ProductsPage() {
  const productFilterState = useProductFiltersState();
  const productSearchState = useProductSearchState();
  const productDetailsState = useProductDetailsState();
  const filtersVisibleState = useVisibleState(false);

  return (
    <div className="flex-1 grid grid-cols-[max-content_1fr] px-8 md:px-12 lg:px-16 gap-y-8 gap-x-2 relative">
      <div className="flex-col sm:flex-row col-span-2 border-b gap-2 py-6 mt-4 flex sm:items-center justify-between bg-white sticky top-0 z-[1]">
        <div className="text-xl sm:text-3xl lg:text-4xl font-medium text-stone-500 flex gap-4">
          <FontAwesomeIcon icon={faShoppingBag} />
          Personalized Skin Care
        </div>
        <div className="hidden sm:flex">
          <Button
            leadingIcon={faArrowDownWideShort}
            trailingIcon={faChevronDown}
          >
            Popular
          </Button>
        </div>
        <div className="sm:hidden flex gap-2">
          <Button
            leadingIcon={faFilter}
            size={"sm"}
            onClick={filtersVisibleState.open}
          >
            Filters
          </Button>
          <Button
            leadingIcon={faArrowDownWideShort}
            trailingIcon={faChevronDown}
            size="sm"
          >
            Popular
          </Button>
        </div>
      </div>
      <ProductFilters {...productFilterState} />
      <div className="overflow-y-scroll col-span-2 md:col-span-1">
        <ProductFeed
          filterState={productFilterState}
          searchState={productSearchState}
          productDetailsState={productDetailsState}
        />
      </div>
      <ProductFiltersMobile
        {...productFilterState}
        visibleState={filtersVisibleState}
      />
      <ProductDetails {...productDetailsState} />
    </div>
  );
}

export default WithNavigation(ProductsPage);
