import { Link } from 'react-router-dom';
import { FileText, Video, StickyNote, ExternalLink, Clock, Calendar, Eye, Trash2, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { Resource, ResourceType, ResourceStatus } from '../types';
import type { ViewMode } from '../hooks/useViewMode';
import { cn, formatDate, formatDuration, statusLabel } from '../utils';
import { RESOURCE_TYPE_LABELS } from '../constants';
import { useUpdateResource } from '../hooks/mutations';

const TYPE_ICONS: Record<ResourceType, typeof FileText> = { article: FileText, video: Video, note: StickyNote };
const TYPE_COLORS: Record<ResourceType, string> = { article: 'text-accent-fg', video: 'text-done-fg', note: 'text-attention-fg' };
const STATUS_LABELS: Record<ResourceStatus, string> = { unread: 'label-neutral', reading: 'label-accent', completed: 'label-success', archived: 'label-neutral' };

// Only these three are user-changeable for now - "archived" is a real
// backend value but isn't exposed as a manual choice yet (see the status
// design discussion: unread -> reading -> completed is the reflexive
// reading-queue progression; archived is deferred until there's a clear
// use case for it beyond delete/completed).
const CHANGEABLE_STATUSES: ResourceStatus[] = ['unread', 'reading', 'completed'];

function StatusControl({ resource }: { resource: Resource }) {
  const updateResource = useUpdateResource();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [open]);

  if (resource.status === 'archived') {
    return <span className={STATUS_LABELS[resource.status]}>{statusLabel(resource.status)}</span>;
  }

  return (
    <div ref={dropdownRef} className="relative inline-block" onMouseDown={(e) => e.stopPropagation()}>
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(!open);
        }}
        disabled={updateResource.isPending}
        className={cn(STATUS_LABELS[resource.status], 'flex items-center gap-1 cursor-pointer border-0 bg-transparent disabled:opacity-50 hover:opacity-80 transition-all duration-200')}
      >
        {statusLabel(resource.status)}
        <ChevronDown className={cn('w-3 h-3 transition-transform duration-300', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 bg-canvas-default border border-border-default rounded-md shadow-lg z-10 min-w-[140px] overflow-hidden">
          {CHANGEABLE_STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                updateResource.mutate({
                  id: resource.id,
                  workspaceId: resource.workspaceId,
                  status: s,
                });
                setOpen(false);
              }}
              className={cn(
                'w-full text-left px-3 py-2 text-sm transition-colors',
                resource.status === s
                  ? 'bg-accent-subtle text-accent-fg font-medium'
                  : 'text-fg-default hover:bg-canvas-subtle'
              )}
            >
              {statusLabel(s)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ResourceCard({ resource, viewMode, onQuickLook, onDelete }: { resource: Resource; viewMode: ViewMode; onQuickLook?: (r: Resource) => void; onDelete?: (r: Resource) => void }) {
  const TypeIcon = TYPE_ICONS[resource.type];
  const ql = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); onQuickLook?.(resource); };
  const del = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); onDelete?.(resource); };

  if (viewMode === 'icon') {
    return (
      <div className="group relative">
        <Link to={`/resources/${resource.id}`} className="flex flex-col items-center gap-1.5 p-2 rounded-md hover:bg-canvas-subtle transition-colors">
          <div className="relative w-12 h-12 rounded-md flex items-center justify-center overflow-hidden bg-canvas-subtle">
            {resource.thumbnailUrl ? <img src={resource.thumbnailUrl} alt="" className="w-full h-full object-cover" /> : <TypeIcon className={cn('w-5 h-5', TYPE_COLORS[resource.type])} />}
          </div>
          <span className="text-xs font-medium text-fg-default text-center truncate max-w-[72px]">{resource.title}</span>
        </Link>
        <div className="absolute top-0.5 right-0.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {onQuickLook && <button onClick={ql} title="Quick Look" className="p-1 rounded bg-canvas-default border border-border-default text-fg-subtle hover:text-accent-fg hover:scale-110 active:scale-95 transition-all duration-200"><Eye className="w-3 h-3" /></button>}
          {onDelete && <button onClick={del} title="Delete" className="p-1 rounded bg-canvas-default border border-border-default text-fg-subtle hover:text-danger-fg hover:scale-110 active:scale-95 transition-all duration-200"><Trash2 className="w-3 h-3" /></button>}
        </div>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="group relative">
        <Link to={`/resources/${resource.id}`} className="flex items-center gap-3 p-2.5 rounded-md hover:bg-canvas-subtle transition-colors border border-transparent hover:border-border-default">
          <div className="w-8 h-8 rounded-md bg-canvas-subtle flex items-center justify-center shrink-0">
            {resource.thumbnailUrl ? <img src={resource.thumbnailUrl} alt="" className="w-full h-full object-cover rounded-md" /> : <TypeIcon className={cn('w-4 h-4', TYPE_COLORS[resource.type])} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-fg-default truncate group-hover:text-accent-fg transition-colors">{resource.title}</p>
            <p className="text-xs text-fg-subtle truncate">{resource.author} · {resource.sourceName}</p>
          </div>
          <StatusControl resource={resource} />
          <span className="hidden lg:flex items-center gap-1 text-xs text-fg-subtle shrink-0 w-20 justify-end"><Calendar className="w-3 h-3" />{formatDate(resource.dateAdded)}</span>
        </Link>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {onQuickLook && <button onClick={ql} title="Quick Look" className="p-1 rounded bg-canvas-default border border-border-default text-fg-subtle hover:text-accent-fg hover:scale-110 active:scale-95 transition-all duration-200"><Eye className="w-3.5 h-3.5" /></button>}
          {onDelete && <button onClick={del} title="Delete" className="p-1 rounded bg-canvas-default border border-border-default text-fg-subtle hover:text-danger-fg hover:scale-110 active:scale-95 transition-all duration-200"><Trash2 className="w-3.5 h-3.5" /></button>}
        </div>
      </div>
    );
  }

  return (
    <div className="group relative h-full">
      <Link to={`/resources/${resource.id}`} className="group box overflow-hidden hover:border-fg-muted transition-colors flex flex-col h-full">
        {resource.thumbnailUrl ? (
          <div className="aspect-video bg-canvas-subtle overflow-hidden"><img src={resource.thumbnailUrl} alt="" className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" /></div>
        ) : (
          <div className="aspect-video flex items-center justify-center bg-canvas-subtle"><TypeIcon className={cn('w-8 h-8', TYPE_COLORS[resource.type], 'opacity-50')} /></div>
        )}
        <div className="p-3 flex flex-col flex-1">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="label-neutral !px-1.5 !py-0"><TypeIcon className={cn('w-2.5 h-2.5', TYPE_COLORS[resource.type])} />{RESOURCE_TYPE_LABELS[resource.type]}</span>
            <StatusControl resource={resource} />
          </div>
          <h3 className="text-sm font-semibold text-fg-default line-clamp-2 group-hover:text-accent-fg transition-colors">{resource.title}</h3>
          <p className="text-xs text-fg-muted mt-1 line-clamp-2">{resource.description}</p>
          <div className="mt-2 pt-2 border-t border-border-muted flex items-center justify-between text-xs text-fg-subtle">
            <span>{resource.author}</span>
            {resource.readTimeMinutes && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{resource.readTimeMinutes}m</span>}
            {resource.durationSeconds && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDuration(resource.durationSeconds)}</span>}
            {resource.sourceUrl && <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" />{resource.sourceName}</span>}
          </div>
        </div>
      </Link>
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {onQuickLook && <button onClick={ql} title="Quick Look" className="p-1.5 rounded bg-canvas-default/90 backdrop-blur-sm border border-border-default text-fg-subtle hover:text-accent-fg hover:scale-110 active:scale-95 transition-all duration-200"><Eye className="w-3.5 h-3.5" /></button>}
        {onDelete && <button onClick={del} title="Delete" className="p-1.5 rounded bg-canvas-default/90 backdrop-blur-sm border border-border-default text-fg-subtle hover:text-danger-fg hover:scale-110 active:scale-95 transition-all duration-200"><Trash2 className="w-3.5 h-3.5" /></button>}
      </div>
    </div>
  );
}
