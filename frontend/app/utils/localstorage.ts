"use client";
import { createContext, useEffect, useState } from "react";

function getStorageValue<T>(key: string, defaultValue: T) {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  } else {
    return defaultValue;
  }
}

export function useLocalStorage<T>(defaultValue: T, key?: string) {
  const [value, setValue] = useState<T>(() => defaultValue);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) setInitialized(true);
    if (key) {
      setValue(getStorageValue(key, defaultValue));
    }
  }, []);

  useEffect(() => {
    if (key && initialized) localStorage.setItem(key, JSON.stringify(value));
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
