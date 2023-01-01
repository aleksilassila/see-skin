"use client";
import Input from "../../(ui)/Input";
import classNames from "classnames";
import { useState } from "react";

export function useProductSearchState() {
  const [searchStr, setSearchStr] = useState("");
  return {
    searchStr,
    setSearchStr,
    getSearchStr: () => (searchStr.length >= 3 ? searchStr : undefined),
  };
}

interface Props {}

export default function ProductSearch({
  ...state
}: ReturnType<typeof useProductSearchState> & Props) {
  const className = classNames("border-b", "flex justify-between", "p-2");

  return (
    <div className={className}>
      <Input
        value={state.searchStr}
        onValueChange={state.setSearchStr}
        placeholder="Search for products..."
      />
    </div>
  );
}
