import React, { PropsWithChildren, ReactNode } from "react";
import Spinner from "../spinner";
import classNames from "classnames";
import { Product } from "../../(api)/api-types";
import { RemovableProductListItem } from "./product-list-item";

export interface ListItemProps {
  actionElement?: ReactNode;
  handleClick?: () => void;
}

interface ListContainerProps {
  size?: "sm" | "md" | "lg";
}

export function ListItemContainer({
  size = "md",
  ...props
}: PropsWithChildren<
  Pick<ListItemProps, "actionElement"> & ListContainerProps
>) {
  const style = classNames(
    "flex items-center justify-between bg-stone-50 px-4 gap-4",
    {
      "h-24": size === "md",
      "h-20": size === "sm",
    }
  );
  return (
    <div className={style}>
      {props.children}
      {props.actionElement && (
        <div className="flex-shrink-0">{props.actionElement}</div>
      )}
    </div>
  );
}

interface Props extends PropsWithChildren {
  heading: ReactNode;
  empty: ReactNode;
  isLoading?: boolean;
}

export default function ListContainer({ isLoading = false, ...props }: Props) {
  return (
    <div className="flex flex-col border border-stone-200 rounded overflow-hidden">
      <div className="bg-stone-100 p-4 py-1 font-medium text-stone-700">
        {props.heading}
      </div>
      <div className="flex flex-col gap-2 bg-stone-50">
        {(!isLoading && props.children) || (
          <div className="text-center text-stone-500 text-sm py-4">
            {isLoading ? <Spinner /> : props.empty}
          </div>
        )}
      </div>
    </div>
  );
}

interface RemovableProductListProps {
  products: Product[];
  handleRemove: (product: Product) => void;
  handleClick?: (product: Product) => void;
  loading?: boolean;
  buttonsLoading?: boolean;
}

export function RemovableProductList(props: RemovableProductListProps) {
  return (
    <ListContainer
      heading="Products"
      empty="Your irritative products will appear here."
      isLoading={props.loading}
    >
      {props.products.length &&
        props.products.map((product, key) => (
          <RemovableProductListItem
            key={key}
            product={product}
            handleRemove={() => props.handleRemove(product)}
            handleClick={() => props.handleClick && props.handleClick(product)}
            loading={props.buttonsLoading}
          />
        ))}
    </ListContainer>
  );
}
