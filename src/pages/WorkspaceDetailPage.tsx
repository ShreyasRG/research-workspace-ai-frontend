import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Calendar, Users, ExternalLink, ScanLine, FileText, Video, StickyNote, Trash2 } from 'lucide-react';
import { useWorkspace, useResources } from '../hooks/queries';
import { useAddResource, useDeleteResource, useDeleteWorkspace } from '../hooks/mutations';
import type { ResourceType, Resource, ScannedDocument } from '../types';
import { ResourceCard } from '../components/ResourceCard';
import { ViewToggle } from '../components/ViewToggle';
import { QuickLookModal } from '../components/QuickLookModal';
import { Avatar } from '../components/ui/Avatar';
import { Modal } from '../components/ui/Modal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { DocumentScannerModal } from '../components/DocumentScannerModal';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { CardGridSkeleton, ListSkeleton, IconGridSkeleton } from '../components/ui/Skeleton';
import { useViewMode } from '../hooks/useViewMode';
import { useToast } from '../contexts/ToastContext';
import { formatDate, cn } from '../utils';
import { ROUTES } from '../constants';

const TYPE_OPTIONS: { value: ResourceType; label: string; icon: typeof FileText }[] = [
  { value: 'article', label: 'Article', icon: FileText }, { value: 'video', label: 'Video', icon: Video }, { value: 'note', label: 'Note', icon: StickyNote },
];

