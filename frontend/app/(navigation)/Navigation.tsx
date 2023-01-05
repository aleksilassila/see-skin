"use client";
import { HTMLAttributes } from "react";
import Logo from "./Logo";
import Link from "next/link";
import LoginButton from "./LoginButton";
import { useUser } from "../user";

const NavItem = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className={`hidden sm:block ${props.className}`}>{props.children}</div>
);

const NavLink = (
  props: { href: string; activeHref: string } & HTMLAttributes<HTMLDivElement>
) => (
  <Link
    href={props.href}
    className={`font-bold ${
      props.href === props.activeHref ? "text-stone-600" : ""
    }`}
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
      className={`h-20 flex-shrink-0 flex justify-around items-center w-full z-20 shadow ${props.className}`}
      {...props}
    >
      <NavLink activeHref={href} href="/">
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
      <NavItem>
        <LoginButton />
      </NavItem>
    </div>
  );
};

export default Navigation;
