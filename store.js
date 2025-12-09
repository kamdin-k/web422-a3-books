import { atom } from "jotai";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export const userAtom = atom(null);
export const favouritesAtom = atom([]);
export const searchHistoryAtom = atom([]);

export const addFavouriteAtom = atom(
  null,
  async (get, set, workId) => {
    const updated = await addToFavourites(workId);
    set(favouritesAtom, updated);
  }
);

export const removeFavouriteAtom = atom(
  null,
  async (get, set, workId) => {
    const updated = await removeFromFavourites(workId);
    set(favouritesAtom, updated);
  }
);
