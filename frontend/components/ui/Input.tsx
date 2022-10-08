import { HTMLAttributes } from "react";

interface Props {}

const Input = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  return <div {...props}>{props.children}</div>;
};

export default Input;
