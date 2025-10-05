import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  const expiration = localStorage.getItem("expiration");
  if (!token || !expiration) {
    return null;
  }
  const duration = getTokenDuration();
  if (duration < 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    return "EXPIRED";
  }
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}
export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    throw redirect("/auth?mode=login");
  }
  return null;
}
export function getTokenDuration() {
  const expiration = localStorage.getItem("expiration");
  if (!expiration) {
    return 0;
  }
  const expirationDate = new Date(expiration);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}
