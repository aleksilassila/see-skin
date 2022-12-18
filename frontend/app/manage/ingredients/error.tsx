"use client";

import { ErrorComponent } from "next/dist/client/components/error-boundary";

const ProductsPageError: ErrorComponent = function (props) {
  return (
    <>
      <div>Could not load products.</div>
      <div>{props.error.name}</div>
    </>
  );
};

export default ProductsPageError;
