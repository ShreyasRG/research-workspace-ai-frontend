import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, FileText, Video, StickyNote, ExternalLink, Clock, Calendar, User, Eye, ArrowRight } from 'lucide-react';
import type { Resource, ResourceType } from '../types';
import { cn, formatDate, formatDuration, statusLabel } from '../utils';
import { RESOURCE_TYPE_LABELS } from '../constants';

const TYPE_ICONS: Record<ResourceType, typeof FileText> = { article: FileText, video: Video, note: StickyNote };
const TYPE_COLORS: Record<ResourceType, string> = { article: 'text-accent-fg', video: 'text-done-fg', note: 'text-attention-fg' };
const STATUS_LABELS: Record<string, string> = { unread: 'label-neutral', reading: 'label-accent', completed: 'label-success', archived: 'label-neutral' };

export function QuickLookModal({ resource, onClose }: { resource: Resource | null; onClose: () => void }) {
  useEffect(() => {
    if (!resource) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [resource, onClose]);

  if (!resource) return null;
  const TypeIcon = TYPE_ICONS[resource.type];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 animate-fade-in" onClick={onClose} aria-hidden />
      <div role="dialog" aria-modal="true" className="relative w-full max-w-2xl bg-canvas-default border border-border-default rounded-md shadow-lg max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-scale">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-default bg-canvas-subtle">
          <div className="flex items-center gap-1.5 text-xs text-fg-muted"><Eye className="w-3.5 h-3.5" /><span className="font-medium">Quick Look</span></div>
          <button onClick={onClose} className="p-1 rounded text-fg-subtle hover:text-fg-default hover:bg-canvas-default transition-colors" aria-label="Close"><X className="w-4 h-4" /></button>
        </div>
        <div className="overflow-y-auto flex-1">
          {resource.thumbnailUrl ? (
            <div className="aspect-video bg-canvas-subtle overflow-hidden"><img src={resource.thumbnailUrl} alt="" className="w-full h-full object-cover" /></div>
          ) : (
            <div className="aspect-video flex items-center justify-center bg-canvas-subtle"><TypeIcon className={cn('w-12 h-12', TYPE_COLORS[resource.type], 'opacity-50')} /></div>
          )}
          <div className="p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="label-neutral"><TypeIcon className={cn('w-2.5 h-2.5', TYPE_COLORS[resource.type])} />{RESOURCE_TYPE_LABELS[resource.type]}</span>
              <span className={STATUS_LABELS[resource.status]}>{statusLabel(resource.status)}</span>
            </div>
            <h2 className="text-lg font-bold text-fg-default">{resource.title}</h2>
            <p className="text-sm text-fg-muted mt-1.5 leading-relaxed">{resource.description}</p>
            <div className="mt-4 space-y-2 text-sm border-t border-border-muted pt-3">
              <MetaItem icon={User} label="Author" value={resource.author} />
              <MetaItem icon={Calendar} label="Added" value={formatDate(resource.dateAdded)} />
              {resource.readTimeMinutes && <MetaItem icon={Clock} label="Read time" value={`${resource.readTimeMinutes} min`} />}
              {resource.durationSeconds && <MetaItem icon={Clock} label="Duration" value={formatDuration(resource.durationSeconds)} />}
              {resource.sourceUrl && <a href={resource.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent-fg hover:underline text-sm"><ExternalLink className="w-3.5 h-3.5" /><span className="truncate">{resource.sourceName}</span></a>}
            </div>
            {resource.tags.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border-muted">
                <p className="text-xs font-medium text-fg-subtle mb-1.5">Tags</p>
                <div className="flex flex-wrap gap-1.5">{resource.tags.map((tag) => <span key={tag.id} className="label-neutral">{tag.name}</span>)}</div>
              </div>
            )}
          </div>
        </div>
        <div className="px-4 py-2.5 border-t border-border-default flex items-center justify-end bg-canvas-subtle">
          <Link to={`/resources/${resource.id}`} onClick={onClose} className="btn-primary btn-sm">Open full view<ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
      </div>
    </div>, document.body,
  );
}

function MetaItem({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return <div className="flex items-center gap-2 text-fg-muted"><Icon className="w-3.5 h-3.5 text-fg-subtle shrink-0" /><span className="text-xs text-fg-subtle">{label}:</span><span className="text-sm text-fg-default truncate">{value}</span></div>;
}
