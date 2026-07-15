import { useState } from 'react';
import { Plus, FolderTree, Search } from 'lucide-react';
import { useWorkspaces } from '../hooks/queries';
import { useCreateWorkspace } from '../hooks/mutations';
import { WorkspaceCard } from '../components/WorkspaceCard';
import { ViewToggle } from '../components/ViewToggle';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { CardGridSkeleton, ListSkeleton, IconGridSkeleton } from '../components/ui/Skeleton';
import { useViewMode } from '../hooks/useViewMode';
import { useToast } from '../contexts/ToastContext';

export function WorkspacesPage() {
  const { data: workspaces, isLoading, isError, refetch } = useWorkspaces();
  const createWs = useCreateWorkspace();
  const { show } = useToast();
  const { viewMode, setViewMode } = useViewMode('workspaces');
  const [createOpen, setCreateOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [newWs, setNewWs] = useState({ title: '', description: '' });

  const filtered = workspaces?.filter((w) => w.title.toLowerCase().includes(search.toLowerCase()) || w.description.toLowerCase().includes(search.toLowerCase())) ?? [];

  const handleCreate = async () => {
    if (!newWs.title.trim()) return;
    // Backend auto-assigns color/icon, but the mutation type requires them.
    // Provide placeholder values so the call satisfies the expected shape.
    const ws = await createWs.mutateAsync({ ...newWs, color: 'auto', icon: 'auto' });
    show({ type: 'success', title: 'Workspace created', message: ws.title });
    setCreateOpen(false);
    setNewWs({ title: '', description: '' });
  };

  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div><h1 className="text-xl font-semibold text-fg-default">Workspaces</h1><p className="text-sm text-fg-muted mt-0.5">{workspaces?.length ?? 0} workspaces</p></div>
        <div className="flex items-center gap-2">
          <div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-fg-subtle" /><input className="input pl-8 w-40" placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          <button onClick={() => setCreateOpen(true)} className="btn-primary btn-sm"><Plus className="w-3.5 h-3.5" />New</button>
        </div>
      </div>
      {isLoading ? (viewMode === 'icon' ? <IconGridSkeleton /> : viewMode === 'list' ? <ListSkeleton /> : <CardGridSkeleton />) : filtered.length === 0 ? (
        <EmptyState icon={<FolderTree className="w-6 h-6" />} title="No workspaces yet" description="Create your first workspace to start organizing research resources." actionLabel="Create workspace" onAction={() => setCreateOpen(true)} />
      ) : (
        <>
          {viewMode === 'icon' && <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1">{filtered.map((ws) => <WorkspaceCard key={ws.id} workspace={ws} viewMode="icon" />)}</div>}
          {viewMode === 'list' && <div className="space-y-0.5">{filtered.map((ws) => <WorkspaceCard key={ws.id} workspace={ws} viewMode="list" />)}</div>}
          {viewMode === 'gallery' && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{filtered.map((ws) => <WorkspaceCard key={ws.id} workspace={ws} viewMode="gallery" />)}</div>}
        </>
      )}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create workspace" size="md">
        <div className="space-y-3">
          <div><label className="block text-sm font-medium text-fg-default mb-1">Title</label><input className="input" placeholder="My new workspace" value={newWs.title} onChange={(e) => setNewWs({ ...newWs, title: e.target.value })} /></div>
          <div><label className="block text-sm font-medium text-fg-default mb-1">Description</label><textarea className="input min-h-[72px] resize-none" placeholder="What is this workspace about?" value={newWs.description} onChange={(e) => setNewWs({ ...newWs, description: e.target.value })} /></div>
          {/* Color/icon are auto-assigned by the backend (see
              CreateWorkspaceService) - no picker here, since letting the
              user choose one that then gets silently overridden was the
              exact bug we just fixed. */}
          <button className="btn-primary w-full" onClick={handleCreate} disabled={!newWs.title.trim() || createWs.isPending}>{createWs.isPending ? 'Creating…' : 'Create workspace'}</button>
        </div>
      </Modal>
    </div>
  );
}
