import { QueryClient } from '@tanstack/react-query';

/**
 * Centralized Query Client with production-ready defaults.
 *
 * These defaults balance freshness with performance:
 * - staleTime: 60s — data is considered fresh for 1 minute, preventing
 *   redundant refetches when navigating between pages.
 * - gcTime: 5min — inactive queries are cached for 5 minutes before garbage
 *   collection, enabling instant back navigation.
 * - retry: 1 — failed queries retry once before surfacing the error.
 * - refetchOnWindowFocus: false — disabled to avoid unnecessary refetches
 *   when the user switches browser tabs (mocked data doesn't change).
 *   Enable this when connected to a real backend.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});
