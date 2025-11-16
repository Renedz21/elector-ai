import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useDebounce } from "./use-debounce";

type UseUrlFiltersOptions = {
  basePath: string;
  debounceMs?: number;
};

export function useUrlFilters({ basePath, debounceMs = 500 }: UseUrlFiltersOptions) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const getParam = (key: string) => searchParams.get(key) || "";

  const setParam = (key: string, value: string | undefined) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (value?.trim()) {
        params.set(key, value.trim());
      } else {
        params.delete(key);
      }
      
      params.delete("page");
      router.push(`${basePath}?${params.toString()}`);
    });
  };

  const clearAllParams = () => {
    startTransition(() => {
      router.push(basePath);
    });
  };

  return {
    getParam,
    setParam,
    clearAllParams,
    isPending,
    searchParams,
  };
}

export function useDebouncedUrlFilter(
  key: string,
  setParam: (key: string, value: string) => void,
  initialValue: string,
  debounceMs = 500
) {
  const debouncedValue = useDebounce(initialValue, debounceMs);

  // Auto-update URL when debounced value changes
  if (debouncedValue !== initialValue) {
    setParam(key, debouncedValue);
  }

  return debouncedValue;
}

