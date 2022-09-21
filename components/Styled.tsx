import React, { FunctionComponent, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: any;
  className?: string;
  rest?: any;
}

const Styled: (className: string) => FunctionComponent<Props> = (className) =>
  function f({ children, className: _className, ...rest }) {
    return (
      <div className={className + " " + _className} {...rest}>
        {children}
      </div>
    );
  };

export default Styled;
