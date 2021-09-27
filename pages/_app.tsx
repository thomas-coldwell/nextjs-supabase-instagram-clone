import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "../server/routers/_app";
import superjson from "superjson";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  //

  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    // during SSR rendering
    if (typeof window === "undefined") {
      return {
        url: "/api/trpc",
      };
    }
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url =
      process.env.NODE_ENV !== "development"
        ? `${window.location.origin}/api/trpc`
        : "http://localhost:3000/api/trpc";

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
