import { Link } from 'react-router-dom';
import { Sparkles, KeyRound, Quote, CircleHelp as HelpCircle, Clock } from 'lucide-react';
import type { AISummary } from '../types';
import { formatDate } from '../utils';

export function AISummaryCard({ summary }: { summary: AISummary }) {
  return (
    <Link to={`/summaries/${summary.id}`} className="group box p-4 hover:border-fg-muted transition-colors flex flex-col">
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-md bg-done-subtle flex items-center justify-center text-done-fg shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-fg-default line-clamp-1 group-hover:text-accent-fg transition-colors">{summary.title}</h3>
          <p className="text-xs text-fg-subtle mt-0.5 truncate">{summary.workspaceName} · {summary.model}</p>
        </div>
      </div>

      <p className="text-sm text-fg-muted mt-2.5 line-clamp-3 flex-1">{summary.summary}</p>

      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-fg-subtle">
        <span className="flex items-center gap-1"><KeyRound className="w-3 h-3 text-accent-fg" />{summary.keyTakeaways.length}</span>
        <span className="flex items-center gap-1"><Quote className="w-3 h-3 text-done-fg" />{summary.importantQuotes.length}</span>
        <span className="flex items-center gap-1"><HelpCircle className="w-3 h-3 text-success-fg" />{summary.suggestedQuestions.length}</span>
      </div>

      <div className="mt-3 pt-2.5 border-t border-border-muted flex flex-col gap-1.5">
        {summary.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {summary.tags.map((tag) => (
              <span key={tag.id} className="label-neutral">{tag.name}</span>
            ))}
          </div>
        )}
        <span className="flex items-center gap-1 text-xs text-fg-subtle">
          <Clock className="w-3 h-3 shrink-0" />{formatDate(summary.generatedDate)}
        </span>
      </div>
    </Link>
  );
}
