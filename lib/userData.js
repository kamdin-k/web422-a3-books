import { getToken } from "@/lib/authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchWithAuth(url, method = "GET") {
  const token = getToken();
  if (!token) return [];

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}

export async function getFavourites() {
  return await fetchWithAuth(`${API_URL}/api/user/favourites`);
}

export async function addToFavourites(id) {
  return await fetchWithAuth(
    `${API_URL}/api/user/favourites/${id}`,
    "PUT"
  );
}

export async function removeFromFavourites(id) {
  return await fetchWithAuth(
    `${API_URL}/api/user/favourites/${id}`,
    "DELETE"
  );
}
