import { ManageProduct } from "../../(api)/manage/products";
import { PropsWithChildren } from "react";

interface Props {
  product: ManageProduct;
  onClick: () => void;
}

export default function ProductSearchItem(props: Props) {
  return (
    <div className="py-1 cursor-pointer" onClick={props.onClick}>
      {props.product.name}
    </div>
  );
}
