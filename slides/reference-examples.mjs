export const referenceExamples = {
  fetch: `import { useEffect, useState } from "react";

export type User = { id: number; name: string; email: string };
export type Decoder<T> = (value: unknown) => T;

export function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function decodeUsers(value: unknown): User[] {
  if (!Array.isArray(value)) throw new Error("Expected a user array");
  return value.map((item: unknown) => {
    if (typeof item !== "object" || item === null ||
        !("id" in item) || typeof item.id !== "number" ||
        !Number.isFinite(item.id) ||
        !("name" in item) || typeof item.name !== "string" ||
        !("email" in item) || typeof item.email !== "string") {
      throw new Error("Invalid user record");
    }
    return { id: item.id, name: item.name, email: item.email };
  });
}

export async function getJson<T>(
  url: string, decode: Decoder<T>, signal: AbortSignal
): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error("HTTP " + response.status);
  const raw: unknown = await response.json();
  return decode(raw);
}

export function useFetch<T>(url: string, decode: Decoder<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const request = new AbortController();
    const live = () => !request.signal.aborted;
    setLoading(true);
    setError(null);
    setData(null);
    getJson(url, decode, request.signal)
      .then(value => { if (live()) setData(value); })
      .catch((error: unknown) => {
        if (live()) setError(messageOf(error));
      })
      .finally(() => { if (live()) setLoading(false); });
    return () => request.abort();
  }, [url, decode]);

  return { data, loading, error };
}`,
  localStorage: `import {
  useEffect, useState, type Dispatch, type SetStateAction
} from "react";

type Decoder<T> = (value: unknown) => T;
export type StorageResult<T> = readonly [
  T, Dispatch<SetStateAction<T>>, string | null
];

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function readStored<T>(key: string, initial: T, decode: Decoder<T>) {
  try {
    const raw = localStorage.getItem(key);
    const parsed: unknown = raw === null ? null : JSON.parse(raw);
    return {
      value: raw === null ? initial : decode(parsed),
      error: null,
    };
  } catch (error: unknown) {
    return { value: initial, error: messageOf(error) };
  }
}

// Browser-only. Keep key fixed for this mounted hook instance.
export function useLocalStorage<T>(
  key: string, initial: T, decode: Decoder<T>
): StorageResult<T> {
  const [start] = useState(() => readStored(key, initial, decode));
  const [value, setValue] = useState<T>(() => start.value);
  const [writeError, setWriteError] = useState<string | null>(null);

  useEffect(() => {
    // The returned read error reports why persistence is blocked.
    // Do not overwrite unreadable or invalid stored data.
    if (start.error !== null) return;
    try {
      const serialized = JSON.stringify(value);
      if (serialized === undefined) {
        throw new Error("Value cannot be stored as JSON");
      }
      localStorage.setItem(key, serialized);
      setWriteError(null);
    } catch (error: unknown) {
      setWriteError(messageOf(error));
    }
  }, [key, value, start.error]);

  return [value, setValue, start.error ?? writeError] as const;
}

type Preferences = { theme: "light" | "dark"; language: string };
const initial: Preferences = { theme: "light", language: "en" };

function decodePrefs(value: unknown): Preferences {
  if (typeof value !== "object" || value === null ||
      !("theme" in value) ||
      (value.theme !== "light" && value.theme !== "dark") ||
      !("language" in value) || typeof value.language !== "string") {
    throw new Error("Invalid preferences");
  }
  return { theme: value.theme, language: value.language };
}

export function PreferenceDemo() {
  const [preferences, setPreferences, error] =
    useLocalStorage("userPreferences", initial, decodePrefs);
  return (
    <section>
      {error && <p role="alert">Storage error: {error}</p>}
      <p>Theme: {preferences.theme}</p>
      <button onClick={() => setPreferences(previous => ({
        ...previous,
        theme: previous.theme === "light" ? "dark" : "light",
      }))}>
        Toggle theme
      </button>
    </section>
  );
}`,
};
