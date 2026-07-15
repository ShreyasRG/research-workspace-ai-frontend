import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, FolderTree, Sparkles } from 'lucide-react';
import { useWorkspaces, useResources, useSummaries } from '../hooks/queries';
import { useDebounce } from '../hooks/useDebounce';
import { EmptyState } from '../components/ui/EmptyState';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 200);
  const { data: workspaces } = useWorkspaces();
  const { data: resources } = useResources();
  const { data: summaries } = useSummaries();

  const results = useMemo(() => {
    const q = debounced.toLowerCase().trim();
    if (!q) return { workspaces: [], resources: [], summaries: [] };
    return {
      workspaces: (workspaces ?? []).filter((w) => w.title.toLowerCase().includes(q) || w.description.toLowerCase().includes(q)),
      resources: (resources ?? []).filter((r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)),
      summaries: (summaries ?? []).filter((s) => s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q)),
    };
  }, [debounced, workspaces, resources, summaries]);

  const total = results.workspaces.length + results.resources.length + results.summaries.length;

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold text-fg-default mb-3">Search</h1>
      <div className="relative mb-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-subtle" /><input autoFocus className="input pl-9" placeholder="Search workspaces, resources, summaries…" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
      {!debounced.trim() ? <EmptyState icon={<Search className="w-6 h-6" />} title="Start typing to search" description="Find workspaces, resources, and AI summaries across your research hub." /> : total === 0 ? <EmptyState icon={<Search className="w-6 h-6" />} title="No results found" description={`No matches for "${debounced}". Try a different query.`} /> : (
        <div className="space-y-5">
          {results.workspaces.length > 0 && <section><h2 className="flex items-center gap-1.5 text-xs font-semibold text-fg-subtle mb-1.5 uppercase tracking-wide"><FolderTree className="w-3.5 h-3.5" /> Workspaces ({results.workspaces.length})</h2><div className="box divide-y divide-border-muted">{results.workspaces.map((w) => <Link key={w.id} to={`/workspaces/${w.id}`} className="block p-2.5 hover:bg-canvas-subtle transition-colors first:rounded-t-md last:rounded-b-md"><p className="text-sm font-medium text-fg-default">{w.title}</p><p className="text-xs text-fg-subtle">{w.description}</p></Link>)}</div></section>}
          {results.resources.length > 0 && <section><h2 className="flex items-center gap-1.5 text-xs font-semibold text-fg-subtle mb-1.5 uppercase tracking-wide"><FileText className="w-3.5 h-3.5" /> Resources ({results.resources.length})</h2><div className="box divide-y divide-border-muted">{results.resources.map((r) => <Link key={r.id} to={`/resources/${r.id}`} className="block p-2.5 hover:bg-canvas-subtle transition-colors first:rounded-t-md last:rounded-b-md"><p className="text-sm font-medium text-fg-default">{r.title}</p><p className="text-xs text-fg-subtle">{r.author} · {r.sourceName}</p></Link>)}</div></section>}
          {results.summaries.length > 0 && <section><h2 className="flex items-center gap-1.5 text-xs font-semibold text-fg-subtle mb-1.5 uppercase tracking-wide"><Sparkles className="w-3.5 h-3.5" /> Summaries ({results.summaries.length})</h2><div className="box divide-y divide-border-muted">{results.summaries.map((s) => <Link key={s.id} to={`/summaries/${s.id}`} className="block p-2.5 hover:bg-canvas-subtle transition-colors first:rounded-t-md last:rounded-b-md"><p className="text-sm font-medium text-fg-default">{s.title}</p><p className="text-xs text-fg-subtle line-clamp-1">{s.summary}</p></Link>)}</div></section>}
        </div>
      )}
    </div>
  );
}
