import { getToken } from "./authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function authorizedRequest(method, route) {
  const token = getToken();
  const res = await fetch(`${API_URL}${route}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    }
  });

  if (res.status === 200) {
    return res.json();
  }

  return [];
}

export async function getFavourites() {
  return authorizedRequest("GET", "/favourites");
}

export async function addToFavourites(id) {
  return authorizedRequest("PUT", `/favourites/${id}`);
}

export async function removeFromFavourites(id) {
  return authorizedRequest("DELETE", `/favourites/${id}`);
}

export async function clearFavourites() {
  return authorizedRequest("PUT", "/favourites/clear");
}

export function clearHistory() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("history");
  }
}
