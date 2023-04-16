"use client";
import { FunctionComponent, PropsWithChildren } from "react";
import { useUser } from "../user";
import { AnchorButton } from "../(ui)/button";
import LoginButton from "../(navigation)/LoginButton";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function RequireAuthentication(
  accessLevel = 0,
  Component?: FunctionComponent<any>
) {
  return function AuthenticationView() {
    const user = useUser();

    if (user.loading) {
      return (
        <div className="flex items-center justify-center w-screen h-screen">
          Loading...
        </div>
      );
    }

    const hasAccess =
      ((user?.user && user.user.accessLevel) || -1) >= accessLevel;

    if (!hasAccess) {
      return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
          <h2 className="text-xl mb-2">
            {user.user
              ? "You need to be logged in to view this page."
              : "Sorry, you don't have rights to view this page"}
          </h2>
          <div className="flex gap-2">
            <AnchorButton intent="primary" leadingIcon={faArrowLeft} href={"/"}>
              To Front Page
            </AnchorButton>
            <LoginButton />
          </div>
        </div>
      );
    }

    if (Component) {
      return <Component />;
    } else {
      return function PassThrough({ children }: PropsWithChildren<{}>) {
        return <>{children}</>;
      };
    }
  };
}
