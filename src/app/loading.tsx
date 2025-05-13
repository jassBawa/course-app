import { Loader2 } from 'lucide-react';

export default function LandingLoading() {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Hero section skeleton */}
      <section className="py-12 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-6 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-6 w-5/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="flex gap-4 pt-4">
                <div className="h-12 w-32 bg-slate-300 dark:bg-slate-600 rounded animate-pulse" />
                <div className="h-12 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex-1 h-64 md:h-80 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse shadow-md" />
          </div>
        </div>
      </section>

      {/* Text content section */}
      <section className="py-16 max-w-7xl mx-auto px-4 md:px-6 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mx-auto" />
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mx-auto" />
          <div className="h-4 w-4/5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mx-auto" />
        </div>
      </section>

      {/* Featured courses section */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-10 w-28 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>

          {/* Loading indicator */}
          <div className="flex justify-center items-center mt-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-slate-600 dark:text-slate-400">
              Loading courses...
            </span>
          </div>
        </div>
      </section>

      {/* Testimonials section skeleton */}
      <section className="py-16 max-w-7xl mx-auto px-4 md:px-6 bg-white dark:bg-slate-950">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-8 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 border rounded-lg bg-card shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer skeleton */}
      <footer className="py-8 border-t bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div
                      key={j}
                      className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function CourseCardSkeleton() {
  return (
    <div className="rounded-xl border bg-white dark:bg-slate-800 overflow-hidden flex flex-col h-full shadow-sm">
      <div className="h-48 bg-slate-300 dark:bg-slate-600 animate-pulse" />
      <div className="p-5 flex-1 flex flex-col">
        <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
        <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4" />

        <div className="mt-auto space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>

          <div className="flex justify-between items-center">
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-9 w-28 bg-slate-300 dark:bg-slate-600 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
