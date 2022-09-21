import { HTMLAttributes } from "react";
import PageWithNavigation from "../containers/PageWithNavigation";

interface Props {}

const SkinSolver = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  return <PageWithNavigation href={"/skin-solver"}></PageWithNavigation>;
};

export default SkinSolver;
