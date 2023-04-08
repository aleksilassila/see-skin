"use client";
import { createLocalStorageContext, useLocalStorage } from "./localstorage";
import { useContext } from "react";

interface PreferencesState {
  irritantIds: string[];
  setIrritantIds: (irritantIds: string[]) => void;
}

export const PreferencesContext = createLocalStorageContext<PreferencesState>({
  irritantIds: [],
  setIrritantIds: () => {},
});

export function usePreferencesContextValue() {
  const [preferencesValue, setPreferencesValue] = useLocalStorage<{
    irritantIds: string[];
  }>(
    {
      irritantIds: [],
    },
    "preferences"
  );

  return {
    irritantIds: preferencesValue?.irritantIds || [],
    setIrritantIds: (irritantIds: string[]) =>
      setPreferencesValue({ ...preferencesValue, irritantIds }),
  };
}

export function usePreferences() {
  return useContext(PreferencesContext);
}
