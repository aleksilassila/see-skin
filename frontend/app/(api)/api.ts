import axios, { AxiosRequestConfig } from "axios";
import {
  QueryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import { ApiType, BuildRoute } from "./api-routes";

type QueryKey = [string, object | undefined];

type AxiosConfig<T extends ApiType> = AxiosRequestConfig<T["body"]> & {
  params?: T["params"];
};

export function getQueryKey(url: string, params?: object): QueryKey {
  return [url, params];
}

export const fetchApi = <T extends ApiType>(
  url: T["route"],
  options: AxiosConfig<T> = {}
) =>
  axios<T["response"]>({
    ...options,
    baseURL: "/api",
    url,
  }).then((res) => res.data);

export function useFetchApi<T extends ApiType>(
  url: T["route"],
  axiosConfig: AxiosConfig<T> = {},
  queryOptions: UseQueryOptions<T["response"], Error> = {}
) {
  return useQuery<T["response"], Error>(
    getQueryKey(url, axiosConfig.params),
    async () => await fetchApi<T>(url, axiosConfig),
    {
      enabled: !!url,
      ...queryOptions,
    }
  );
}

// export function useMutateApiWithParams<T extends ApiType>(
//   url: T extends ApiType ? T["route"] : string,
//   config: AxiosRequestConfig = {},
//   mutateOptions: UseMutationOptions<T["response"], Error, T["params"]> = {}
// ) {
//   const mutateFn = (params: T["params"]) =>
//     fetchApi<T>(url, {
//       ...config,
//       params: { ...params, ...config.params },
//     });
//   return useMutation<T["response"], Error, T["params"]>(
//     mutateFn,
//     mutateOptions
//   );
// }

export function useMutateApiWithBody<T extends ApiType>(
  url: T extends ApiType ? T["route"] : string,
  config: AxiosRequestConfig = {},
  mutateOptions: UseMutationOptions<T["response"], Error, T["params"]> = {}
) {
  const mutateFn = (params: T["params"]) =>
    fetchApi<T>(url, {
      ...config,
      data: { ...params, ...config.params },
    } as any);
  return useMutation<T["response"], Error, T["params"]>(
    mutateFn,
    mutateOptions
  );
}

export function useMutate<T extends ApiType>(
  url: T["route"],
  mutateOptions: UseMutationOptions<T["response"], Error, AxiosConfig<T>> = {}
) {
  return useMutation(
    (config) => fetchApi<T>(url as any, config as any),
    mutateOptions
  );
}
