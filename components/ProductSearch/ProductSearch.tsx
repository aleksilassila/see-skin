import { HTMLAttributes } from "react";
import { WhiteButton } from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface Props {}

const ProductSearch = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className="bg-stone-300 max-w-lg flex flex-col p-2 rounded-xl h-96 gap-2 mx-auto shadow-lg"
      {...props}
    >
      <SearchBar />
      <div className="flex-1"></div>
      <WhiteButton className="self-center">Start</WhiteButton>
    </div>
  );
};

const SearchBar = (props: {} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`bg-white rounded-full px-2 py-1 flex gap-2 items-center shadow-lg ${props.className}`}
      {...props}
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} className="text-stone-400" />
      <input className="bg-transparent outline-0 text-xs text-stone-400 focus:text-black transition-colors flex-1" />
    </div>
  );
};

export default ProductSearch;
