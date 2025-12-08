// lib/userData.js
import { getToken } from "@/lib/authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL; 
// e.g. "https://user-api-flame-ten.vercel.app/api/user"

async function authFetch(path, method = "GET") {
  const token = getToken();

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `JWT ${token}` : ""
    }
  });

  if (res.status === 200) {
    return res.json();
  } else {
    // assignment spec: if not 200, return []
    return [];
  }
}

export async function getFavourites() {
  return authFetch("/favourites", "GET");
}

export async function addToFavourites(id) {
  return authFetch(`/favourites/${id}`, "PUT");
}

export async function removeFromFavourites(id) {
  return authFetch(`/favourites/${id}`, "DELETE");
}
