import axios, { AxiosRequestConfig } from "axios";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import { ApiType } from "./api-routes";

type QueryKey = [string, object | undefined];

export function getQueryKey(url: string, params?: object): QueryKey {
  return [url, params];
}

export const fetchApi = <
  T = any,
  Response = T extends ApiType ? T["response"] : T
>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<Response> =>
  axios<Response>({
    ...options,
    baseURL: "/api",
    url,
  }).then((res) => res.data);

export function useFetchApi<T extends ApiType>(
  url: string,
  axiosConfig: AxiosRequestConfig & { params?: T["params"] } = {},
  queryOptions: UseQueryOptions<
    T["response"],
    Error,
    T["response"],
    QueryKey
  > = {}
) {
  return useQuery<T["response"], Error, T["response"], QueryKey>(
    getQueryKey(url, axiosConfig.params),
    async () => await fetchApi<T["response"]>(url, axiosConfig),
    {
      enabled: !!url,
      ...queryOptions,
    }
  );
}

export function useMutateApiWithParams<T extends ApiType>(
  url: string,
  config: AxiosRequestConfig = {},
  mutateOptions: UseMutationOptions<T["response"], Error, T["params"]> = {}
) {
  const mutateFn = (params: T["params"]) =>
    fetchApi<T["response"]>(url, {
      ...config,
      params: { ...params, ...config.params },
    });
  return useMutation<T["response"], Error, T["params"]>(
    mutateFn,
    mutateOptions
  );
}
