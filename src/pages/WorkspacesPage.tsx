import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FolderKanban } from 'lucide-react';
import { workspaceService } from '../services';
import type { Workspace } from '../types';
import { WorkspaceCard } from '../components/WorkspaceCard';
import { CardGridSkeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../contexts/ToastContext';
import { workspacePath } from '../constants';

export function WorkspacesPage() {
  const { show } = useToast();
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    workspaceService.getWorkspaces().then((ws) => {
      setWorkspaces(ws);
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
      navigate(workspacePath(ws.id));
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Workspaces</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {workspaces.length} workspace{workspaces.length !== 1 ? 's' : ''} • Organize your research by topic
          </p>
        </div>
        <button className="btn-primary" onClick={() => setCreateOpen(true)}>
          <Plus className="w-4 h-4" />
          Create Workspace
        </button>
      </div>

      {loading ? (
        <CardGridSkeleton count={6} />
      ) : workspaces.length === 0 ? (
        <EmptyState
          icon={<FolderKanban className="w-8 h-8" />}
          title="No workspaces yet"
          description="Create your first workspace to start organizing your research."
          action={
            <button className="btn-primary" onClick={() => setCreateOpen(true)}>
              <Plus className="w-4 h-4" />
              Create Workspace
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workspaces.map((ws) => (
            <WorkspaceCard key={ws.id} workspace={ws} />
          ))}
        </div>
      )}

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
