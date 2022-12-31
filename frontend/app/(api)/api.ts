import axios, { AxiosRequestConfig } from "axios";

export default class Api {
  static serverAxiosInstance = axios.create({
    baseURL: "http://localhost:9000/api",
  });
  static clientAxiosInstance = axios.create({
    baseURL: "/api",
  });

  static async serverFetch<T = any>(
    url: string,
    config: AxiosRequestConfig = {}
  ) {
    return this.serverAxiosInstance<T>({
      ...config,
      url,
    });
  }

  static async fetch<T = any>(url: string, config: AxiosRequestConfig = {}) {
    return this.clientAxiosInstance<T>({ ...config, url });
  }
}
