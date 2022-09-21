import { HTMLAttributes } from "react";

interface Props {}

const ProductSearchExtended = (
  props: Props & HTMLAttributes<HTMLDivElement>
) => {
  return <div {...props}>{props.children}</div>;
};

export default ProductSearchExtended;
