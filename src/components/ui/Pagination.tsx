import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | '…')[] = [];
  const push = (p: number | '…') => pages.push(p);

  push(1);
  if (page > 3) push('…');
  for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) push(i);
  if (page < totalPages - 2) push('…');
  if (totalPages > 1) push(totalPages);

  return (
    <div className={cn('flex items-center justify-center gap-1', className)}>
      <button
        className="btn-ghost p-2 rounded-lg disabled:opacity-30"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`e${i}`} className="px-3 py-1.5 text-sm text-gray-400">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              'min-w-9 h-9 px-3 rounded-lg text-sm font-medium transition-colors',
              p === page
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
            )}
          >
            {p}
          </button>
        ),
      )}
      <button
        className="btn-ghost p-2 rounded-lg disabled:opacity-30"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
