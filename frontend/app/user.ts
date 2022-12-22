"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Api from "./(api)/api";

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

function getCachedUser(): User | null {
  return JSON.parse(localStorage.getItem("user") || "null") || null;
}

function cacheUser(user?: User) {
  if (!user) {
    localStorage.removeItem("user");
  } else {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

async function fetchUser(): Promise<User | false> {
  return await Api.fetch<User>("/user")
    .then((user) => {
      cacheUser(user.data);
      return user.data;
    })
    .catch(() => {
      cacheUser();
      return false;
    });
}

export function useUser() {
  return useContext(UserContext);
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

    // Validate user
    setState({ user: getCachedUser(), initialized: true });
    fetchUser().then((user) => setState({ ...state, user }));
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
