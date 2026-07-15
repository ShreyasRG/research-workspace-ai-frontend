import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, KeyRound, Quote, CircleHelp as HelpCircle, Clock } from 'lucide-react';
import { useSummary } from '../hooks/queries';
import { ErrorState } from '../components/ui/ErrorState';
import { formatDate } from '../utils';

export function SummaryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: summary, isLoading, isError } = useSummary(id);

  if (isLoading) return <div className="p-6 max-w-3xl mx-auto"><div className="h-48 rounded-md bg-canvas-subtle animate-pulse" /></div>;
  if (isError || !summary) return <ErrorState message="Summary not found" onRetry={() => navigate('/summaries')} />;

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto">
      <Link to="/summaries" className="inline-flex items-center gap-1 text-sm text-fg-muted hover:text-accent-fg mb-3"><ArrowLeft className="w-3.5 h-3.5" />Back to summaries</Link>
      <div className="box p-4">
        <div className="flex items-start gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-md bg-done-subtle flex items-center justify-center text-done-fg shrink-0"><Sparkles className="w-4 h-4" /></div>
          <div className="flex-1 min-w-0"><h1 className="text-lg font-bold text-fg-default">{summary.title}</h1><p className="text-xs text-fg-subtle mt-0.5">{summary.workspaceName} · {summary.model} · {formatDate(summary.generatedDate)}</p></div>
        </div>
        <p className="text-sm text-fg-muted leading-relaxed">{summary.summary}</p>
        {summary.tags.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{summary.tags.map((tag) => <span key={tag.id} className="label-neutral">{tag.name}</span>)}</div>}
      </div>
      {summary.keyTakeaways.length > 0 && (
        <section className="mt-4">
          <h2 className="flex items-center gap-1.5 section-heading mb-2"><KeyRound className="w-4 h-4 text-accent-fg" />Key takeaways</h2>
          <div className="box p-4 space-y-2.5">{summary.keyTakeaways.map((k, i) => <div key={k.id} className="flex items-start gap-2.5"><span className="w-5 h-5 rounded bg-accent-subtle text-accent-fg text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span><p className="text-sm text-fg-muted pt-0.5">{k.text}</p></div>)}</div>
        </section>
      )}
      {summary.importantQuotes.length > 0 && (
        <section className="mt-4">
          <h2 className="flex items-center gap-1.5 section-heading mb-2"><Quote className="w-4 h-4 text-done-fg" />Important quotes</h2>
          <div className="space-y-2">{summary.importantQuotes.map((q) => <blockquote key={q.id} className="box p-4 border-l-2 border-done-fg"><p className="text-sm text-fg-muted italic">"{q.text}"</p>{q.page && <p className="text-xs text-fg-subtle mt-1.5">Page {q.page}</p>}</blockquote>)}</div>
        </section>
      )}
      {summary.suggestedQuestions.length > 0 && (
        <section className="mt-4">
          <h2 className="flex items-center gap-1.5 section-heading mb-2"><HelpCircle className="w-4 h-4 text-success-fg" />Suggested questions</h2>
          <div className="box p-4 space-y-1.5">{summary.suggestedQuestions.map((q, i) => <div key={i} className="flex items-start gap-2 text-sm text-fg-muted"><span className="text-success-fg shrink-0">?</span>{q}</div>)}</div>
        </section>
      )}
      <div className="mt-4 text-center"><Link to={`/resources/${summary.resourceId}`} className="btn-secondary btn-sm"><Clock className="w-3.5 h-3.5" />View original resource</Link></div>
    </div>
  );
}
