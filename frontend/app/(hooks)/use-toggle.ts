import { useState } from "react";

export function useToggle<T extends { [key: string]: boolean }>(initial: T) {
  const [state, setState] = useState<T>(initial);

  function toggle(key: keyof T) {
    setState((state) => ({
      ...state,
      [key]: !state[key],
    }));
  }

  return { state, setState, toggle };
}
