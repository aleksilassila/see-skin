import { Fragment, HTMLAttributes, PropsWithChildren } from "react";
import Navigation from "./(navigation)/Navigation";
import Footer from "./(footer)/Footer";

interface Props {}

export default function WithNav({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <Fragment>
      <Navigation />
      <div {...props} className={props.className || "flex-1"}>
        {children}
      </div>
      <Footer />
    </Fragment>
  );
}
