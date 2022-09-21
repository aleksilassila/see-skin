import {
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface Props {
  icon?: ReactNode;
}

export const SearchInputContainer = ({
  icon,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={`flex items-center ${props.className}`}>
    {icon}
    {props.children}
  </div>
);

export const SearchInputField = (
  props: InputHTMLAttributes<HTMLInputElement>
) => (
  <input
    {...props}
    className={`bg-transparent outline-0 flex-1 ${props.className}`}
  />
);

const SearchInput = (props: HTMLAttributes<HTMLDivElement>) => {
  const [value, setValue] = useState("");
  return (
    <SearchInputContainer
      {...props}
      className={`bg-stone-100 rounded-xl px-4 h-10 gap-2 text-sm text-stone-400 ${props.className}`}
      icon={
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-stone-400" />
      }
    >
      <SearchInputField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="focus:text-black transition-colors"
      />
    </SearchInputContainer>
  );
};

export default SearchInput;
