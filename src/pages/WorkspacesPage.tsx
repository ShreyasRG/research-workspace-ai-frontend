import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FolderKanban } from 'lucide-react';

import { useWorkspaces } from '../hooks/queries';
import { WorkspaceCard } from '../components/WorkspaceCard';
import { CreateWorkspaceModal } from '../components/workspace/CreateWorkspaceModal';
import { CardGridSkeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { workspacePath } from '../constants';

export function WorkspacesPage() {
  const navigate = useNavigate();

  const { data: workspaces = [], isLoading } = useWorkspaces();

  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Workspaces
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {workspaces.length} workspace
            {workspaces.length !== 1 ? 's' : ''} • Organize your research by
            topic
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setCreateOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Create Workspace
        </button>
      </div>

      {isLoading ? (
        <CardGridSkeleton count={6} />
      ) : workspaces.length === 0 ? (
        <EmptyState
          icon={<FolderKanban className="w-8 h-8" />}
          title="No workspaces yet"
          description="Create your first workspace to start organizing your research."
          action={
            <button
              className="btn-primary"
              onClick={() => setCreateOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Create Workspace
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              workspace={workspace}
            />
          ))}
        </div>
      )}

      <CreateWorkspaceModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={(workspace) =>
          navigate(workspacePath(workspace.id))
        }
      />
    </div>
  );
}