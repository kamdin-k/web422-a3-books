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
        setFavouritesList(await getFavourites());
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
    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [router.events]);

  return children;
}
