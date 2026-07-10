import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Calendar, User, Users, FileText, Video, StickyNote, Sparkles, Trash2, ExternalLink, Pencil } from 'lucide-react';
import { useWorkspace, useResources, useSummaries } from '../hooks/queries';
import {
  useAddResource,
  useDeleteResource,
  useDeleteWorkspace,
} from "../hooks/mutations";
import type { Resource, ResourceType } from '../types';
import { ResourceCard } from '../components/ResourceCard';
import { AISummaryCard } from '../components/AISummaryCard';
import { Avatar } from '../components/ui/Avatar';
import { CardGridSkeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { Modal } from '../components/ui/Modal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useToast } from '../contexts/ToastContext';
import { formatDate, cn } from '../utils';
import { ROUTES } from '../constants';
import { EditWorkspaceModal } from "../components/workspace/EditWorkspaceModal";

const TABS: { id: string; label: string; icon: typeof FileText }[] = [
  { id: 'articles', label: 'Articles', icon: FileText },
  { id: 'videos', label: 'Videos', icon: Video },
  { id: 'notes', label: 'Notes', icon: StickyNote },
  { id: 'summaries', label: 'AI Summaries', icon: Sparkles },
];

export function WorkspaceDetailPage() {
  const { id } = useParams<{ id: string }>();

if (!id) {
  return <ErrorState onRetry={() => navigate(ROUTES.WORKSPACES)} />;
}
  const navigate = useNavigate();
  const { show } = useToast();
  const { data: workspace, isLoading: wsLoading, error: wsError } = useWorkspace(id);
  const { data: resources = [], isLoading: resLoading } = useResources(id);
  const { data: summaries = [], isLoading: sumLoading } = useSummaries(id);
  const loading = wsLoading || resLoading || sumLoading;
  const error = !!wsError || (!wsLoading && !workspace);
  const addResource = useAddResource();
  const deleteResource = useDeleteResource();
  const deleteWorkspace = useDeleteWorkspace();
  const [activeTab, setActiveTab] = useState('articles');
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Resource | null>(null);
  const [newRes, setNewRes] = useState({ title: '', type: 'article' as ResourceType, sourceUrl: '' });
  const [editOpen, setEditOpen] = useState(false);
  const [deleteWorkspaceOpen, setDeleteWorkspaceOpen] = useState(false);

  const handleAdd = async () => {
    if (!newRes.title.trim() || !id) return;
    const r = await addResource.mutateAsync({
      workspaceId: id,
      title: newRes.title,
      type: newRes.type,
      sourceUrl: newRes.sourceUrl,
    });
    show({ type: 'success', title: 'Resource added', message: r.title });
    setAddOpen(false);
    setNewRes({ title: '', type: 'article', sourceUrl: '' });
  };

  const handleDelete = async () => {
  if (!deleteTarget) return;

  await deleteResource.mutateAsync(deleteTarget.id);

  show({
    type: "success",
    title: "Resource deleted",
  });

  setDeleteTarget(null);
};

const handleDeleteWorkspace = async () => {
  if (!id) return;

  try {
    await deleteWorkspace.mutateAsync(id);

    setDeleteWorkspaceOpen(false);

    show({
      type: "success",
      title: "Workspace deleted",
    });

    navigate(ROUTES.WORKSPACES);
  } catch {
    show({
      type: "error",
      title: "Failed to delete workspace",
    });
  }
};

  if (loading) return <div className="space-y-6"><CardGridSkeleton count={4} /></div>;
  if (error || !workspace) return <ErrorState onRetry={() => navigate(ROUTES.WORKSPACES)} />;

  const filteredResources = resources.filter((r) => {
    if (activeTab === 'articles') return r.type === 'article';
    if (activeTab === 'videos') return r.type === 'video';
    if (activeTab === 'notes') return r.type === 'note';
    return false;
  });

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(ROUTES.WORKSPACES)} className="btn-ghost -ml-3">
        <ArrowLeft className="w-4 h-4" />
        Back to workspaces
      </button>

      {/* Header */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={cn('w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-sm shrink-0', workspace.color)}>
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{workspace.title}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">{workspace.description}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-400 dark:text-gray-500">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatDate(workspace.createdAt)}</span>
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {workspace.owner}</span>
                <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> {workspace.resourceCount} resources</span>
                <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> {workspace.summaryCount} summaries</span>
              </div>
            </div>
          </div>


      <div className="flex items-center gap-3">
        <button
          className="btn-secondary"
          onClick={() => setEditOpen(true)}
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>

        <button
          className="btn-secondary hover:border-error-500 hover:text-error-600 dark:hover:text-error-400"
          onClick={() => setDeleteWorkspaceOpen(true)}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>

        <div className="flex -space-x-2">
          {workspace.members.map((m) => (
            <Avatar
              key={m.id}
              name={m.name}
              src={m.avatarUrl}
              size="sm"
            />
          ))}
        </div>

        <span className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1">
          <Users className="w-4 h-4" />
          {workspace.members.length}
        </span>
      </div>
              </div>
      </div>

      {/* Tabs + Add */}

      {/* Tabs + Add */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.id !== 'summaries' && (
                <span className="text-xs text-gray-400">
                  {resources.filter((r) => r.type === (tab.id === 'articles' ? 'article' : tab.id === 'videos' ? 'video' : 'note')).length}
                </span>
              )}
              {tab.id === 'summaries' && <span className="text-xs text-gray-400">{summaries.length}</span>}
            </button>
          ))}
        </div>
        {activeTab !== 'summaries' && (
          <button className="btn-primary shrink-0" onClick={() => setAddOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Resource
          </button>
        )}
      </div>

      {/* Content */}
      {activeTab === 'summaries' ? (
        summaries.length === 0 ? (
          <EmptyState icon={<Sparkles className="w-8 h-8" />} title="No AI summaries yet" description="Generate summaries from your resources to see them here." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {summaries.map((s) => (
              <AISummaryCard key={s.id} summary={s} />
            ))}
          </div>
        )
      ) : filteredResources.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-8 h-8" />}
          title={`No ${activeTab} yet`}
          description="Add your first resource to get started."
          action={<button className="btn-primary" onClick={() => setAddOpen(true)}><Plus className="w-4 h-4" /> Add Resource</button>}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((r) => (
            <div key={r.id} className="relative group">
              <ResourceCard resource={r} />
              <button
                onClick={() => setDeleteTarget(r)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-400 hover:text-error-600 dark:hover:text-error-400 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                aria-label="Delete resource"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add resource modal */}
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add resource"
        description="Add an article, video, or note to this workspace."
        footer={
          <>
            <button className="btn-secondary" onClick={() => setAddOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleAdd} disabled={!newRes.title.trim()}>
              Add resource
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Title</label>
            <input className="input" placeholder="Resource title" value={newRes.title} onChange={(e) => setNewRes({ ...newRes, title: e.target.value })} autoFocus />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['article', 'video', 'note'] as ResourceType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setNewRes({ ...newRes, type: t })}
                  className={cn(
                    'flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border transition-colors capitalize',
                    newRes.type === t
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700',
                  )}
                >
                  {t === 'article' ? <FileText className="w-4 h-4" /> : t === 'video' ? <Video className="w-4 h-4" /> : <StickyNote className="w-4 h-4" />}
                  {t}
                </button>
              ))}
            </div>
          </div>
          {newRes.type !== 'note' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Source URL</label>
              <div className="relative">
                <ExternalLink className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input className="input pl-10" placeholder="https://…" value={newRes.sourceUrl} onChange={(e) => setNewRes({ ...newRes, sourceUrl: e.target.value })} />
              </div>
            </div>
          )}
        </div>
      </Modal>

      <ConfirmDialog
        open={deleteWorkspaceOpen}
        onClose={() => setDeleteWorkspaceOpen(false)}
        onConfirm={handleDeleteWorkspace}
        title="Delete workspace?"
        message={`"${workspace.title}" will be permanently deleted. This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        loading={deleteWorkspace.isPending}
/>
      <EditWorkspaceModal
  open={editOpen}
  workspace={workspace}
  onClose={() => setEditOpen(false)}
/>
    </div>
  );
}
