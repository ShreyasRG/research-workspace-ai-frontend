import { Link } from 'react-router-dom';
import { Sparkles, Calendar, ArrowRight, KeyRound, Quote, HelpCircle } from 'lucide-react';
import type { AISummary } from '../types';
import { TagList } from './ui/TagBadge';
import { formatRelative } from '../utils';
import { summaryPath } from '../constants';

interface AISummaryCardProps {
  summary: AISummary;
  compact?: boolean;
}

export function AISummaryCard({ summary, compact = false }: AISummaryCardProps) {
  return (
    <Link
      to={summaryPath(summary.id)}
      className="card card-hover p-5 flex flex-col group animate-fade-in"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white shrink-0 shadow-sm">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
              AI Summary
            </span>
            <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">{summary.workspaceName}</span>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
            {summary.title}
          </h3>
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 flex-1">
        {summary.summary}
      </p>
      {!compact && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <KeyRound className="w-3.5 h-3.5 text-primary-500" />
            {summary.keyTakeaways.length} takeaways
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Quote className="w-3.5 h-3.5 text-accent-500" />
            {summary.importantQuotes.length} quotes
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
            {summary.suggestedQuestions.length} questions
          </div>
        </div>
      )}
      <TagList tags={summary.tags} className="mb-3" />
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400 dark:text-gray-500">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {formatRelative(summary.generatedDate)}
        </span>
        <span className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium group-hover:gap-1.5 transition-all">
          View
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
