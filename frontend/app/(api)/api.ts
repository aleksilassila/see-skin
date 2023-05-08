import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { ApiType } from "./api-routes";

type QueryKey = [string, object | undefined];

class Api {
  instance: AxiosInstance;

  constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl,
    });
  }

  async fetch<T = any>(url: string, config: AxiosRequestConfig = {}) {
    return this.instance<T>({ ...config, url });
  }
}

const defaultApi = new Api("/api");

export const buildUseFetch =
  (api: Api) =>
  <T extends ApiType>(
    url: string,
    params: T["params"] = {},
    axiosConfig?: AxiosRequestConfig,
    queryConfig?: UseQueryOptions<T, Error, T, QueryKey>
  ) => {
    return useQuery<T["response"], Error, T["response"], QueryKey>(
      [url, params],
      () => api.fetch<T["response"]>(url, axiosConfig).then((res) => res.data),
      {
        enabled: !!url,
        ...queryConfig,
      }
    );
  };

const api = {
  fetch: defaultApi.fetch,
  useFetch: buildUseFetch(defaultApi),
};

export default api;
