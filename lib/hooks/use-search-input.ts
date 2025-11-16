import { useState, useEffect, useCallback } from "react";

type UseSearchInputOptions = {
  initialValue?: string;
  onSearch?: (value: string) => void;
  debounceMs?: number;
};

/**
 * Hook for managing search input state with optional synchronization and debouncing
 * @param initialValue - Initial search value
 * @param onSearch - Callback when search value changes (debounced if debounceMs provided)
 * @param debounceMs - Debounce delay in milliseconds
 * @returns [value, setValue, handleSubmit]
 */
export function useSearchInput(
  options: UseSearchInputOptions = {}
): [
  string,
  (value: string) => void,
  (e?: React.FormEvent) => void,
] {
  const { initialValue = "", onSearch, debounceMs } = options;
  const [value, setValue] = useState(initialValue);

  // Sync with external initialValue changes
  useEffect(() => {
    if (initialValue !== undefined) {
      setValue(initialValue);
    }
  }, [initialValue]);

  // Debounced search callback
  useEffect(() => {
    if (!onSearch || debounceMs === undefined) return;

    const timer = setTimeout(() => {
      onSearch(value);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, onSearch, debounceMs]);

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (onSearch && value.trim()) {
        onSearch(value.trim());
      }
    },
    [value, onSearch]
  );

  return [value, setValue, handleSubmit];
}

