import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom, userAtom } from "@/store";
import { isAuthenticated, readToken } from "@/lib/authenticate";
import { getFavourites } from "@/lib/userData";

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);
  const [, setUser] = useAtom(userAtom);

  function authCheck(url) {
    const publicPaths = ["/login", "/register", "/about"];
    const path = url.split("?")[0];
    if (!publicPaths.includes(path) && !isAuthenticated()) {
      router.push("/login");
    }
  }

  useEffect(() => {
    async function init() {
      if (isAuthenticated()) {
        const token = readToken();
        if (token && token.userName) {
          setUser(token.userName);
        }
        const favs = await getFavourites();
        setFavouritesList(favs);
      } else {
        setUser(null);
        setFavouritesList([]);
      }

      if (typeof window !== "undefined") {
        const history = localStorage.getItem("history");
        if (history) {
          setSearchHistory(JSON.parse(history));
        }
      }
    }

    init();
    authCheck(router.pathname);

    const handleRouteChange = (url) => {
      authCheck(url);
      init();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.pathname, router.events, setFavouritesList, setSearchHistory, setUser]);

  return children;
}
