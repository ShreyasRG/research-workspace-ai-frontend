export function CardSkeleton() {
  return (
    <div className="box p-4 animate-pulse">
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded bg-canvas-subtle" />
        <div className="flex-1 space-y-1.5"><div className="h-3.5 bg-canvas-subtle rounded w-3/4" /><div className="h-3 bg-canvas-subtle rounded w-1/2" /></div>
      </div>
      <div className="mt-3 space-y-1.5"><div className="h-3 bg-canvas-subtle rounded" /><div className="h-3 bg-canvas-subtle rounded w-5/6" /></div>
    </div>
  );
}
export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}</div>;
}
export function ListRowSkeleton() {
  return <div className="flex items-center gap-3 p-2.5 animate-pulse"><div className="w-8 h-8 rounded bg-canvas-subtle shrink-0" /><div className="flex-1 space-y-1.5"><div className="h-3.5 bg-canvas-subtle rounded w-2/3" /><div className="h-3 bg-canvas-subtle rounded w-1/3" /></div></div>;
}
export function ListSkeleton({ count = 5 }: { count?: number }) {
  return <div className="space-y-1">{Array.from({ length: count }).map((_, i) => <ListRowSkeleton key={i} />)}</div>;
}
export function IconGridSkeleton({ count = 12 }: { count?: number }) {
  return <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">{Array.from({ length: count }).map((_, i) => <div key={i} className="flex flex-col items-center gap-1.5 animate-pulse"><div className="w-12 h-12 rounded-md bg-canvas-subtle" /><div className="h-2.5 w-12 bg-canvas-subtle rounded" /></div>)}</div>;
}
