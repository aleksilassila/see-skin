import { FunctionComponent, PropsWithChildren } from "react";
import Footer from "../(footer)/Footer";
import Navigation from "./navigation";

export function WithNavigation(Component?: FunctionComponent<any>) {
  return function NavigationView(props?: PropsWithChildren<any>) {
    return (
      <>
        <Navigation />
        {Component ? (
          <Component {...props} />
        ) : (
          <div className="flex-1">{props?.children}</div>
        )}
        <Footer />
      </>
    );
  };
}