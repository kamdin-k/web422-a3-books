import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SWRConfig } from "swr";
import { Provider } from "jotai";
import Layout from "@/components/Layout";
import RouteGuard from "@/components/RouteGuard";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher: (...args) => fetch(...args).then(res => res.json()) }}>
      <Provider>
        <RouteGuard>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RouteGuard>
      </Provider>
    </SWRConfig>
  );
}
