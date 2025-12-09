import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { isAuthenticated } from "@/lib/authenticate";
import { getFavourites } from "@/lib/userData";

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [, setFavourites] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  function authCheck(url) {
    const publicPaths = ["/login", "/register", "/about"];
    const path = url.split("?")[0];
    if (!publicPaths.includes(path) && !isAuthenticated()) {
      router.push("/login");
    }
  }

  async function loadInitialData() {
    if (isAuthenticated()) {
      const favs = await getFavourites();
      setFavourites(favs);
    }
    if (typeof window !== "undefined") {
      const history = localStorage.getItem("history");
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    }
  }

  useEffect(() => {
    authCheck(router.pathname);
    loadInitialData();
    const handleRouteChange = (url) => {
      authCheck(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return children;
}
