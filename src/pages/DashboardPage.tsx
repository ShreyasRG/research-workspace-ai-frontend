import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FolderKanban, Sparkles, ArrowRight, FileText, Video } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { workspaceService, resourceService, aiService } from '../services';
import type { Workspace, Resource, AISummary } from '../types';
import { WorkspaceCard } from '../components/WorkspaceCard';
import { ResourceCard } from '../components/ResourceCard';
import { AISummaryCard } from '../components/AISummaryCard';
import { CardGridSkeleton } from '../components/ui/Skeleton';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../contexts/ToastContext';
import { formatRelative, cn } from '../utils';

export function DashboardPage() {
  const { user } = useAuth();
  const { show } = useToast();
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [summaries, setSummaries] = useState<AISummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    Promise.all([
      workspaceService.getWorkspaces(),
      resourceService.getResources(),
      aiService.getSummaries(),
    ]).then(([ws, res, sum]) => {
      setWorkspaces(ws);
      setResources(res);
      setSummaries(sum);
      setLoading(false);
    });
  }, []);

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    setCreating(true);
    try {
      const ws = await workspaceService.createWorkspace({ title: newTitle, description: newDesc });
      show({ type: 'success', title: 'Workspace created', message: ws.title });
      setCreateOpen(false);
      setNewTitle('');
      setNewDesc('');
      navigate(`/workspaces/${ws.id}`);
    } finally {
      setCreating(false);
    }
  };

  const stats = [
    { label: 'Workspaces', value: workspaces.length, icon: FolderKanban, color: 'from-primary-500 to-accent-500' },
    { label: 'Resources', value: resources.length, icon: FileText, color: 'from-emerald-500 to-teal-500' },
    { label: 'AI Summaries', value: summaries.length, icon: Sparkles, color: 'from-amber-500 to-orange-500' },
    { label: 'Videos', value: resources.filter((r) => r.type === 'video').length, icon: Video, color: 'from-rose-500 to-pink-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 p-6 md:p-8 text-white">
        <div className="absolute -top-20 -right-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 right-1/3 w-72 h-72 rounded-full bg-accent-400/20 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-primary-200 text-sm font-medium">{formatRelative(new Date().toISOString())}</p>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
            <p className="text-primary-100 mt-2 max-w-lg">
              You have {summaries.length} AI summaries and {resources.length} resources across {workspaces.length} workspaces.
            </p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="btn bg-white text-primary-700 hover:bg-primary-50 px-5 py-2.5 shadow-md shrink-0"
          >
            <Plus className="w-4 h-4" />
            Create Workspace
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{s.value}</p>
              </div>
              <div className={cn('w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-sm', s.color)}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent workspaces */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Workspaces</h2>
          <Link to="/workspaces" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {loading ? (
          <CardGridSkeleton count={3} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {workspaces.slice(0, 3).map((ws) => (
              <WorkspaceCard key={ws.id} workspace={ws} />
            ))}
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent resources */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recently Added Resources</h2>
            <Link to="/search" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
              Browse <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <CardGridSkeleton count={2} />
          ) : (
            <div className="space-y-4">
              {resources.slice(0, 3).map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          )}
        </section>

        {/* Recent summaries */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent AI Summaries</h2>
            <Link to="/summaries" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <CardGridSkeleton count={2} />
          ) : (
            <div className="space-y-4">
              {summaries.slice(0, 3).map((s) => (
                <AISummaryCard key={s.id} summary={s} compact />
              ))}
            </div>
          )}
        </section>
      </div>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create new workspace"
        description="Organize your research into themed collections."
        footer={
          <>
            <button className="btn-secondary" onClick={() => setCreateOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleCreate} disabled={creating || !newTitle.trim()}>
              {creating ? 'Creating…' : 'Create workspace'}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Title</label>
            <input
              className="input"
              placeholder="e.g. Climate Science Research"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
            <textarea
              className="input min-h-24 resize-none"
              placeholder="What is this workspace about?"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
