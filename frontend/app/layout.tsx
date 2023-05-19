"use client";
import "./global.css";
import { UserContext, useUserContextValue } from "./user";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import React, { PropsWithChildren } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      retry: 3,
      suspense: true,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userContextValue = useUserContextValue();

  return (
    <html>
      <head>
        <title>See Skin</title>
      </head>
      <body className="min-h-screen flex flex-col">
        <UserContext.Provider value={userContextValue}>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
          {userContextValue.isSignedIn}
        </UserContext.Provider>
      </body>
    </html>
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
