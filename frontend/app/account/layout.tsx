"use client";
import { RequireAuthentication } from "../(components)/require-authentication";

import { PropsWithChildren } from "react";
import AccountSidebar from "./account-sidebar";
import { WithNavigation } from "../(navigation)/with-navigation";

function AccountLayout(props: PropsWithChildren) {
  return (
    <div className="flex-1 flex justify-center p-4 md:p-16 relative">
      <div className="flex-1 flex flex-col md:flex-row justify-center max-w-7xl gap-2 md:gap-8">
        <AccountSidebar />
        <div className="flex-1 md:mx-auto md:max-w-md lg:max-w-xl xl:max-w-2xl">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default RequireAuthentication(0)(WithNavigation(AccountLayout));
