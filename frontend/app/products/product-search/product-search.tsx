"use client";
import Input from "../../(components)/ui/input";
import classNames from "classnames";
import { useState } from "react";
import { VisibleState } from "../../(components)/ui/drawer";
import { Button } from "../../(components)/ui/button";

export type ProductSearchState = ReturnType<typeof useProductSearchState>;

export function useProductSearchState() {
  const [searchStr, setSearchStr] = useState("");
  return {
    searchStr,
    setSearchStr,
    getSearchStr: () => (searchStr.length >= 3 ? searchStr : undefined),
  };
}

interface Props {
  drawerState: VisibleState;
}

export default function ProductSearch({
  ...state
}: ReturnType<typeof useProductSearchState> & Props) {
  const className = classNames("border-b", "flex gap-2", "p-2");

  return (
    <div className={className}>
      <div className="block sm:hidden">
        <Button size="sm" onClick={() => state.drawerState.setIsVisible(true)}>
          Filters
        </Button>
      </div>
      <Input
        value={state.searchStr}
        onValueChange={state.setSearchStr}
        placeholder="Search for products..."
      />
    </div>
  );
}
