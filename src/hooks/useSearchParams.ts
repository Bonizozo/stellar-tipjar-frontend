import { usePathname, useRouter, useSearchParams as useNextSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * Hook for managing URL search parameters with type-safe updates.
 * Syncs filter state with URL for shareable links and browser navigation.
 */
export function useSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useNextSearchParams();

  const setSearchParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      
      router.push(url as never, { scroll: false });
    },
    [pathname, router]
  );

  const setSearchParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      
      router.push(url as never, { scroll: false });
    },
    [pathname, router]
  );

  const getSearchParam = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    []
  );

  return {
    searchParams,
    setSearchParam,
    setSearchParams,
    getSearchParam,
  };
}
