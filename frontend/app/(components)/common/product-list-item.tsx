import { Product } from "../../(api)/api-types";
import Image from "next/image";
import { PRODUCT_PLACEHOLDER_URL } from "../../config";
import { ListItemContainer, ListItemProps } from "./list-container";
import { Button } from "../ui/button";

interface Props extends ListItemProps {
  product: Product;
}

export function ProductListItem({
  product,
  actionElement,
  handleClick = () => {},
}: Props) {
  return (
    <ListItemContainer actionElement={actionElement}>
      <div className="flex-shrink-0 h-20 w-20 flex items-center justify-center overflow-hidden bg-white border border-stone-300 rounded p-1">
        <Image
          src={product.imageUrl || PRODUCT_PLACEHOLDER_URL}
          alt={product.name}
          width={150}
          height={150}
          quality={50}
          className="w-auto h-full cursor-pointer"
          onClick={handleClick}
        />
      </div>
      <div className="min-w-0 flex flex-1 flex-col justify-center">
        <div
          className="truncate text-stone-800 font-medium hover:underline cursor-pointer"
          onClick={handleClick}
        >
          {product.name}
        </div>
        <div className="font-light text-stone-600">{product.brand}</div>
      </div>
    </ListItemContainer>
  );
}

interface RemovableProps extends Props {
  handleRemove: () => void;
  loading?: boolean;
}

export function RemovableProductListItem(props: RemovableProps) {
  return (
    <ProductListItem
      handleClick={props.handleClick}
      product={props.product}
      actionElement={
        <Button
          intent="secondary"
          size="sm"
          onClick={props.handleRemove}
          loading={props.loading}
        >
          Remove
        </Button>
      }
    />
  );
}
