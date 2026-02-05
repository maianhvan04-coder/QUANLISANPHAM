const TOKEN_KEY = "accessToken";
const USER_KEY = "authUser";
export const AUTH_CHANGE_EVENT = "auth:change";

function notifyAuthChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  notifyAuthChange();
}
export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  notifyAuthChange();
}

export function getUser<T = unknown>(): T | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as T) : null;
}
export function setUser<T = unknown>(user: T): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  notifyAuthChange();
}
export function clearUser(): void {
  localStorage.removeItem(USER_KEY);
  notifyAuthChange();
}
