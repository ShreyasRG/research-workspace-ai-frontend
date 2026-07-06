import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { summaryService } from '../services';
import type { AISummary } from '../types';
import { AISummaryCard } from '../components/AISummaryCard';
import { CardGridSkeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';

export function SummariesPage() {
  const [summaries, setSummaries] = useState<AISummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    summaryService.getSummaries().then((s) => {
      setSummaries(s);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">AI Summaries</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {summaries.length} AI-generated summaries with key takeaways, quotes, and follow-up questions.
        </p>
      </div>

      {loading ? (
        <CardGridSkeleton count={6} />
      ) : summaries.length === 0 ? (
        <EmptyState
          icon={<Sparkles className="w-8 h-8" />}
          title="No AI summaries yet"
          description="Open a resource and generate a summary to see it here."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {summaries.map((s) => (
            <AISummaryCard key={s.id} summary={s} />
          ))}
        </div>
      )}
    </div>
  );
}
