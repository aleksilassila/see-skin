"use client";
import Navigation from "./(navigation)/Navigation";
import "./global.css";
import Footer from "./(footer)/Footer";
import { useUserContextValue, UserContext } from "./user";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import React from "react";

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

  // if (userContextValue.loading) {
  //   return (
  //     <html>
  //       <head>
  //         <title>See Skin</title>
  //       </head>
  //       <body className="min-h-screen flex flex-col">
  //         <UserContext.Provider value={userContextValue}>
  //           <div className="flex-1">Loading</div>
  //         </UserContext.Provider>
  //       </body>
  //     </html>
  //   );
  // }

  return (
    <html>
      <head>
        <title>See Skin</title>
      </head>
      <body className="min-h-screen flex flex-col">
        <QueryClientProvider client={queryClient}>
          <UserContext.Provider value={userContextValue}>
            <Navigation />
            <div className="flex-1 flex flex-col">{children}</div>
            <Footer />
          </UserContext.Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
