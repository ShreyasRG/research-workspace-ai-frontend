import { Sparkles, Search } from 'lucide-react';
import { useState } from 'react';
import { useSummaries } from '../hooks/queries';
import { AISummaryCard } from '../components/AISummaryCard';
import { EmptyState } from '../components/ui/EmptyState';
import { CardGridSkeleton } from '../components/ui/Skeleton';

export function SummariesPage() {
  const { data: summaries, isLoading } = useSummaries();
  const [search, setSearch] = useState('');
  const filtered = summaries?.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()) || s.summary.toLowerCase().includes(search.toLowerCase()) || s.resourceTitle.toLowerCase().includes(search.toLowerCase())) ?? [];

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div><h1 className="text-xl font-semibold text-fg-default">AI Summaries</h1><p className="text-sm text-fg-muted mt-0.5">{summaries?.length ?? 0} summaries generated</p></div>
        <div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-fg-subtle" /><input className="input pl-8 w-56" placeholder="Search summaries…" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
      </div>
      {isLoading ? <CardGridSkeleton count={6} /> : filtered.length === 0 ? <EmptyState icon={<Sparkles className="w-6 h-6" />} title="No summaries yet" description="Generate AI summaries from your resources to see them here." /> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{filtered.map((s) => <AISummaryCard key={s.id} summary={s} />)}</div>}
    </div>
  );
}
