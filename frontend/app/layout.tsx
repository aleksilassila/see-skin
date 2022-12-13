"use client";
import Navigation from "./(navigation)/Navigation";
import "./global.css";
import Footer from "./(footer)/Footer";
import { useUserContextValue, UserContext } from "./user";

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
        <UserContext.Provider value={userContextValue}>
          <Navigation />
          <div className="flex-1">{children}</div>
          <Footer />
        </UserContext.Provider>
      </body>
    </html>
  );
}
