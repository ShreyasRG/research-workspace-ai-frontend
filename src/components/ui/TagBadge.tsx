import type { Tag } from '../../types';
import { TAG_COLORS } from '../../constants';
import { cn } from '../../utils';

interface TagBadgeProps {
  tag: Tag;
  className?: string;
}

export function TagBadge({ tag, className }: TagBadgeProps) {
  return (
    <span className={cn('badge', TAG_COLORS[tag.color] ?? TAG_COLORS.blue, className)}>
      {tag.label}
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
