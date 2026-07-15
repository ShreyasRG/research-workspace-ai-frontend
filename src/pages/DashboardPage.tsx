import { Link } from 'react-router-dom';
import { FolderTree, Sparkles, FileText, Flame, Clock, Plus } from 'lucide-react';
import { useState } from 'react';
import { useWorkspaces, useSummaries, useResources, useProfile } from '../hooks/queries';
import { useCreateWorkspace } from '../hooks/mutations';
import { WorkspaceCard } from '../components/WorkspaceCard';
import { AISummaryCard } from '../components/AISummaryCard';
import { CardGridSkeleton } from '../components/ui/Skeleton';
import { Modal } from '../components/ui/Modal';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { formatDate, cn } from '../utils';

export function DashboardPage() {
  const { user } = useAuth();
  const { show } = useToast();
  const { data: workspaces, isLoading: wsLoading } = useWorkspaces();
  const { data: summaries, isLoading: sumLoading } = useSummaries();
  const { data: resources } = useResources();
  const { data: profile } = useProfile();
  const createWs = useCreateWorkspace();
  const [createOpen, setCreateOpen] = useState(false);
  const [newWs, setNewWs] = useState({ title: '', description: '' });

  const handleCreate = async () => {
    if (!newWs.title.trim()) return;
    const ws = await createWs.mutateAsync({ ...newWs, color: 'auto', icon: 'auto' });
    show({ type: 'success', title: 'Workspace created', message: ws.title });
    setCreateOpen(false);
    setNewWs({ title: '', description: '' });
  };

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto">
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-fg-default">Welcome back, {user?.name.split(' ')[0]}</h1>
        <p className="text-sm text-fg-muted mt-0.5">Here's what's happening in your research hub.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard icon={FolderTree} label="Workspaces" value={workspaces?.length ?? 0} color="text-accent-fg" />
        <StatCard icon={FileText} label="Resources" value={resources?.length ?? 0} color="text-done-fg" />
        <StatCard icon={Sparkles} label="Summaries" value={summaries?.length ?? 0} color="text-success-fg" />
        <StatCard icon={Flame} label="Streak" value={`${profile?.readingGoals.streak ?? 0}w`} color="text-attention-fg" />
      </div>
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-heading">Recent workspaces</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setCreateOpen(true)} className="btn-secondary btn-sm"><Plus className="w-3.5 h-3.5" />Create</button>
            <Link to="/workspaces" className="btn-secondary btn-sm">View all</Link>
          </div>
        </div>
        {wsLoading ? <CardGridSkeleton count={3} /> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{workspaces?.slice(0, 3).map((ws) => <div key={ws.id} className="h-full"><WorkspaceCard workspace={ws} viewMode="gallery" /></div>)}</div>}
      </section>
      <section className="mb-6">
        <h2 className="section-heading mb-3">Recent resources</h2>
        <div className="box divide-y divide-border-muted">
          {resources?.slice(0, 5).length === 0 ? <p className="p-4 text-sm text-fg-subtle text-center">No resources yet.</p> : resources?.slice(0, 5).map((r) => (
            <Link key={r.id} to={`/resources/${r.id}`} className="flex items-center gap-3 p-2.5 hover:bg-canvas-subtle transition-colors first:rounded-t-md last:rounded-b-md">
              <div className="w-8 h-8 rounded-md bg-canvas-subtle flex items-center justify-center shrink-0"><FileText className="w-4 h-4 text-fg-subtle" /></div>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium text-fg-default truncate">{r.title}</p><p className="text-xs text-fg-subtle">{r.author} · {formatDate(r.dateAdded)}</p></div>
              <Clock className="w-3.5 h-3.5 text-fg-subtle" />
            </Link>
          ))}
        </div>
      </section>
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-heading">Recent AI summaries</h2>
          <Link to="/summaries" className="btn-secondary btn-sm">View all</Link>
        </div>
        {sumLoading ? <CardGridSkeleton count={3} /> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{summaries?.slice(0, 3).map((s) => <AISummaryCard key={s.id} summary={s} />)}</div>}
      </section>
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create workspace" size="md">
        <div className="space-y-3">
          <div><label className="block text-sm font-medium text-fg-default mb-1">Title</label><input className="input" placeholder="My new workspace" value={newWs.title} onChange={(e) => setNewWs({ ...newWs, title: e.target.value })} /></div>
          <div><label className="block text-sm font-medium text-fg-default mb-1">Description</label><textarea className="input min-h-[72px] resize-none" placeholder="What is this workspace about?" value={newWs.description} onChange={(e) => setNewWs({ ...newWs, description: e.target.value })} /></div>
          <button className="btn-primary w-full" onClick={handleCreate} disabled={!newWs.title.trim() || createWs.isPending}>{createWs.isPending ? 'Creating…' : 'Create workspace'}</button>
        </div>
      </Modal>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: typeof FolderTree; label: string; value: string | number; color: string }) {
  return (
    <div className="box p-3">
      <div className="flex items-center gap-2 mb-1.5"><Icon className={cn('w-4 h-4', color)} /><span className="text-xs text-fg-subtle">{label}</span></div>
      <p className="text-xl font-bold text-fg-default">{value}</p>
    </div>
  );
}
