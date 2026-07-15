import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Clock, Calendar, User, Sparkles, Trash2 } from 'lucide-react';
import { useResource, useSummaries } from '../hooks/queries';
import { useDeleteResource } from '../hooks/mutations';
import { AISummaryCard } from '../components/AISummaryCard';
import { ErrorState } from '../components/ui/ErrorState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useToast } from '../contexts/ToastContext';
import { RESOURCE_TYPE_LABELS } from '../constants';
import { formatDate, formatDuration, statusLabel } from '../utils';

const STATUS_LABELS: Record<string, string> = { unread: 'label-neutral', reading: 'label-accent', completed: 'label-success', archived: 'label-neutral' };

export function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: resource, isLoading, isError } = useResource(id);
  const { data: summaries } = useSummaries();
  const deleteResource = useDeleteResource();
  const { show } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const relatedSummaries = summaries?.filter((s) => s.resourceId === id) ?? [];

  if (isLoading) return <div className="p-6 max-w-3xl mx-auto"><div className="h-48 rounded-md bg-canvas-subtle animate-pulse" /></div>;
  if (isError || !resource) return <ErrorState message="Resource not found" onRetry={() => navigate('/workspaces')} />;

  const handleDelete = async () => {
    await deleteResource.mutateAsync({ id: resource.id, workspaceId: resource.workspaceId });
    show({ type: 'success', title: 'Resource deleted', message: resource.title });
    navigate(`/workspaces/${resource.workspaceId}`);
  };

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto">
      <Link to={`/workspaces/${resource.workspaceId}`} className="inline-flex items-center gap-1 text-sm text-fg-muted hover:text-accent-fg mb-3"><ArrowLeft className="w-3.5 h-3.5" />Back to workspace</Link>
      <div className="box overflow-hidden">
        {resource.thumbnailUrl && <div className="aspect-video bg-canvas-subtle"><img src={resource.thumbnailUrl} alt="" className="w-full h-full object-cover" /></div>}
        <div className="p-4">
          <div className="flex items-center gap-1.5 mb-2"><span className="label-neutral">{RESOURCE_TYPE_LABELS[resource.type]}</span><span className={STATUS_LABELS[resource.status]}>{statusLabel(resource.status)}</span></div>
          <h1 className="text-lg font-bold text-fg-default">{resource.title}</h1>
          <p className="text-sm text-fg-muted mt-1.5">{resource.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-fg-subtle border-t border-border-muted pt-3">
            <span className="flex items-center gap-1"><User className="w-3 h-3" />{resource.author}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(resource.dateAdded)}</span>
            {resource.readTimeMinutes && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{resource.readTimeMinutes} min</span>}
            {resource.durationSeconds && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDuration(resource.durationSeconds)}</span>}
            {resource.sourceUrl && <a href={resource.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-accent-fg hover:underline"><ExternalLink className="w-3 h-3" />{resource.sourceName}</a>}
          </div>
          {resource.tags.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{resource.tags.map((tag) => <span key={tag.id} className="label-neutral">{tag.name}</span>)}</div>}
          <div className="mt-4 pt-3 border-t border-border-muted flex items-center justify-between">
            <button className="btn-secondary btn-sm"><Sparkles className="w-3.5 h-3.5" />Generate summary</button>
            <button onClick={() => setConfirmOpen(true)} className="btn-ghost btn-sm text-danger-fg hover:bg-danger-subtle"><Trash2 className="w-3.5 h-3.5" />Delete</button>
          </div>
        </div>
      </div>
      {relatedSummaries.length > 0 && <section className="mt-5"><h2 className="section-heading mb-3">AI summaries</h2><div className="space-y-3">{relatedSummaries.map((s) => <AISummaryCard key={s.id} summary={s} />)}</div></section>}
      <ConfirmDialog open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDelete} title="Delete resource" message={`Are you sure you want to delete "${resource.title}"? This cannot be undone.`} />
    </div>
  );
}
