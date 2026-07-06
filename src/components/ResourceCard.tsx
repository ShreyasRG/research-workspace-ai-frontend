import { Link } from 'react-router-dom';
import { FileText, Video, StickyNote, Clock, ExternalLink, BookOpen } from 'lucide-react';
import type { Resource } from '../types';
import { TagList } from './ui/TagBadge';
import { RESOURCE_TYPE_LABELS, RESOURCE_STATUS_LABELS, RESOURCE_STATUS_COLORS, resourcePath } from '../constants';
import { formatRelative, formatDuration, cn } from '../utils';

const TYPE_ICONS = {
  article: FileText,
  video: Video,
  note: StickyNote,
};

const TYPE_COLORS = {
  article: 'bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-300',
  video: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300',
  note: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300',
};

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = TYPE_ICONS[resource.type];
  return (
    <div className="card card-hover p-5 flex flex-col group animate-fade-in">
      <div className="flex items-start gap-3 mb-3">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', TYPE_COLORS[resource.type])}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
              {RESOURCE_TYPE_LABELS[resource.type]}
            </span>
            <span className={cn('badge text-[10px] py-0.5', RESOURCE_STATUS_COLORS[resource.status])}>
              {RESOURCE_STATUS_LABELS[resource.status]}
            </span>
          </div>
          <Link
            to={resourcePath(resource.id)}
            className="text-sm font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2"
          >
            {resource.title}
          </Link>
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 flex-1">
        {resource.description}
      </p>
      <TagList tags={resource.tags} className="mb-3" />
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400 dark:text-gray-500">
        <div className="flex items-center gap-3">
          {resource.readTimeMinutes && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {resource.readTimeMinutes} min
            </span>
          )}
          {resource.durationSeconds && (
            <span className="flex items-center gap-1">
              <Video className="w-3.5 h-3.5" />
              {formatDuration(resource.durationSeconds)}
            </span>
          )}
          <span>{formatRelative(resource.dateAdded)}</span>
        </div>
        <div className="flex items-center gap-1">
          {resource.sourceUrl && (
            <a
              href={resource.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open source"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <Link
            to={resourcePath(resource.id)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="View resource"
          >
            <BookOpen className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
