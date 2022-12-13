"use client";
import { createContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  accessLevel: number;
}

export type UserContextState = {
  user: User | null | false;
  loading: boolean;
  setUser: (user: User | false) => void;
};

export const UserContext = createContext<UserContextState>({
  user: null,
  loading: true,
  setUser: () => {},
});

async function fetchUser() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  console.log("LocalStorage user", storedUser);

  if (storedUser) {
    return storedUser;
  }

  console.log("Doing user fetch");
  return await fetch("/api/users")
    .then((res) => res.json())
    .catch((e) => null);
}

export function useUserContextValue(): UserContextState {
  const [state, setState] = useState<{
    user: User | null | false;
    initialized: boolean;
  }>({
    user: null,
    initialized: false,
  });

  useEffect(() => {
    if (state.initialized) return;

    setState({ user: null, initialized: true });

    console.log("Fetching user");
    fetchUser().then((user) => {
      if (user) {
        window.localStorage.setItem("user", JSON.stringify(user));
        setState({ ...state, user });
      } else {
        window.localStorage.removeItem("user");
        setState({ ...state, user: false });
      }
    });
  }, []);

  return {
    user: state.user,
    setUser: (user) => {
      if (user === null) {
        window.localStorage.removeItem("user");
      } else {
        localStorage.setItem("user", JSON.stringify(user));
      }
      setState({ ...state, user });
    },
    loading: state.user === null,
  };
}
