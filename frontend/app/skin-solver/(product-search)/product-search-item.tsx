import { Product } from "../../(api)/types";

interface Props {
  product: Product;
  onClick: () => void;
}

export default function ProductSearchItem(props: Props) {
  return (
    <div className="py-1 cursor-pointer" onClick={props.onClick}>
      {props.product.name}
    </div>
  );
}
