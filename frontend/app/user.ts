"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchApi } from "./(api)/api";
import { User } from "./(api)/api-types";
import { GetUser } from "./(api)/api-routes";
import { useRouter } from "next/navigation";

export type UserContextState = {
  user?: User;
  loading: boolean;
  isSignedIn: boolean;
  reset: () => void;
  logOut: () => void;
};

export const UserContext = createContext<UserContextState>({
  user: undefined,
  loading: true,
  isSignedIn: false,
  reset: () => {},
  logOut: () => {},
});

export function useUser() {
  return useContext(UserContext);
}

export function useUserContextValue(): UserContextState {
  const [state, setState] = useState<{
    user?: User | false;
    initialized: boolean;
  }>({ initialized: false });
  const router = useRouter();

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

  const reset = () => setState({ user: undefined, initialized: false });

  return {
    user: state.user || undefined,
    isSignedIn: !!state.user,
    loading: state.user === undefined && state.initialized,
    reset,
    logOut: () => {
      reset();
      router.push("/api/auth/logout");
    },
  };
}
