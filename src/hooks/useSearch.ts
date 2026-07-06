import { useEffect, useMemo, useState } from 'react';
import { searchService, workspaceService } from '../services';
import type { SearchResult, Workspace, SearchFilters } from '../types';
import { useDebounce } from './useDebounce';

export interface UseSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  results: SearchResult[];
  loading: boolean;
  workspaces: Workspace[];
  types: string[];
  setTypes: (t: string[]) => void;
  workspaceFilter: string[];
  setWorkspaceFilter: (w: string[]) => void;
  activeFilterCount: number;
  clearFilters: () => void;
  workspaceOptions: { label: string; value: string }[];
}

export function useSearch(): UseSearchReturn {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 350);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [workspaceFilter, setWorkspaceFilter] = useState<string[]>([]);

  useEffect(() => {
    workspaceService.getWorkspaces().then(setWorkspaces);
  }, []);

  useEffect(() => {
    setLoading(true);
    const filters: SearchFilters = {
      type: types.length ? types : undefined,
      workspaceId: workspaceFilter[0],
    };
    searchService.searchResources(debouncedQuery, filters).then((r) => {
      setResults(r);
      setLoading(false);
    });
  }, [debouncedQuery, types, workspaceFilter]);

  const activeFilterCount = types.length + workspaceFilter.length;
  const clearFilters = () => { setTypes([]); setWorkspaceFilter([]); };

  const workspaceOptions = useMemo(
    () => workspaces.map((w) => ({ label: w.title, value: w.id })),
    [workspaces],
  );

  return {
    query,
    setQuery,
    results,
    loading,
    workspaces,
    types,
    setTypes,
    workspaceFilter,
    setWorkspaceFilter,
    activeFilterCount,
    clearFilters,
    workspaceOptions,
  };
}
