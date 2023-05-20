"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchApi } from "./(api)/api";
import { User } from "./(api)/api-types";
import { GetUser } from "./(api)/api-routes";

export type UserContextState = {
  user?: User | false;
  loading: boolean;
  isSignedIn: boolean;
  reset: Function;
};

export const UserContext = createContext<UserContextState>({
  user: undefined,
  loading: true,
  isSignedIn: false,
  reset: () => {},
});

export function useUser() {
  return useContext(UserContext);
}

export function useUserContextValue(): UserContextState {
  const [state, setState] = useState<{
    user?: User | false;
    initialized: boolean;
  }>({ initialized: false });

  useEffect(() => {
    if (state.initialized) return;
    setState({ ...state, initialized: true });

    fetchApi<GetUser>("/user")
      .then((user) =>
        setState({
          user,
          initialized: true,
        })
      )
      .catch((err) => setState({ user: false, initialized: true }));
  }, []);

  return {
    user: state.user,
    isSignedIn: !!state.user,
    loading: state.user === undefined && state.initialized,
    reset: () => setState({ user: undefined, initialized: false }),
  };
}
