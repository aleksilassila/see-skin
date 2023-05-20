"use client";
import { HTMLAttributes, useState } from "react";
import Logo from "./logo";
import Link from "next/link";
import AccountButton, { GoogleLoginButton } from "./account-button";
import { UserContextState, useUser } from "../user";
import { User } from "../(api)/api-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { XmarkButton } from "../(components)/ui/button";
import { usePathname } from "next/navigation";

const links = [
  { href: "/products", text: "Products" },
  { href: "/skin-solver", text: "Skin Solver" },
  { href: "/checker", text: "Checker" },
  { href: "/manage", text: "Manage", private: true },
];

interface Props {
  href?: string;
  sticky?: boolean;
  opaque?: boolean;
  dark?: boolean;
}

export default function Navigation({
  href,
  sticky = false,
  opaque = false,
  dark = false,
}: Props & HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(false);
  const userState = useUser();
  const pathname = usePathname();

  const activeHref = href || pathname;

  return (
    <div className="h-20 flex items-center w-full z-20 shadow gap-8 px-8 sm:px-12">
      <Link href="/">
        <Logo className="text-black" />
      </Link>
      <DesktopLinks
        handleClick={() => setOpen(false)}
        activeHref={activeHref}
        userState={userState}
      />
      <MobileBurger handleClick={() => setOpen(!open)} />
      <MobileLinks
        open={open}
        handleClick={() => setOpen(false)}
        activeHref={activeHref}
        userState={userState}
      />
    </div>
  );
}

function DesktopLinks(props: {
  handleClick: () => void;
  activeHref: string;
  userState: UserContextState;
}) {
  return (
    <div className="hidden md:flex items-center flex-1 justify-between">
      <div className="flex gap-4">
        <Links
          handleClick={props.handleClick}
          activeHref={props.activeHref}
          user={props.userState.user}
        />
      </div>
      <AccountButton />
    </div>
  );
}

function MobileBurger(props: { handleClick: () => void }) {
  return (
    <div className="md:hidden flex justify-end flex-1">
      <FontAwesomeIcon
        icon={faBars}
        className="h-6 hover:text-stone-700 cursor-pointer"
        onClick={props.handleClick}
      />
    </div>
  );
}

function MobileAccountElements({
  user,
  ...props
}: {
  user?: User;
  activeHref: string;
  handleClick: () => void;
  handleLogout: () => void;
}) {
  if (!user) {
    return <GoogleLoginButton />;
  }

  return (
    <>
      <h1>
        Logged in as <b>{user.name}</b>
      </h1>
      <Link
        href={"/account"}
        className={getLinkStyles(props.activeHref === "/account")}
        onClick={props.handleClick}
      >
        Account Settings
      </Link>
      <div className={getLinkStyles()} onClick={props.handleLogout}>
        Sign out
      </div>
    </>
  );
}

function MobileLinks(props: {
  open: boolean;
  handleClick: () => void;
  activeHref: string;
  userState: UserContextState;
}) {
  return (
    <div
      className={classNames("md:hidden fixed inset-0 flex flex-col bg-white", {
        hidden: !props.open,
      })}
    >
      <div className="flex justify-between items-center h-20 px-8">
        <Logo className="text-black" />
        <XmarkButton
          className="justify-self-end"
          handleClick={props.handleClick}
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <Links
          handleClick={props.handleClick}
          activeHref={props.activeHref}
          user={props.userState.user}
        />
        <div className="border-t border-stone-400 w-[30%]" />
        <MobileAccountElements
          activeHref={props.activeHref}
          user={props.userState.user}
          handleClick={props.handleClick}
          handleLogout={props.userState.logOut}
        />
      </div>
    </div>
  );
}

function Links(props: {
  user?: User;
  activeHref?: string;
  handleClick: () => void;
}) {
  return (
    <>
      {links.map((link) =>
        !link.private || (props.user?.accessLevel || 0) > 0 ? (
          <Link
            href={link.href}
            className={getLinkStyles(props.activeHref === link.href)}
            key={link.href}
            onClick={props.handleClick}
          >
            {link.text}
          </Link>
        ) : null
      )}
    </>
  );
}

const getLinkStyles = (isActive: boolean = false) =>
  classNames("px-3 py-1 font-medium", {
    "bg-blue-50 rounded": isActive,
  });
