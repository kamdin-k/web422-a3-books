import { getToken } from "./authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getAuthHeader() {
  const token = getToken();
  return token ? { Authorization: `JWT ${token}` } : {};
}

export async function getFavourites() {
  const res = await fetch(`${API_URL}/favourites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}

export async function addToFavourites(id) {
  const res = await fetch(`${API_URL}/favourites/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}

export async function removeFromFavourites(id) {
  const res = await fetch(`${API_URL}/favourites/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}
