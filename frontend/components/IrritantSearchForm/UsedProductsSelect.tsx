import React, { HTMLAttributes, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface Props {
  updateSelectedProducts: (ids: string[]) => void;
}

const UsedProductsSelect = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  const [usedProductIds, setUsedProductIds] = useState<string[]>([]);

  useEffect(() => {
    props.updateSelectedProducts(usedProductIds);
  }, [props, usedProductIds]);

  const addProduct = (id: string) => {
    setUsedProductIds([...(usedProductIds || []), id]);
  };

  const removeProduct = (id: string) => {
    setUsedProductIds(usedProductIds?.filter((i) => i !== id));
  };

  return (
    <div {...props}>
      <SearchBar addValue={addProduct} />
      {usedProductIds?.map((id, key) => (
        <div onClick={() => removeProduct(id)} key={key}>
          {id}
        </div>
      ))}
    </div>
  );
};

const SearchBar = (
  props: {
    addValue: (value: string) => void;
  } & HTMLAttributes<HTMLDivElement>
) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.addValue(searchValue);
      setSearchValue("");
    }
  };

  return (
    <div
      className={`bg-white rounded-full px-2 py-1 flex gap-2 items-center shadow-lg ${props.className}`}
      {...props}
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} className="text-stone-400" />
      <input
        value={searchValue}
        onChange={handleValueChange}
        onKeyDown={handleEnterPress}
        className="bg-transparent outline-0 text-xs text-stone-400 focus:text-black transition-colors flex-1"
      />
    </div>
  );
};

export default UsedProductsSelect;
