import { useLocalStorage } from "../utils/localstorage";

export function useToggle<T extends { [key: string]: boolean }>(
  initial: T,
  localStorageKey?: string
) {
  const [state, setState] = useLocalStorage<T>(initial, localStorageKey);

  function toggle(key: keyof T) {
    return (value: boolean | undefined = undefined) => {
      setState((state) => ({
        ...state,
        [key]: value === true ? true : value === false ? false : !state[key],
      }));
    };
  }

  return { state, setState, toggle };
}

export function useSwitch<T extends { [key: string]: boolean }>(
  initial: T,
  localStorageKey?: string
) {
  const [state, setState] = useLocalStorage<T>(initial, localStorageKey);

  function toggle(key: keyof T) {
    return (value: boolean | undefined = undefined) => {
      setState((state) => ({
        ...initial,
        [key]: value === true ? true : value === false ? false : !state[key],
      }));
    };
  }

  return { state, setState, toggle };
}
