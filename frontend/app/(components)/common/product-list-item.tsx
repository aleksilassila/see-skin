import { Product } from "../../(api)/types";

interface Props {
  product: Product;
}

export function ProductListItem(props: Props) {
  return <div className="flex-1 flex justify-center mx-16 my-16"></div>;
}
