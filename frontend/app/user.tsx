"use client";
import { createContext, FunctionComponent, useContext, useState } from "react";
import { useFetchApi } from "./(api)/api";
import { SkinProfile, User } from "./(api)/api-types";
import { GetSkinProfile, GetUser } from "./(api)/api-routes";
import { useSearchParams } from "next/navigation";
import { useLocalStorage } from "./utils/localstorage";

export type SessionContextState = ReturnType<typeof useUserContextValue>;

type StoredState = {
  user?: User | false;
  skinProfile?: SkinProfile | false;
};

type SavedState = {
  openSkinProfileCreation: boolean;
};

const defaultState = {
  user: undefined,
  skinProfile: undefined,
} satisfies StoredState;
const defaultSavedState = {
  openSkinProfileCreation: false,
} satisfies SavedState;

export const UserContext = createContext<SessionContextState>({
  ...defaultState,
  ...defaultSavedState,
  isSignedIn: false,
  reset: () => {},
  logOut: () => {},
  loading: false,
  setOpenSkinProfileCreation: () => {},
});

export function useUser() {
  return useContext(UserContext);
}

export function useUserContextValue() {
  const [sessionId, setSessionId] = useState(Math.random());
  const resetSession = () => setSessionId(Math.random());

  const [savedState, setSavedState, didLoad] = useLocalStorage<SavedState>(
    defaultSavedState,
    "session"
  );
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

  // const router = useRouter();

  // useEffect(() => {
  //   if (!didLoad) return;
  //
  //   function refresh(
  //     user: StoredState["user"],
  //     skinProfile: StoredState["skinProfile"]
  //   ) {
  //     setState({
  //       ...state,
  //       user,
  //       skinProfile,
  //       didRefresh: true,
  //     });
  //   }
  //
  //   const fetchUser = () =>
  //     fetchApi<GetUser>("/user").catch(() => false as false);
  //   const fetchSkinProfile = () =>
  //     fetchApi<GetSkinProfile>("/skin-profile").catch(() => false as false);
  //
  //   async function updateBoth() {
  //     const [user, skinProfile] = await Promise.all([
  //       fetchUser(),
  //       fetchSkinProfile(),
  //     ]);
  //
  //     refresh(user, skinProfile);
  //   }
  //
  //   if (!state.didRefresh) {
  //     updateBoth();
  //   } else if (state.skinProfile === undefined) {
  //     fetchSkinProfile().then((skinProfile) =>
  //       refresh(state.user, skinProfile)
  //     );
  //   }
  // }, [state]);

  const reset = () => {
    setSavedState(defaultSavedState);
    resetSession();
  };

  function logOut() {
    reset();
    // router.push("/api/auth/logout");
    typeof window !== undefined && window.location.assign("/api/auth/logout");
  }

  const setOpenSkinProfileCreation = (open: boolean) =>
    setSavedState({ ...savedState, openSkinProfileCreation: open });

  return {
    user: userError ? false : user || undefined,
    skinProfile: skinProfileError ? false : skinProfile || undefined,
    isSignedIn: !!user && !userError,
    loading: userQuery.isLoading || skinProfileQuery.isLoading,
    reset,
    logOut,
    openSkinProfileCreation: savedState.openSkinProfileCreation,
    setOpenSkinProfileCreation,
  };
}

export const WithLogin = (Component: FunctionComponent) =>
  function LoginComponent() {
    const searchParams = useSearchParams();

    const signIn = searchParams.get("signIn") === "true";

    const session = useUser();

    if (signIn && !session.isSignedIn) session.reset();

    return <Component />;
  };
