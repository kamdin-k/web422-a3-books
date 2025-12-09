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

  useEffect(() => {
    async function init() {
      if (isAuthenticated()) {
        const token = readToken();
        setUser({ userName: token.userName });
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

    function authCheck(url) {
      const publicPaths = ["/", "/about", "/login", "/register"];
      const path = url.split("?")[0];
      if (!isAuthenticated() && !publicPaths.includes(path)) {
        router.push("/login");
      }
    }

    init();
    authCheck(router.pathname);
    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [router, setFavouritesList, setSearchHistory, setUser]);

  return children;
}
