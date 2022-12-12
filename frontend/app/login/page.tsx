"use client";
import Input from "../(ui)/Input";
import { useState } from "react";
import Button from "../(ui)/SimpleButton";
import { useRouter } from "next/navigation";
import { BACKEND_ENDPOINT } from "../(utils)/config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  function login() {}

  function loginWithGoogle() {
    router.replace(BACKEND_ENDPOINT + "/auth/google");
  }

  return (
    <div className="flex flex-col gap-4 py-4 bg-stone-200">
      <div>Login</div>
      <Input value={email} onValueChange={setEmail} type="email" />
      <Input value={password} onValueChange={setPassword} type="password" />
      <Button onButtonClick={login} text="Login" />
      <a href={BACKEND_ENDPOINT + "/auth/google"}>Login with Google</a>
      {/*<Button onButtonClick={loginWithGoogle} text="Login with Google" />*/}
    </div>
  );
}
