import { useState, useEffect, useCallback } from "react";

type UseLocalStorageOptions<T> = {
  key: string;
  initialValue: T;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
};

/**
 * Generic hook for localStorage management with TypeScript support
 * @param key - localStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @param serializer - Custom serializer (default: JSON.stringify)
 * @param deserializer - Custom deserializer (default: JSON.parse)
 * @returns [value, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    serializer?: (value: T) => string;
    deserializer?: (value: string) => T;
  }
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const serializer = options?.serializer ?? JSON.stringify;
  const deserializer = options?.deserializer ?? JSON.parse;

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }
      return deserializer(item);
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, serializer(valueToStore));
        }
      } catch {
        // Ignore errors
      }
    },
    [key, serializer, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Ignore errors
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

