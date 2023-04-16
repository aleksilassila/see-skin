"use client";
import React, { PropsWithChildren } from "react";
import { useUser } from "../user";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";
import WithNav from "../with-nav";
import { RequireAuthentication } from "../(components)/require-authentication";

function SideBarSubHeader(props: PropsWithChildren) {
  return (
    <div className="text-stone-500 text-xs uppercase font-bold mt-2">
      {props.children}
    </div>
  );
}

function SideBarLink({
  href,
  exact = false,
  children,
}: PropsWithChildren<{ href: string; exact?: boolean }>) {
  const pathname = usePathname() || "";
  const active: boolean = exact ? pathname === href : pathname.startsWith(href);

  const className = classNames({
    underline: true,
    "text-stone-500": active,
  });

  return (
    <Link href={href} className={className}>
      {active ? "> " : ""}
      {children}
    </Link>
  );
}

interface SideBarProps {}

function SideBar(props: PropsWithChildren<SideBarProps>) {
  return (
    <WithNav className="flex-1 flex flex-row h-full">
      <div className="flex flex-col bg-stone-100 border-r border-stone-500 p-2">
        <SideBarLink href="/manage" exact>
          Overview
        </SideBarLink>
        <SideBarSubHeader>data</SideBarSubHeader>
        <SideBarLink href="/manage/products">Products</SideBarLink>
        <SideBarLink href="/manage/ingredients">Ingredients</SideBarLink>
      </div>
      <div className="flex-1 pl-2">{props.children}</div>
    </WithNav>
  );
}

export default RequireAuthentication(1)(SideBar);
