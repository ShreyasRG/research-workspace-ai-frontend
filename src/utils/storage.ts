import { STORAGE_KEYS } from '../constants/storage';

export function getItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage may be full or unavailable
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // no-op
  }
}

export function getStoredAuth(): { user: unknown; token: string } | null {
  return getItem<{ user: unknown; token: string }>(STORAGE_KEYS.auth);
}

export function getAuthToken(): string | null {
  return getStoredAuth()?.token ?? null;
}
