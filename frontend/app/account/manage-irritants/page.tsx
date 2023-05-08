"use client";
import { useFetch } from "../../(api)/api";
import routes, { ApiTypes } from "../../(api)/api-routes";

export default function ManageIrritants() {
  const { data } = useFetch<ApiTypes["user"]["get"]>(routes.user);
  console.log(data);
  return (
    <div className="m-auto max-w-2xl">
      <h1>Mange Your Irritants</h1>
      <div></div>
    </div>
  );
}
