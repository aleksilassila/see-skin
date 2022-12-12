"use client";
import { createContext, useEffect, useState } from "react";

type User = {
  userId: string;
  name: string;
} | null;

export type UserContextState = {
  user: User;
  loading: boolean;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextState>({
  user: null,
  loading: true,
  setUser: () => {},
});

async function fetchUser() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  if (storedUser) {
    return storedUser;
  }
  return await fetch("/api/users")
    .then((res) => res.json())
    .catch((e) => null);
}

export function useUserContextValue(): UserContextState {
  const [state, setState] = useState<{ user: User; loading: boolean }>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    fetchUser().then((user) => {
      setState({ user, loading: false });
    });

    // const user =
    //   JSON.parse(localStorage.getItem("user") || "null") || fetchUser();
    //
    // setState({
    //   user: user || null,
    //   loading: false,
    // });
  }, []);

  return {
    user: state.user,
    setUser: (user) => setState({ ...state, user }),
    loading: state.loading,
  };
}
