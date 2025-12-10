import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom, userAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import { isAuthenticated, readToken } from "@/lib/authenticate";

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (isAuthenticated()) {
      const tokenData = readToken();

      if (!user || user.userName !== tokenData.userName) {
        setUser({
          userName: tokenData.userName,
          email: tokenData.email || ""
        });

        getFavourites().then(favs => {
          setFavouritesList(Array.isArray(favs) ? favs : []);
        });

        getHistory().then(history => {
          setSearchHistory(Array.isArray(history) ? history : []);
        });
      }
    } else {
      setUser(null);
      setFavouritesList([]);
      setSearchHistory([]);

      if (router.pathname === "/favourites" || router.pathname === "/history") {
        router.push("/login");
      }
    }
  }, [router.pathname]);

  return children;
}
