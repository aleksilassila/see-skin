"use client";
import { useRouter } from "next/navigation";
import { useUser } from "../user";
import { AnchorButton, Button } from "../(ui)/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { Popover } from "@headlessui/react";

export default function LoginButton() {
  const router = useRouter();
  const user = useUser();

  function logOut() {
    user.setUser(false);
    router.push("/api/auth/logout");
  }

  if (!user?.user) {
    return (
      <AnchorButton intent="secondary" href="/api/auth/google">
        Login
      </AnchorButton>
    );
  }

  return (
    <div>
      <Popover className="relative">
        <Popover.Button>
          <div className="flex items-center gap-2 cursor-pointer px-6 h-10 rounded">
            <FontAwesomeIcon icon={faUser} className="h-4" />
            <FontAwesomeIcon icon={faChevronDown} className="h-4" />
          </div>
        </Popover.Button>

        <Popover.Panel className="absolute z-10 right-0 w-48 bg-white rounded-md shadow">
          <div className="p-2 flex flex-col gap-2">
            <span className="text-center font-medium">{user.user.name}</span>
            <Button className="w-full" onClick={logOut}>
              Log out
            </Button>
          </div>
        </Popover.Panel>
      </Popover>

      {/*<Button onClick={logOut}>Logout</Button>*/}
    </div>
  );
}
