import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="p-4 space-y-4 border shadow-sm rounded-xl bg-card"
        >
          <Skeleton className="w-full h-48 rounded-lg" />
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-1/2 h-4" />
          <div className="flex space-x-2">
            <Skeleton className="w-20 h-8 rounded-md" />
            <Skeleton className="w-20 h-8 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
