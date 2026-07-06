import { Link } from 'react-router-dom';
import { FolderKanban, Server, Target, BrainCircuit, ShieldCheck, Users, Calendar } from 'lucide-react';
import type { Workspace } from '../types';
import { Avatar } from './ui/Avatar';
import { formatDate } from '../utils';
import { cn } from '../utils';

const ICONS: Record<string, typeof FolderKanban> = {
  FolderKanban,
  Server,
  Target,
  BrainCircuit,
  ShieldCheck,
};

interface WorkspaceCardProps {
  workspace: Workspace;
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const Icon = ICONS[workspace.icon] ?? FolderKanban;
  return (
    <Link
      to={`/workspaces/${workspace.id}`}
      className="card card-hover p-5 flex flex-col group animate-fade-in"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            'w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-sm',
            workspace.color,
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex -space-x-2">
          {[...workspace.members].slice(0, 3).map((m) => (
            <Avatar key={m.id} name={m.name} src={m.avatarUrl} size="xs" />
          ))}
          {workspace.members.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[10px] font-semibold text-gray-500 dark:text-gray-400 ring-2 ring-white dark:ring-gray-900">
              +{workspace.members.length - 3}
            </div>
          )}
        </div>
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {workspace.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 flex-1">
        {workspace.description}
      </p>
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400 dark:text-gray-500">
        <span className="flex items-center gap-1.5">
          <FolderKanban className="w-3.5 h-3.5" />
          {workspace.resourceCount} resources
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          {workspace.members.length} members
        </span>
        <span className="flex items-center gap-1.5 ml-auto">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(workspace.createdAt)}
        </span>
      </div>
    </Link>
  );
}
