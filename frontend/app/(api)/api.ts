import { fetch } from "next/dist/compiled/@edge-runtime/primitives/fetch";
export default class Api {
  static async fetch<T>(url: string) {
    return fetch("http://backend:9000" + url);
  }
}
