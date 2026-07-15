import type { Tag } from '../../types';
import { cn } from '../../utils';

interface TagBadgeProps {
  tag: Tag;
  className?: string;
}

export function TagBadge({ tag, className }: TagBadgeProps) {
  return (
    <span className={cn('label-neutral hover:scale-105 transition-transform duration-200 cursor-default', className)}>
      {tag.name}
    </span>
  );
}

interface TagListProps {
  tags: Tag[];
  className?: string;
}

export function TagList({ tags, className }: TagListProps) {
  if (!tags.length) return null;
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {tags.map((t) => (
        <TagBadge key={t.id} tag={t} />
      ))}
    </div>
  );
}
