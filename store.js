// store.js
import { atom } from "jotai";
import { readToken } from "@/lib/authenticate";

export const favouritesAtom = atom([]);
export const searchHistoryAtom = atom([]);

// holds the decoded JWT (or null)
export const userAtom = atom(readToken());
