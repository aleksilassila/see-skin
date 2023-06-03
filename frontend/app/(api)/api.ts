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
  Response = T extends ApiType ? T["response"] : T,
  Params = T extends ApiType ? T["params"] : object,
  Body = T extends ApiType ? T["body"] : object
>(
  url: T extends ApiType ? T["route"] : string,
  options: AxiosRequestConfig & { data?: Body; params?: Params } = {}
): Promise<Response> =>
  axios<Response>({
    ...options,
    baseURL: "/api",
    url,
  })
    .then((res) => res.data)
    .catch((err) => err.response);

export function useFetchApi<T extends ApiType>(
  url: T extends ApiType ? T["route"] : string,
  axiosConfig: AxiosRequestConfig & {
    params?: T["params"];
    data?: T["body"];
  } = {},
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
  url: T extends ApiType ? T["route"] : string,
  config: AxiosRequestConfig = {},
  mutateOptions: UseMutationOptions<T["response"], Error, T["params"]> = {}
) {
  const mutateFn = (params: T["params"]) =>
    fetchApi<T>(url, {
      ...config,
      params: { ...params, ...config.params },
    });
  return useMutation<T["response"], Error, T["params"]>(
    mutateFn,
    mutateOptions
  );
}

export function useMutateApiWithBody<T extends ApiType>(
  url: T extends ApiType ? T["route"] : string,
  config: AxiosRequestConfig = {},
  mutateOptions: UseMutationOptions<T["response"], Error, T["params"]> = {}
) {
  const mutateFn = (params: T["params"]) =>
    fetchApi<T>(url, {
      ...config,
      data: { ...params, ...config.params },
    });
  return useMutation<T["response"], Error, T["params"]>(
    mutateFn,
    mutateOptions
  );
}
