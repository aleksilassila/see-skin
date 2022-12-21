"use client";

import { Product } from "../ManageResponseTypes";

interface Props {
  product: Product;
}

export function Product(props: Props) {
  return (
    <div>
      <div className="font-medium">{props.product.name}</div>
      <div className="">{props.product.description}</div>
    </div>
  );
}
