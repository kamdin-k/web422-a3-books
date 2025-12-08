import { jwtDecode } from "jwt-decode";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function setToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", token);
  }
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
}

export function readToken() {
  try {
    const token = getToken();
    if (!token) return null;
    return jwtDecode(token);
  } catch (err) {
    console.error("Error decoding token", err);
    return null;
  }
}

export function isAuthenticated() {
  const token = readToken();
  if (!token || !token.exp) return false;
  return Date.now() < token.exp * 1000;
}

export async function authenticateUser(user, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user, password }),
  });

  const data = await res.json();

  if (res.status === 200 && data.token) {
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message || "Unable to authenticate user");
  }
}

export async function registerUser(user, password, password2) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user, password, password2 }),
  });

  const data = await res.json();

  if (res.status === 200) {
    return true;
  } else {
    throw new Error(data.message || "Unable to register user");
  }
}
