import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { searchService, workspaceService } from '../services';
import type { SearchResult, Workspace } from '../types';
import { SearchBar } from '../components/ui/SearchBar';
import { FilterGroup } from '../components/ui/Filters';
import { CardGridSkeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { TagList } from '../components/ui/TagBadge';
import { useDebounce } from '../hooks/useDebounce';
import { RESOURCE_TYPE_LABELS } from '../constants';
import { formatRelative, cn } from '../utils';

const TYPE_OPTIONS = [
  { label: 'Articles', value: 'article' },
  { label: 'Videos', value: 'video' },
  { label: 'Notes', value: 'note' },
  { label: 'AI Summaries', value: 'summary' },
];

export function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 350);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [workspaceFilter, setWorkspaceFilter] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    workspaceService.getWorkspaces().then(setWorkspaces);
  }, []);

  useEffect(() => {
    setLoading(true);
    searchService
      .searchResources(debouncedQuery, {
        type: types.length ? types : undefined,
        workspaceId: workspaceFilter[0],
      })
      .then((r) => {
        setResults(r);
        setLoading(false);
      });
  }, [debouncedQuery, types, workspaceFilter]);

  const toggle = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const activeCount = types.length + workspaceFilter.length;
  const clearAll = () => { setTypes([]); setWorkspaceFilter([]); };

  const workspaceOptions = useMemo(
    () => workspaces.map((w) => ({ label: w.title, value: w.id })),
    [workspaces],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Search</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Find resources, summaries, and notes across all your workspaces.
        </p>
      </div>

      <div className="flex gap-3">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by title, tag, author, or content…"
          className="flex-1"
          autoFocus
        />
        <button
          onClick={() => setShowFilters((s) => !s)}
          className={cn(
            'btn-secondary lg:hidden',
            activeCount > 0 && 'border-primary-300 text-primary-600 dark:text-primary-400',
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {activeCount > 0 && <span className="text-xs">{activeCount}</span>}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Filters sidebar */}
        <aside className={cn('w-64 shrink-0', showFilters ? 'block' : 'hidden', 'lg:block')}>
          <div className="card p-5 sticky top-20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Filters</h3>
              {activeCount > 0 && (
                <button onClick={clearAll} className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline">
                  Clear all ({activeCount})
                </button>
              )}
            </div>
            <FilterGroup title="Type" options={TYPE_OPTIONS} selected={types} onToggle={(v) => toggle(types, v, setTypes)} />
            <FilterGroup title="Workspace" options={workspaceOptions} selected={workspaceFilter} onToggle={(v) => toggle(workspaceFilter, v, setWorkspaceFilter)} />
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <CardGridSkeleton count={4} />
          ) : results.length === 0 ? (
            <EmptyState
              icon={<SearchIcon className="w-8 h-8" />}
              title={query ? `No results for "${query}"` : 'Start typing to search'}
              description={query ? 'Try different keywords or adjust your filters.' : 'Search across all your resources and AI summaries.'}
            />
          ) : (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {results.length} result{results.length !== 1 ? 's' : ''}{query && ` for "${query}"`}
              </p>
              <div className="space-y-3">
                {results.map((r) => (
                  <button
                    key={`${r.type}-${r.id}`}
                    onClick={() => navigate(r.type === 'summary' ? `/summaries/${r.id}` : `/resources/${r.id}`)}
                    className="card card-hover p-4 w-full text-left flex items-start gap-4 group animate-fade-in"
                  >
                    <div className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                      r.type === 'summary' ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400',
                    )}>
                      <SearchIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                          {RESOURCE_TYPE_LABELS[r.type] ?? 'AI Summary'}
                        </span>
                        <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">{r.workspaceName}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {r.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{r.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <TagList tags={r.tags} />
                        <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 ml-3">{formatRelative(r.date)}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
