"use client";
import { useRouter } from "next/navigation";
import Button from "../(ui)/SimpleButton";

export default function LoginButton() {
  const router = useRouter();
  return <Button onButtonClick={() => router.push("/login")} text={"Login"} />;
}
