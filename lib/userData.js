import { getToken } from "./authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function apiRequest(method, path) {
  try {
    const token = getToken();
    if (!token) return [];

    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      }
    });

    if (res.status === 200) {
      return await res.json();
    } else {
      return [];
    }
  } catch {
    return [];
  }
}

export async function getFavourites() {
  return apiRequest("GET", "/favourites");
}

export async function addToFavourites(id) {
  return apiRequest("PUT", `/favourites/${id}`);
}

export async function removeFromFavourites(id) {
  return apiRequest("DELETE", `/favourites/${id}`);
}

export function getHistory() {
  if (typeof window === "undefined") return [];
  const history = localStorage.getItem("history");
  return history ? JSON.parse(history) : [];
}

export function addHistory(entry) {
  if (typeof window === "undefined") return;
  const history = getHistory();
  history.push(entry);
  localStorage.setItem("history", JSON.stringify(history));
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("history");
}
