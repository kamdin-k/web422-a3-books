import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { isAuthenticated } from "@/lib/authenticate";
import { getFavourites } from "@/lib/userData";

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  // Only /login, /register, /about are public.
  // (If you want the search page to be public too, add "/" here.)
  const publicPaths = ["/login", "/register", "/about"];

  function authCheck(url) {
    const path = url.split("?")[0];
    if (!publicPaths.includes(path) && !isAuthenticated()) {
      router.push("/login");
    }
  }

  useEffect(() => {
    // load favourites + search history from API / localStorage
    const loadAppState = async () => {
      if (isAuthenticated()) {
        try {
          const favs = await getFavourites();
          setFavouritesList(favs || []);
        } catch (err) {
          console.error("Error loading favourites:", err);
          setFavouritesList([]);
        }
      } else {
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

    // run on every route change (after login/logout, going to /books, /favourites, etc.)
    const handleRouteChange = (url) => {
      authCheck(url);
      loadAppState();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, router.events, setFavouritesList, setSearchHistory]);

  return children;
}
