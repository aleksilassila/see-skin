"use client";
import { useUser } from "../user";
import { AnchorButton, Button } from "../(components)/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Popover } from "@headlessui/react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import classNames from "classnames";

export function GoogleLoginButton(props: { source?: string }) {
  return (
    <AnchorButton
      intent="secondary"
      href={
        "/api/auth/google" + (props.source ? `?source=${props.source}` : "")
      }
      leadingIcon={faGoogle}
    >
      Sign in
    </AnchorButton>
  );
}

export default function AccountButton() {
  const user = useUser();

  if (!user?.user) {
    return <GoogleLoginButton />;
  }

  const menuButtonStyle = classNames(
    "block text-left w-full py-2 px-3 mouse-cursor font-normal",
    "hover:bg-zinc-100"
  );

  return (
    <div>
      <Popover className="relative">
        <Popover.Button className="outline-none">
          {({ open }) => (
            <div className="flex items-center gap-2 cursor-pointer h-10 rounded">
              <FontAwesomeIcon icon={faUser} className="h-4" />
              <FontAwesomeIcon
                icon={open ? faChevronUp : faChevronDown}
                className="h-4"
              />
            </div>
          )}
        </Popover.Button>

        <Popover.Panel className="absolute z-10 right-0 w-48 bg-white rounded-md shadow-md overflow-hidden text-sm text-zinc-700 border">
          <div className="divide-y">
            <div className="px-3 py-2">
              <div>Signed in as</div>
              <div className="font-medium text-zinc-900">{user.user.name}</div>
            </div>
            <div>
              <AnchorButton
                href="/account"
                className={menuButtonStyle}
                nextLink
                overwriteStyles
              >
                Account settings
              </AnchorButton>
            </div>
            <div>
              <Button
                overwriteStyles
                className={menuButtonStyle}
                onClick={user.logOut}
              >
                Sign out
              </Button>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
}
