import { Loader2 } from 'lucide-react';

export default function DashboardLoading() {
  return (
    <div className="w-full h-full min-h-screen bg-background">
      {/* Main content */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Page title skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-10 w-28 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 rounded-lg border bg-card shadow-sm">
              <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
              <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Courses grid */}
        <div className="mb-6">
          <div className="h-7 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Centered loader */}
        <div className="flex justify-center items-center my-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-slate-600 dark:text-slate-400">
            Loading your courses...
          </span>
        </div>
      </div>
    </div>
  );
}

function CourseCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card overflow-hidden shadow-sm">
      <div className="h-40 bg-slate-300 dark:bg-slate-600 animate-pulse" />
      <div className="p-4">
        <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4" />
        <div className="flex justify-between items-center">
          <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
