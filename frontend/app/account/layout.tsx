"use client";
import { useUser } from "../user";
import { PropsWithChildren } from "react";
import WithNav from "../with-nav";

export default function AccountLayout({ children }: PropsWithChildren<{}>) {
  const user = useUser();

  if (user.loading) {
    return <div>Loading...</div>;
  }

  if (!user.user) {
    return <div>Not logged in</div>;
  }

  return <WithNav>{children}</WithNav>;
}
