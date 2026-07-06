import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, KeyRound, Quote, HelpCircle, Calendar, FolderKanban } from 'lucide-react';
import { summaryService } from '../services';
import type { AISummary } from '../types';
import { TagList } from '../components/ui/TagBadge';
import { Skeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { formatRelative } from '../utils';
import { ROUTES, workspacePath } from '../constants';

export function SummaryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [summary, setSummary] = useState<AISummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(false);
    summaryService.getSummary(id).then((s) => {
      if (!s) { setError(true); setLoading(false); return; }
      setSummary(s);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-6 w-32" />
        <div className="card p-6 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }
  if (error || !summary) return <ErrorState onRetry={() => navigate(ROUTES.SUMMARIES)} />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="btn-ghost -ml-3">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="card overflow-hidden">
        <div className="px-6 md:px-8 py-5 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white shadow-sm shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{summary.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                <Link to={workspacePath(summary.workspaceId)} className="flex items-center gap-1.5 hover:text-primary-600 dark:hover:text-primary-400">
                  <FolderKanban className="w-3.5 h-3.5" /> {summary.workspaceName}
                </Link>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatRelative(summary.generatedDate)}</span>
                <span className="text-gray-400 dark:text-gray-500">{summary.model}</span>
              </div>
              <TagList tags={summary.tags} className="mt-3" />
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <section>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{summary.summary}</p>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
              <KeyRound className="w-4 h-4 text-primary-500" />
              Key Takeaways
            </h3>
            <ul className="space-y-2.5">
              {summary.keyTakeaways.map((k, i) => (
                <li key={k.id} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-300 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {k.text}
                </li>
              ))}
            </ul>
          </section>

          {summary.importantQuotes.length > 0 && (
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                <Quote className="w-4 h-4 text-accent-500" />
                Important Quotes
              </h3>
              <div className="space-y-3">
                {summary.importantQuotes.map((q) => (
                  <blockquote key={q.id} className="border-l-2 border-accent-400 pl-4 py-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">"{q.text}"</p>
                    {q.page && <cite className="text-xs text-gray-400 dark:text-gray-500 mt-1 block not-italic">Page {q.page}</cite>}
                  </blockquote>
                ))}
              </div>
            </section>
          )}

          <section>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              Suggested Follow-up Questions
            </h3>
            <div className="space-y-2">
              {summary.suggestedQuestions.map((q, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                  <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="flex-1">{q}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