export function WorkspaceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: workspace, isLoading: wsLoading, isError: wsError } = useWorkspace(id);
  const { data: resources, isLoading: resLoading } = useResources(id);
  const addResource = useAddResource();
  const deleteResource = useDeleteResource();
  const deleteWorkspace = useDeleteWorkspace();
  const { show } = useToast();
  const { viewMode, setViewMode } = useViewMode('resources');
  const [addOpen, setAddOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [deleteWorkspaceOpen, setDeleteWorkspaceOpen] = useState(false);
  const [quickLookResource, setQuickLookResource] = useState<Resource | null>(null);
  const [newRes, setNewRes] = useState({ title: '', type: 'article' as ResourceType, sourceUrl: '' });

  const handleAdd = async () => {
    if (!newRes.title.trim() || !id) return;
    const r = await addResource.mutateAsync({ workspaceId: id, title: newRes.title, type: newRes.type, sourceUrl: newRes.sourceUrl });
    show({ type: 'success', title: 'Resource added', message: r.title });
    setAddOpen(false); setNewRes({ title: '', type: 'article', sourceUrl: '' });
  };

  const handleScanComplete = async (doc: ScannedDocument) => {
    if (!id) return;
    const r = await addResource.mutateAsync({ workspaceId: id, title: doc.title, type: 'article', sourceUrl: doc.sourceUrl, description: doc.description, thumbnailUrl: doc.thumbnailUrl });
    show({ type: 'success', title: 'Document imported', message: r.title });
  };

  const handleDelete = async (resource: Resource) => {
    if (!id) return;
    await deleteResource.mutateAsync({ id: resource.id, workspaceId: id });
    show({ type: 'success', title: 'Resource deleted', message: resource.title });
  };

  const handleDeleteWorkspace = async () => {
    if (!id) return;
    try {
      await deleteWorkspace.mutateAsync(id);
      show({ type: 'success', title: 'Workspace deleted' });
      navigate(ROUTES.WORKSPACES);
    } catch {
      show({ type: 'error', title: 'Failed to delete workspace' });
    }
  };

  if (wsError) return <ErrorState message="Workspace not found" onRetry={() => navigate('/workspaces')} />;

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto">
      <Link to="/workspaces" className="inline-flex items-center gap-1 text-sm text-fg-muted hover:text-accent-fg mb-3"><ArrowLeft className="w-3.5 h-3.5" />Back to workspaces</Link>
      {wsLoading ? <div className="h-24 rounded-md bg-canvas-subtle animate-pulse mb-4" /> : workspace ? (
        <div className="mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-md flex items-center justify-center text-white shrink-0" style={{ backgroundColor: workspace.color }}><FileText className="w-5 h-5" /></div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold text-fg-default">{workspace.title}</h1>
              <p className="text-sm text-fg-muted mt-0.5">{workspace.description}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-fg-subtle"><span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(workspace.createdAt)}</span><span className="flex items-center gap-1"><Users className="w-3 h-3" />{workspace.members.length} members</span></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">{workspace.members.slice(0, 4).map((m) => <Avatar key={m.id} src={m.avatarUrl} alt={m.name} size="sm" className="ring-1 ring-canvas-default" />)}</div>
              <button
                onClick={() => setDeleteWorkspaceOpen(true)}
                title="Delete workspace"
                className="p-2 rounded-md border border-border-default text-fg-subtle hover:text-danger-fg hover:border-danger-fg hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex items-center justify-between gap-2 mb-3">
        <p className="text-sm text-fg-muted">{resources?.length ?? 0} resources</p>
        <div className="flex items-center gap-2"><ViewToggle viewMode={viewMode} onChange={setViewMode} /><button onClick={() => setAddOpen(true)} className="btn-primary btn-sm"><Plus className="w-3.5 h-3.5" />Add resource</button></div>
      </div>
      {resLoading ? (viewMode === 'icon' ? <IconGridSkeleton /> : viewMode === 'list' ? <ListSkeleton /> : <CardGridSkeleton />) : !resources || resources.length === 0 ? (
        <EmptyState icon={<FileText className="w-6 h-6" />} title="No resources yet" description="Add articles, videos, or notes to this workspace." actionLabel="Add resource" onAction={() => setAddOpen(true)} />
      ) : (
        <>
          {viewMode === 'icon' && <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1">{resources.map((r) => <ResourceCard key={r.id} resource={r} viewMode="icon" onQuickLook={setQuickLookResource} onDelete={handleDelete} />)}</div>}
          {viewMode === 'list' && <div className="space-y-0.5">{resources.map((r) => <ResourceCard key={r.id} resource={r} viewMode="list" onQuickLook={setQuickLookResource} onDelete={handleDelete} />)}</div>}
          {viewMode === 'gallery' && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{resources.map((r) => <ResourceCard key={r.id} resource={r} viewMode="gallery" onQuickLook={setQuickLookResource} onDelete={handleDelete} />)}</div>}
        </>
      )}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add resource" size="md">
        <div className="space-y-3">
          <div><label className="block text-sm font-medium text-fg-default mb-1">Title</label><input className="input" placeholder="Resource title" value={newRes.title} onChange={(e) => setNewRes({ ...newRes, title: e.target.value })} /></div>
          <div><label className="block text-sm font-medium text-fg-default mb-1">Type</label><div className="flex gap-1.5">{TYPE_OPTIONS.map((opt) => <button key={opt.value} onClick={() => setNewRes({ ...newRes, type: opt.value })} className={cn('flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium border transition-colors', newRes.type === opt.value ? 'border-accent-fg bg-accent-subtle text-accent-fg' : 'border-border-default text-fg-muted hover:bg-canvas-subtle')}><opt.icon className="w-3.5 h-3.5" />{opt.label}</button>)}</div></div>
          {newRes.type !== 'note' && <div><label className="block text-sm font-medium text-fg-default mb-1">Source URL</label><div className="relative"><ExternalLink className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-fg-subtle" /><input className="input pl-8" placeholder="https://…" value={newRes.sourceUrl} onChange={(e) => setNewRes({ ...newRes, sourceUrl: e.target.value })} /></div></div>}
          <div className="relative py-1"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-muted" /></div><div className="relative flex justify-center"><span className="bg-canvas-default px-2 text-xs text-fg-subtle">or</span></div></div>
          <button onClick={() => { setAddOpen(false); setScannerOpen(true); }} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-md border border-dashed border-border-default text-sm font-medium text-fg-muted hover:border-accent-fg hover:bg-accent-subtle hover:text-accent-fg transition-colors"><ScanLine className="w-4 h-4" />Import from Physical Document</button>
          <button className="btn-primary w-full" onClick={handleAdd} disabled={!newRes.title.trim() || addResource.isPending}>{addResource.isPending ? 'Adding…' : 'Add resource'}</button>
        </div>
      </Modal>
      <DocumentScannerModal open={scannerOpen} onClose={() => setScannerOpen(false)} onScanComplete={handleScanComplete} />
      <QuickLookModal resource={quickLookResource} onClose={() => setQuickLookResource(null)} />
      <ConfirmDialog
        open={deleteWorkspaceOpen}
        onClose={() => setDeleteWorkspaceOpen(false)}
        onConfirm={handleDeleteWorkspace}
        title="Delete workspace?"
        message={`"${workspace?.title}" and all its resources will be permanently deleted. This action cannot be undone.`}
        confirmLabel="Delete"
      />
    </div>
  );
}
