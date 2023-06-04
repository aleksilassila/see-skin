import { useLocalStorage } from "../utils/localstorage";

export function useToggle<T extends string>(
  initial: Record<T, boolean>,
  localStorageKey?: string
) {
  const [state, setState] = useLocalStorage(initial, localStorageKey);

  function toggle(key: keyof typeof initial) {
    return (value: boolean | undefined = undefined) => {
      setState((state) => ({
        ...state,
        [key]: value === true ? true : value === false ? false : !state[key],
      }));
    };
  }

  return { state, setState, toggle };
}

export function useSwitch<T extends string>(
  initial: Record<T, boolean>,
  localStorageKey?: string
) {
  const [state, setState] = useLocalStorage(initial, localStorageKey);

  function toggle(key: keyof typeof initial) {
    return (value?: boolean) => {
      setState((state) => ({
        ...initial,
        [key]: value === true ? true : value === false ? false : !state[key],
      }));
    };
  }

  const activeItem: T | undefined = Object.keys(state).find(
    (key) => state[key as T] === true
  ) as T;

  return { state, setState, toggle, activeItem };
}
