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

interface Stored<T> {
  state: T;
  initialized: boolean;
}

export function useLocalStorage<T>(
  defaultValue: T,
  key?: string,
  ...dontStore: (keyof T)[]
) {
  const defaultState = {
    state: defaultValue,
    initialized: false,
  };

  const [value, setValue] = useState<Stored<T>>(defaultState);

  // Restore state
  useEffect(() => {
    if (key) {
      const saved = getStorageValue(key, defaultState);

      dontStore.forEach((key) => {
        saved.state[key] = defaultValue[key];
      });

      setValue({ ...saved, initialized: true });
    } else {
      setValue({ ...value, initialized: true });
    }
  }, []);

  // Store state
  useEffect(() => {
    if (!key || !value.initialized) return;

    const toStore = JSON.parse(JSON.stringify(value));
    dontStore.forEach((key) => {
      delete toStore[key];
    });

    localStorage.setItem(key, JSON.stringify(toStore));
  }, [value]);

  function update(newState: T | ((oldState: T) => T)) {
    if (typeof newState === "function") {
      setValue((oldState) => ({
        ...oldState,
        state: (<(oldState: T) => T>newState)(oldState.state),
      }));
    } else {
      setValue((oldState) => ({
        ...oldState,
        state: newState,
      }));
    }
  }

  return [value.state, update, value.initialized] as const;
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
