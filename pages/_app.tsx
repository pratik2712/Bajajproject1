import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../layout/layout";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <NextNProgress height={7} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
