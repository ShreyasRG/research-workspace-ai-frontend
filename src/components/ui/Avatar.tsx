import { cn } from '../../utils';
interface AvatarProps { src: string; alt: string; size?: 'xs' | 'sm' | 'md' | 'lg'; className?: string; }
const SIZES = { xs: 'w-5 h-5', sm: 'w-6 h-6', md: 'w-8 h-8', lg: 'w-12 h-12' } as const;
export function Avatar({ src, alt, size = 'sm', className }: AvatarProps) {
  return <img src={src} alt={alt} className={cn('rounded-full object-cover', SIZES[size], className)} />;
}
