import { getToken } from "./authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchWithAuth(path, options = {}) {
  const token = getToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("API error", res.status, path, text);
    return [];
  }

  return res.json();
}

// ------- FAVOURITES -------
export async function getFavourites() {
  return fetchWithAuth("/api/user/favourites");
}

export async function addToFavourites(id) {
  return fetchWithAuth(`/api/user/favourites/${id}`, {
    method: "PUT"
  });
}

export async function removeFromFavourites(id) {
  return fetchWithAuth(`/api/user/favourites/${id}`, {
    method: "DELETE"
  });
}

// ------- HISTORY (same idea) -------
export async function getHistory() {
  return fetchWithAuth("/api/user/history");
}

export async function addToHistory(entry) {
  return fetchWithAuth("/api/user/history", {
    method: "POST",
    body: JSON.stringify(entry)
  });
}

export async function removeFromHistory(id) {
  return fetchWithAuth(`/api/user/history/${id}`, {
    method: "DELETE"
  });
}
