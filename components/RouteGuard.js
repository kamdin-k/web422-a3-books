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

  const publicPaths = ["/login", "/register", "/about"];

  function authCheck(url) {
    const path = url.split("?")[0];
    if (!publicPaths.includes(path) && !isAuthenticated()) {
      router.push("/login");
    }
  }

  useEffect(() => {
    const loadAppState = async () => {
      if (isAuthenticated()) {
        // set user from token
        setUser(readToken());

        try {
          const favs = await getFavourites();
          setFavouritesList(favs || []);
        } catch (err) {
          console.error("Error loading favourites:", err);
          setFavouritesList([]);
        }
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
    };

    // run on first load
    authCheck(router.asPath);
    loadAppState();

    // re-run on every route change (after login/logout, going to /books, etc.)
    const handleRouteChange = (url) => {
      authCheck(url);
      loadAppState();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, router.events, setFavouritesList, setSearchHistory, setUser]);

  return children;
}
