import {HTMLAttributes} from "react";

interface Props {

}

const Full = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  return <div {...props}>{props.children}</div>;
};

export default Full;
