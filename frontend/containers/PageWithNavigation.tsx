import { HTMLAttributes } from "react";
import Navigation from "../app/(navigation)/Navigation";
import Footer from "../app/(footer)/Footer";

interface Props {
  href?: string;
}

const PageWithNavigation = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`flex flex-col min-h-screen w-screen ${props.className}`}
      {...props}
    >
      <Navigation href={props.href} />
      {props.children}
      <Footer />
    </div>
  );
};

export default PageWithNavigation;
