import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { FileText, Sparkles, FolderTree, Trash2 } from 'lucide-react';
import type { Workspace } from '../types';
import type { ViewMode } from '../hooks/useViewMode';
import { Avatar } from './ui/Avatar';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { useDeleteWorkspace } from '../hooks/mutations';
import { useToast } from '../contexts/ToastContext';
import { useState } from 'react';

function getIcon(name: string) {
  const icons = LucideIcons as unknown as Record<string, typeof FolderTree>;
  return icons[name] ?? FolderTree;
}

export function WorkspaceCard({ workspace, viewMode }: { workspace: Workspace; viewMode: ViewMode }) {
  const Icon = getIcon(workspace.icon);
  const deleteWorkspace = useDeleteWorkspace();
  const { show } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    await deleteWorkspace.mutateAsync(workspace.id);
    show({ type: 'success', title: 'Workspace deleted', message: workspace.title });
    setConfirmOpen(false);
  };

  const deleteButton = (className: string, iconClassName: string) => (
    <button
      onClick={handleDelete}
      title="Delete workspace"
      className={className + ' hover:scale-110 active:scale-95 transition-all duration-200'}
    >
      <Trash2 className={iconClassName} />
    </button>
  );

  const confirmDialog = (
    <ConfirmDialog
      open={confirmOpen}
      onClose={() => setConfirmOpen(false)}
      onConfirm={confirmDelete}
      title="Delete workspace?"
      message={`"${workspace.title}" and all its resources will be permanently deleted. This action cannot be undone.`}
      confirmLabel="Delete"
    />
  );

  if (viewMode === 'icon') {
    return (
      <div className="group relative">
        <Link to={`/workspaces/${workspace.id}`} className="flex flex-col items-center gap-1.5 p-2 rounded-md hover:bg-canvas-subtle transition-colors">
          <div className="w-12 h-12 rounded-md flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform" style={{ backgroundColor: workspace.color }}><Icon className="w-5 h-5" /></div>
          <span className="text-xs font-medium text-fg-default text-center truncate max-w-[72px]">{workspace.title}</span>
        </Link>
        <div className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {deleteButton('p-1 rounded bg-canvas-default border border-border-default text-fg-subtle hover:text-danger-fg', 'w-3 h-3')}
        </div>
        {confirmDialog}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="group relative">
        <div className="flex items-center gap-3 p-2.5 rounded-md hover:bg-canvas-subtle transition-colors border border-transparent hover:border-border-default">
          <Link to={`/workspaces/${workspace.id}`} className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-md flex items-center justify-center text-white shrink-0" style={{ backgroundColor: workspace.color }}><Icon className="w-4 h-4" /></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-fg-default truncate group-hover:text-accent-fg transition-colors">{workspace.title}</p>
              <p className="text-xs text-fg-muted truncate">{workspace.description}</p>
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-3 text-xs text-fg-subtle shrink-0">
            <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{workspace.resourceCount}</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" />{workspace.summaryCount}</span>
            <button
              onClick={handleDelete}
              title="Delete workspace"
              className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-fg-subtle hover:text-danger-fg"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
        {confirmDialog}
      </div>
    );
  }

  return (
    <div className="group relative h-full">
      <Link to={`/workspaces/${workspace.id}`} className="box p-4 hover:border-fg-muted transition-colors block h-full flex flex-col">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-md flex items-center justify-center text-white shrink-0" style={{ backgroundColor: workspace.color }}><Icon className="w-5 h-5" /></div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-fg-default truncate group-hover:text-accent-fg transition-colors">{workspace.title}</h3>
            <p className="text-xs text-fg-muted mt-0.5 line-clamp-2">{workspace.description}</p>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-fg-subtle">
            <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{workspace.resourceCount}</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" />{workspace.summaryCount}</span>
          </div>
          <div className="flex -space-x-1.5">
            {workspace.members.slice(0, 3).map((m) => <Avatar key={m.id} src={m.avatarUrl} alt={m.name} size="xs" className="ring-1 ring-canvas-default" />)}
            {workspace.members.length > 3 && <div className="w-5 h-5 rounded-full bg-canvas-subtle ring-1 ring-canvas-default flex items-center justify-center text-[9px] font-medium text-fg-muted">+{workspace.members.length - 3}</div>}
          </div>
        </div>
      </Link>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {deleteButton('p-1.5 rounded bg-canvas-default/90 backdrop-blur-sm border border-border-default text-fg-subtle hover:text-danger-fg transition-colors', 'w-3.5 h-3.5')}
      </div>
      {confirmDialog}
    </div>
  );
}
