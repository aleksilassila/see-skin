"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { fetch } from "./(api)/api";
import { UserWithSkinProfile } from "./(api)/types";
import routes from "./(api)/api-routes";

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
    fetch<UserWithSkinProfile>(routes.user)
      .then((res) => res.data)
      .then((user) => setState({ ...state, user }))
      .catch((err) => {
        setState({ ...state, user: false });
        console.error(err);
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
