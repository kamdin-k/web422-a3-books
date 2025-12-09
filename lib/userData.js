import { getToken } from "./authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function apiRequest(path, method = "GET", body = null) {
  const token = getToken();
  if (!token) return [];

  const options = {
    method,
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_URL}${path}`, options);
  if (res.status === 200) {
    return res.json();
  }
  return [];
}

export async function getFavourites() {
  return await apiRequest("/api/user/favourites");
}

export async function addToFavourites(id) {
  return await apiRequest(`/api/user/favourites/${id}`, "PUT");
}

export async function removeFromFavourites(id) {
  return await apiRequest(`/api/user/favourites/${id}`, "DELETE");
}

export async function getHistory() {
  return await apiRequest("/api/user/history");
}

export async function addToHistory(entry) {
  return await apiRequest("/api/user/history", "POST", entry);
}

export async function deleteHistory(id) {
  return await apiRequest(`/api/user/history/${id}`, "DELETE");
}

export function clearHistory() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("history");
  }
}
