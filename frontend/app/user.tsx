"use client";
import { createContext, useContext, useState } from "react";
import { useFetchApi } from "./(api)/api";
import { SkinProfile, User } from "./(api)/api-types";
import { GetSkinProfile, GetUser } from "./(api)/api-routes";
import { useLocalStorage } from "./utils/localstorage";

export type SessionContextState = ReturnType<typeof useSessionContextValue>;

type UserState = {
  user?: User | false;
  skinProfile?: SkinProfile | false;
};

type SessionState = {
  openSkinProfileCreation: boolean;
};

const defaultUserState = {
  user: undefined,
  skinProfile: undefined,
} satisfies UserState;
const defaultSessionState = {
  openSkinProfileCreation: false,
} satisfies SessionState;

export const SessionContext = createContext<SessionContextState>({
  ...defaultUserState,
  ...defaultSessionState,
  isSignedIn: false,
  reset: () => {},
  logOut: () => {},
  loading: false,
  setOpenSkinProfileCreation: () => {},
});

export function useSession() {
  return useContext(SessionContext);
}

export function useSessionContextValue() {
  const [sessionState, setSessionState, didLoad] =
    useLocalStorage<SessionState>(defaultSessionState, "session");
  const onError = () => false as false;
  const {
    data: user,
    error: userError,
    ...userQuery
  } = useFetchApi<GetUser>(
    "/user",
    {},
    {
      onError,
      suspense: false,
    }
  );
  const {
    data: skinProfile,
    error: skinProfileError,
    ...skinProfileQuery
  } = useFetchApi<GetSkinProfile>(
    "/skin-profile",
    {},
    {
      enabled: !!user && !userError,
      onError,
      suspense: false,
    }
  );

  const reset = () => {
    setSessionState(defaultSessionState);
  };

  function logOut() {
    reset();
    // router.push("/api/auth/logout");
    typeof window !== undefined && window.location.assign("/api/auth/logout");
  }

  const setOpenSkinProfileCreation = (open: boolean) =>
    setSessionState({ ...sessionState, openSkinProfileCreation: open });

  return {
    user: userError ? undefined : user,
    skinProfile: skinProfileError ? undefined : skinProfile,
    isSignedIn: !!user && !userError,
    loading: userQuery.isLoading || skinProfileQuery.isLoading,
    reset,
    logOut,
    openSkinProfileCreation: sessionState.openSkinProfileCreation,
    setOpenSkinProfileCreation,
  };
}
