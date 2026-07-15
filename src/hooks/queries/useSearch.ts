import { useQuery } from '@tanstack/react-query';
import { searchService, workspaceService } from '../../services';
import { QUERY_KEYS } from '../../constants';
import type { SearchFilters } from '../../types';
import { useDebounce } from '../useDebounce';

export function useSearch(query: string, filters?: SearchFilters) {
  const debouncedQuery = useDebounce(query, 350);

  return useQuery({
    queryKey: QUERY_KEYS.search.results(debouncedQuery, {
      type: filters?.type,
      workspaceId: filters?.workspaceId,
      tag: filters?.tag,
    }),
    queryFn: () => searchService.searchResources(debouncedQuery, filters),
    placeholderData: (prev) => prev,
  });
}

export function useSearchWorkspaces() {
  return useQuery({
    queryKey: QUERY_KEYS.workspaces.all,
    queryFn: () => workspaceService.getWorkspaces(),
  });
}
