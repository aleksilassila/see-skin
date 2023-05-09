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

const fetcher = <T>(
  url: string,
  options: AxiosRequestConfig<T> = {}
): Promise<T> =>
  axios<T>({
    ...options,
    baseURL: "/api",
    url,
  }).then((res) => res.data);

const defaultApi = new Api("/api");

export const buildUseFetch = (api: Api) =>
  function useFetch<T extends ApiType>(
    url: string,
    options: {
      params?: T["params"];
      axiosConfig?: AxiosRequestConfig<T["response"]>;
      queryConfig?: UseQueryOptions<
        T["response"],
        Error,
        T["response"],
        QueryKey
      >;
    } = {}
  ) {
    return useQuery<T["response"], Error, T["response"], QueryKey>(
      [url, options.params],
      async () =>
        await fetcher<T["response"]>(url, {
          ...options.axiosConfig,
          params: {
            ...options.axiosConfig?.params,
            ...options.params,
          },
        }),
      {
        enabled: !!url,
        ...options.queryConfig,
      }
    );
  };

export const fetch = defaultApi.fetch.bind(defaultApi);
export const useFetch = buildUseFetch(defaultApi);
