"use client";
import { FunctionComponent, HTMLAttributes, PropsWithChildren } from "react";
import Logo from "./Logo";
import Link from "next/link";
import AccountButton from "./AccountButton";
import { useUser } from "../user";
import Footer from "../(footer)/Footer";

const NavItem = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className={`hidden sm:block mx-4 ${props.className}`}>
    {props.children}
  </div>
);

const NavLink = (
  props: { href: string; activeHref: string } & HTMLAttributes<HTMLDivElement>
) => (
  <Link
    href={props.href}
    className={`font-bold ${
      props.href === props.activeHref ? "text-stone-600" : ""
    } ${props.className}`}
  >
    {props.children}
  </Link>
);

interface Props {
  href?: string;
}

const Navigation = ({
  href = "",
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) => {
  const user = useUser();

  return (
    <div
      className={`h-20 flex-shrink-0 flex justify-between items-center w-full z-20 shadow ${props.className}`}
      {...props}
    >
      <div className="flex items-center mx-4">
        <NavLink activeHref={href} href="/" className="mx-8">
          <Logo className="text-black" />
        </NavLink>
        <NavItem>
          <NavLink activeHref={href} href="/products">
            Products
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink activeHref={href} href="/skin-solver">
            Skin Solver
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink activeHref={href} href="/checker">
            Checker
          </NavLink>
        </NavItem>
        {user.user && user.user.accessLevel > 0 ? (
          <NavItem>
            <NavLink href={"/manage"} activeHref={href}>
              Manage
            </NavLink>
          </NavItem>
        ) : null}
      </div>
      <div className="mx-8">
        <NavItem>
          <AccountButton />
        </NavItem>
      </div>
    </div>
  );
};

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

export default Navigation;
