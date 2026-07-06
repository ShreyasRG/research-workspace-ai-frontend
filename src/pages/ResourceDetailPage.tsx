import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, User, Sparkles, KeyRound, Quote, HelpCircle, FileText, Video, StickyNote, Clock } from 'lucide-react';
import { useResource, useSummaries } from '../hooks/queries';
import { TagList } from '../components/ui/TagBadge';
import { Skeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { RESOURCE_TYPE_LABELS, RESOURCE_STATUS_LABELS, RESOURCE_STATUS_COLORS, ROUTES } from '../constants';
import { formatDate, formatDuration, formatRelative, cn } from '../utils';

const TYPE_ICONS = { article: FileText, video: Video, note: StickyNote };

export function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: resource, isLoading, error } = useResource(id);
  const { data: allSummaries = [] } = useSummaries();
  const summary = allSummaries.find((s) => s.resourceId === id) ?? null;
  const loading = isLoading;
  const errorState = !!error || (!isLoading && !resource);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-6 w-32" />
        <div className="card p-6 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }
  if (errorState || !resource) return <ErrorState onRetry={() => navigate(ROUTES.SEARCH)} />;

  const Icon = TYPE_ICONS[resource.type];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="btn-ghost -ml-3">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <div className="card p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-300 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                {RESOURCE_TYPE_LABELS[resource.type]}
              </span>
              <span className={cn('badge text-[10px] py-0.5', RESOURCE_STATUS_COLORS[resource.status])}>
                {RESOURCE_STATUS_LABELS[resource.status]}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{resource.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{resource.description}</p>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-gray-400 dark:text-gray-500">
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {resource.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatDate(resource.dateAdded)}</span>
              {resource.readTimeMinutes && <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {resource.readTimeMinutes} min read</span>}
              {resource.durationSeconds && <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5" /> {formatDuration(resource.durationSeconds)}</span>}
              {resource.sourceUrl && (
                <a href={resource.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary-600 dark:text-primary-400 hover:underline">
                  <ExternalLink className="w-3.5 h-3.5" /> {resource.sourceName}
                </a>
              )}
            </div>
            <TagList tags={resource.tags} className="mt-4" />
          </div>
        </div>
      </div>

      {/* AI Summary */}
      {summary ? (
        <div className="card overflow-hidden">
          <div className="px-6 md:px-8 py-5 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">AI Summary</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Generated {formatRelative(summary.generatedDate)} • {summary.model}</p>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Summary */}
            <section>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{summary.summary}</p>
            </section>

            {/* Key takeaways */}
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                <KeyRound className="w-4 h-4 text-primary-500" />
                Key Takeaways
              </h3>
              <ul className="space-y-2.5">
                {summary.keyTakeaways.map((k) => (
                  <li key={k.id} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-300 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                      {summary.keyTakeaways.indexOf(k) + 1}
                    </span>
                    {k.text}
                  </li>
                ))}
              </ul>
            </section>

            {/* Important quotes */}
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

            {/* Suggested questions */}
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                <HelpCircle className="w-4 h-4 text-emerald-500" />
                Suggested Follow-up Questions
              </h3>
              <div className="space-y-2">
                {summary.suggestedQuestions.map((q, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                    <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="flex-1">{q}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="card p-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 mx-auto mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">No AI summary yet</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 max-w-sm mx-auto">
            Generate an AI summary to get key takeaways, quotes, and follow-up questions.
          </p>
          <button className="btn-primary mt-5">
            <Sparkles className="w-4 h-4" />
            Generate Summary
          </button>
        </div>
      )}
    </div>
  );
}
