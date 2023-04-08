import { useState } from "react";
import { useLocalStorage } from "../utils/localstorage";

export function useToggle<T extends { [key: string]: boolean }>(
  initial: T,
  localStorageKey?: string
) {
  const [state, setState] = useLocalStorage<T>(initial, localStorageKey);

  function toggle(key: keyof T) {
    setState((state) => ({
      ...state,
      [key]: !state[key],
    }));
  }

  return { state, setState, toggle };
}
