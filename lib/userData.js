import { getToken } from "./authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
      ...(options.headers || {})
    }
  });

  if (res.status === 200) {
    return res.json();
  }

  return [];
}

export async function getFavourites() {
  return fetchWithAuth(`${API_URL}/user/favourites`);
}

export async function addToFavourites(id) {
  return fetchWithAuth(`${API_URL}/user/favourites/${id}`, {
    method: "PUT"
  });
}

export async function removeFromFavourites(id) {
  return fetchWithAuth(`${API_URL}/user/favourites/${id}`, {
    method: "DELETE"
  });
}

export async function getHistory() {
  return fetchWithAuth(`${API_URL}/user/history`);
}

export async function addToHistory(entry) {
  return fetchWithAuth(`${API_URL}/user/history`, {
    method: "POST",
    body: JSON.stringify(entry)
  });
}

export async function removeFromHistory(id) {
  return fetchWithAuth(`${API_URL}/user/history/${id}`, {
    method: "DELETE"
  });
}
