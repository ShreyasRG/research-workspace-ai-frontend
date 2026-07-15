import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { FileText, Sparkles, FolderTree } from 'lucide-react';
import type { Workspace } from '../types';
import type { ViewMode } from '../hooks/useViewMode';
import { Avatar } from './ui/Avatar';

function getIcon(name: string) {
  const icons = LucideIcons as unknown as Record<string, typeof FolderTree>;
  return icons[name] ?? FolderTree;
}

export function WorkspaceCard({ workspace, viewMode }: { workspace: Workspace; viewMode: ViewMode }) {
  const Icon = getIcon(workspace.icon);

  if (viewMode === 'icon') {
    return (
      <Link to={`/workspaces/${workspace.id}`} className="group flex flex-col items-center gap-1.5 p-2 rounded-md hover:bg-canvas-subtle transition-colors">
        <div className="w-12 h-12 rounded-md flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform" style={{ backgroundColor: workspace.color }}><Icon className="w-5 h-5" /></div>
        <span className="text-xs font-medium text-fg-default text-center truncate max-w-[72px]">{workspace.title}</span>
      </Link>
    );
  }

  if (viewMode === 'list') {
    return (
      <Link to={`/workspaces/${workspace.id}`} className="group flex items-center gap-3 p-2.5 rounded-md hover:bg-canvas-subtle transition-colors border border-transparent hover:border-border-default">
        <div className="w-8 h-8 rounded-md flex items-center justify-center text-white shrink-0" style={{ backgroundColor: workspace.color }}><Icon className="w-4 h-4" /></div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-fg-default truncate group-hover:text-accent-fg transition-colors">{workspace.title}</p>
          <p className="text-xs text-fg-muted truncate">{workspace.description}</p>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-xs text-fg-subtle shrink-0">
          <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{workspace.resourceCount}</span>
          <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" />{workspace.summaryCount}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/workspaces/${workspace.id}`} className="group box p-4 hover:border-fg-muted transition-colors">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-md flex items-center justify-center text-white shrink-0" style={{ backgroundColor: workspace.color }}><Icon className="w-5 h-5" /></div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-fg-default truncate group-hover:text-accent-fg transition-colors">{workspace.title}</h3>
          <p className="text-xs text-fg-muted mt-0.5 line-clamp-2">{workspace.description}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
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
  );
}
