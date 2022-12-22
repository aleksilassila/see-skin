"use client";

import { ManageProduct } from "../../(api)/manage/products";

interface Props {
  product: ManageProduct;
}

export function Product(props: Props) {
  return (
    <div>
      <div className="font-medium">{props.product.name}</div>
      <div className="">{props.product.description}</div>
    </div>
  );
}
