import type { SearchResult, SearchFilters } from '../types/search';

export interface SearchRequestDTO {
  query: string;
  filters: SearchFilters;
}

export type SearchResultDTO = SearchResult;
