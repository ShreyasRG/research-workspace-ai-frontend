import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface EmptyStateProps { icon: ReactNode; title: string; description?: string; actionLabel?: string; actionTo?: string; onAction?: () => void; }
export function EmptyState({ icon, title, description, actionLabel, actionTo, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 rounded-md bg-canvas-subtle flex items-center justify-center text-fg-subtle mb-3">{icon}</div>
      <h3 className="text-sm font-semibold text-fg-default">{title}</h3>
      {description && <p className="text-sm text-fg-muted mt-1 max-w-sm">{description}</p>}
      {actionLabel && (actionTo ? <Link to={actionTo} className="btn-secondary mt-4">{actionLabel}</Link> : <button onClick={onAction} className="btn-secondary mt-4">{actionLabel}</button>)}
    </div>
  );
}
