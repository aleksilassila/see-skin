"use client";
import "./global.css";
import { UserContext, useUserContextValue } from "./user";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import React, { PropsWithChildren } from "react";
import { useSearchParams } from "next/navigation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      retry: 3,
      suspense: true,
      useErrorBoundary: false,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>See Skin</title>
      </head>
      <body className="min-h-screen flex flex-col">
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

function SessionProvider(props: PropsWithChildren) {
  const userContextValue = useUserContextValue();
  //
  // const searchParams = useSearchParams();
  //
  // const signIn = searchParams.get("signIn") === "true";

  // if (signIn && !userContextValue.isSignedIn) userContextValue.reset();

  return (
    <UserContext.Provider value={userContextValue}>
      {props.children}
    </UserContext.Provider>
  );
}

// function UserContextProvider(props: PropsWithChildren) {
//   const userContextValue = useUserContextValue();
//
//   return (
//     <UserContext.Provider value={userContextValue}>
//       {props.children}
//     </UserContext.Provider>
//   );
// }
