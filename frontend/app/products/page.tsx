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
  faArrowTrendUp,
  faArrowUpWideShort,
  faFilter,
  faFire,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../(components)/ui/button";
import Dropdown, {
  DropdownItems,
  useDropdownState,
} from "../(components)/ui/dropdown";

const sortOptions = [
  {
    value: "popular",
    display: "Popular",
    leadingIcon: faFire,
  },
  {
    value: "featured",
    display: "Featured",
    leadingIcon: faArrowTrendUp,
  },

  {
    value: "price-low-to-high",
    display: "Price (Low to High)",
    leadingIcon: faArrowDownWideShort,
  },
  {
    value: "price-high-to-low",
    display: "Price (High to Low)",
    leadingIcon: faArrowUpWideShort,
  },
] satisfies DropdownItems;

function ProductsPage() {
  const filtersState = useProductFiltersState();
  const productSearchState = useProductSearchState();
  const productDetailsState = useProductDetailsState();

  const filtersVisibleState = useVisibleState(false);
  const sortDropdownState = useDropdownState(sortOptions);

  return (
    <div className="flex-1 grid grid-cols-[max-content_1fr] px-8 md:px-12 lg:px-16 gap-y-8 gap-x-2 relative">
      <div className="flex-col sm:flex-row col-span-2 border-b gap-2 py-6 mt-4 flex sm:items-center justify-between bg-white sticky top-0 z-[1]">
        <div className="text-xl md:text-3xl lg:text-4xl font-medium text-stone-500 flex gap-4">
          <FontAwesomeIcon icon={faShoppingBag} />
          Personalized Skin Care
        </div>
        <div className="hidden md:flex">
          <Dropdown {...sortDropdownState} />
        </div>
        <div className="md:hidden flex gap-2">
          <Button
            leadingIcon={faFilter}
            size={"sm"}
            onClick={filtersVisibleState.open}
            intent={filtersState.filtersActive ? "primary" : "none"}
          >
            Filters{" "}
            {filtersState.filtersActive !== 0
              ? `(${filtersState.filtersActive})`
              : ""}
          </Button>

          <Dropdown size="sm" {...sortDropdownState} />
        </div>
      </div>
      <ProductFilters {...filtersState} />
      <div className="overflow-y-scroll col-span-2 md:col-span-1">
        <ProductFeed
          filterState={filtersState}
          searchState={productSearchState}
          productDetailsState={productDetailsState}
        />
      </div>
      <ProductFiltersMobile
        {...filtersState}
        visibleState={filtersVisibleState}
      />
      <ProductDetails {...productDetailsState} />
    </div>
  );
}

export default WithNavigation(ProductsPage);
