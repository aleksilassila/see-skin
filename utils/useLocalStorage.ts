import { useEffect, useState } from "react";

export const useLocalStorage = <T = object>(key: string): T | null => {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setValue(JSON.parse(window.localStorage.getItem(key) || ""));
    }
  }, []);

  return value;
};
