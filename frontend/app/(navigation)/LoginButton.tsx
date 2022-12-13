"use client";
import { useRouter } from "next/navigation";
import Button from "../(ui)/SimpleButton";
import { useContext } from "react";
import { UserContext } from "../user";

export default function LoginButton() {
  const router = useRouter();
  const user = useContext(UserContext);

  function logOut() {
    user.setUser(false);
    router.push("/api/auth/logout");
  }

  if (user?.user) {
    return (
      <div>
        <div>Logged in as {user.user?.name}</div>
        <Button onButtonClick={logOut} text="Logout" />
      </div>
    );
  }

  return (
    <a href="/api/auth/google">
      <Button onButtonClick={() => {}} text={"Login"} />
    </a>
  );
}
