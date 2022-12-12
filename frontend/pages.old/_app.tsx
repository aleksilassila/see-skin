import type { AppProps } from "next/app";
import "@fontsource/josefin-slab";
import "@fontsource/dm-sans";
import "../styles/globals.css";
import { AuthProvider } from "../app/(utils)/auth";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
