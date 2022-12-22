"use client";
import { HTMLAttributes, useContext } from "react";
import Logo from "./Logo";
import Link from "next/link";
import LoginButton from "./LoginButton";
import { UserContext, useUser } from "../user";

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

  console.log(user);

  return (
    <div
      className={`h-20 flex justify-around items-center w-full ${props.className}`}
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
