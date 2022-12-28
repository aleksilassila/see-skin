"use client";
import { useRouter } from "next/navigation";
import { useUser } from "../user";
import { AnchorButton, Button } from "../(ui)/Button";

export default function LoginButton() {
  const router = useRouter();
  const user = useUser();

  function logOut() {
    user.setUser(false);
    router.push("/api/auth/logout");
  }

  if (user?.user) {
    return (
      <div>
        <div>Logged in as {user.user?.name}</div>
        <Button onClick={logOut}>Logout</Button>
      </div>
    );
  }

  return <AnchorButton href="/api/auth/google">Login</AnchorButton>;
}
