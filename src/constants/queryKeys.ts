/**
 * Centralized query keys for TanStack Query.
 *
 * Using a structured key factory ensures consistent cache identity
 * and makes invalidation by prefix straightforward.
 *
 * Example invalidation:
 *   queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workspaces.all })
 *   queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workspaces.detail(id) })
 */

export const QUERY_KEYS = {
  dashboard: ['dashboard'] as const,
  workspaces: {
    all: ['workspaces'] as const,
    detail: (id: string) => (['workspaces', 'detail', id] as const),
  },
  resources: {
    all: ['resources'] as const,
    byWorkspace: (workspaceId: string) => (['resources', 'workspace', workspaceId] as const),
    detail: (id: string) => (['resources', 'detail', id] as const),
  },
  summaries: {
    all: ['summaries'] as const,
    byWorkspace: (workspaceId: string) => (['summaries', 'workspace', workspaceId] as const),
    detail: (id: string) => (['summaries', 'detail', id] as const),
    byResource: (resourceId: string) => (['summaries', 'resource', resourceId] as const),
  },
  search: {
    all: ['search'] as const,
    results: (query: string, filters: Record<string, unknown>) =>
      (['search', query, filters] as const),
  },
  profile: {
    all: ['profile'] as const,
    detail: () => (['profile', 'detail'] as const),
    notifications: () => (['profile', 'notifications'] as const),
  },
};
