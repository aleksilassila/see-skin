"use client";
import Input from "../(components)/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../(components)/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  function login() {}

  return (
    <div className="flex flex-col gap-4 py-4 bg-stone-200">
      <div>Login</div>
      <Input value={email} onValueChange={setEmail} type="email" />
      <Input value={password} onValueChange={setPassword} type="password" />
      <Button onClick={login}>Login</Button>
      <a href={"/api/auth/google"}>Login with Google</a>
      {/*<Button onButtonClick={loginWithGoogle} text="Login with Google" />*/}
    </div>
  );
}
