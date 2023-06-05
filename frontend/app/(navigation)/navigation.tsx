"use client";
import { HTMLAttributes } from "react";
import Logo from "./logo";
import Link from "next/link";
import AccountButton, { GoogleLoginButton } from "./account-button";
import { UserContextState, useUser } from "../user";
import { User } from "../(api)/api-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBoxesStacked,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { XmarkButton } from "../(components)/ui/button";
import { usePathname } from "next/navigation";
import { useVisibleState } from "../(components)/ui/drawer";

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
  const visibleState = useVisibleState();
  const userState = useUser();
  const pathname = usePathname();

  const activeHref = href || pathname;

  return (
    <div className="h-20 flex items-center w-full z-20 shadow gap-8 px-8 sm:px-12">
      <Link href="/">
        <Logo className="text-black" />
      </Link>
      <DesktopLinks
        handleClick={visibleState.close}
        activeHref={activeHref}
        userState={userState}
      />
      <MobileBurger handleClick={visibleState.toggle} />
      <MobileLinks
        isVisible={visibleState.isVisible}
        handleClose={visibleState.close}
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

function MobileLinks(props: {
  isVisible: boolean;
  handleClose: () => void;
  activeHref: string;
  userState: UserContextState;
}) {
  const labelStyle = "font-medium text-lg";
  const linkStyle = classNames(
    labelStyle,
    "text-stone-700 active:text-black hover:text-black"
  );

  const sectionHeadingStyle = classNames(
    labelStyle,
    "bg-stone-200 py-1 px-6 flex gap-4 items-center"
  );
  const sectionContainerStyle = "flex flex-col px-6 gap-2";

  return (
    <div
      className={classNames("md:hidden fixed inset-0 flex flex-col bg-white", {
        hidden: !props.isVisible,
      })}
    >
      <div className="flex justify-between items-center h-20 px-8">
        <Logo className="text-black" />
        <XmarkButton
          className="justify-self-end"
          handleClick={props.handleClose}
        />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <Link className={sectionHeadingStyle} href="/products">
          <FontAwesomeIcon icon={faShoppingBag} />
          Products
        </Link>
        <div className="grid grid-cols-2">
          <div className={sectionContainerStyle}>
            <div className={labelStyle}>Category</div>
            <Link className={linkStyle} href="/products">
              Moisturizers
            </Link>
            <Link className={linkStyle} href="/products">
              Cleansers
            </Link>
            <Link className={linkStyle} href="/products">
              Sunscreen
            </Link>
            <Link className={linkStyle} href="/products">
              Toners
            </Link>
            <Link className={linkStyle} href="/products">
              Treatments
            </Link>
          </div>
          <div className={sectionContainerStyle}>
            <div className={labelStyle}>Concern</div>
            <Link className={linkStyle} href="/products">
              Acne
            </Link>
            <Link className={linkStyle} href="/products">
              Anti-Aging
            </Link>
            <Link className={linkStyle} href="/products">
              Damage
            </Link>
            <Link className={linkStyle} href="/products">
              UV
            </Link>
            <Link className={linkStyle} href="/products">
              Dullness
            </Link>
          </div>
        </div>
        <Link href="/account" className={sectionHeadingStyle}>
          <FontAwesomeIcon icon={faBoxesStacked} />
          Skin Solver
        </Link>
        {props.userState.isSignedIn ? (
          <div className={sectionContainerStyle}>
            <Link className={linkStyle} href="/">
              Edit your products
            </Link>
            <Link className={linkStyle} href="/">
              Results
            </Link>
            <Link className={linkStyle} href="/">
              Ingredient filtering
            </Link>
            <Link className={linkStyle} href="/">
              Skin Profile
            </Link>
            <button
              onClick={props.userState.logOut}
              className={classNames(linkStyle, "cursor-pointer text-left")}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex px-6">
            <GoogleLoginButton />
          </div>
        )}
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
    "text-indigo-900": isActive,
  });
