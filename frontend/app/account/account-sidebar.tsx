"use client";
import Link from "next/link";
import { createContext, PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBoxesStacked,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import classNames from "classnames";

function SidebarLink(
  props: PropsWithChildren<{ href: string; activeHref?: string }>
) {
  const pathname = usePathname();

  const active = pathname === props.activeHref || pathname === props.href;

  const className = classNames("font-light my-1 text-lg px-2 tracking-wide", {
    "text-blue-500": active,
  });

  return (
    <Link className={className} href={props.href}>
      {props.children}
      {active && <FontAwesomeIcon icon={faArrowRight} className="ml-2 fon" />}
    </Link>
  );
}

export default function AccountSidebar() {
  return (
    <div className="flex flex-col mx-4">
      <div className="flex items-center border-b-2 border-stone-100 mb-2 p-2">
        <FontAwesomeIcon icon={faBoxesStacked} className="mr-2 h-5" />
        <h1 className="text-2xl font-medium tracking-wide">Skin Solver</h1>
      </div>
      <SidebarLink href="/account/manage-irritants" activeHref="/account">
        Manage Your Irritants
      </SidebarLink>
      <SidebarLink href="/account/results">Results</SidebarLink>
      <SidebarLink href="/account/ingredient-filters">
        Ingredient Filters
      </SidebarLink>
      <SidebarLink href="/account/edit-skin-profile">
        Edit Skin Profile
      </SidebarLink>
    </div>
  );
}
