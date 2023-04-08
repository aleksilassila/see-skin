"use client";
import { createContext, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T | null = null) {
  const [value, setValue] = useState<T | null>(
    () => JSON.parse(localStorage.getItem(key) || "null") || defaultValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue] as const;
}

export function createLocalStorageContext<T>(defaultValue: T) {
  return createContext<
    T & {
      loading: boolean;
    }
  >({
    loading: true,
    ...defaultValue,
  });
}
