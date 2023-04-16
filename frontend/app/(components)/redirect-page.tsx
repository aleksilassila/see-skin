"use client";
import { useRouter } from "next/navigation";

export default function RedirectPage(href: string) {
  return function Redirector() {
    const router = useRouter();

    router.replace(href);

    return <></>;
  };
}
