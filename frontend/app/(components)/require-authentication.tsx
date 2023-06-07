"use client";
import { FunctionComponent, PropsWithChildren } from "react";
import { useSession } from "../user";
import { AnchorButton } from "./ui/button";
import { GoogleLoginButton } from "../(navigation)/account-button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export function RequireAuthentication(accessLevel = 0) {
  return (Component?: FunctionComponent<any>) =>
    function AuthenticationView(props: PropsWithChildren<{}>) {
      const session = useSession();
      const pathName = usePathname();

      if (session.loading) {
        return (
          <div className="flex items-center justify-center w-screen h-screen">
            Loading...
          </div>
        );
      }

      const hasAccess =
        (session?.user ? session.user?.accessLevel : -1) >= accessLevel;

      if (!hasAccess) {
        return (
          <div className="h-screen w-screen flex flex-col items-center justify-center">
            <h2 className="text-xl mb-2">
              {session.user
                ? "Sorry, you don't have rights to view this page"
                : "You need to be logged in to view this page."}
            </h2>
            <div className="flex gap-2">
              <AnchorButton
                intent="primary"
                leadingIcon={faArrowLeft}
                href={"/"}
              >
                To Front Page
              </AnchorButton>
              <GoogleLoginButton source={pathName} />
            </div>
          </div>
        );
      }

      if (Component) {
        return <Component {...props} />;
      } else {
        return <div>{props.children}</div>;
      }
    };
}
