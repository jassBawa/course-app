import AdminCourseContainer from '@/components/courses/AdminCourseContainer';
import { fetchAllCourses } from '@/lib/actions/dasboardActions';

export default async function Home() {
  const { data, error } = await fetchAllCourses();

  if (!data || error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-red-100 dark:from-red-900 dark:to-red-950 px-4 text-center">
        <h1 className="text-3xl font-semibold text-red-700 dark:text-red-400 mb-2">
          Something went wrong
        </h1>
        <p className="text-base text-red-800 dark:text-red-300 max-w-md">
          {error || 'Unable to fetch courses. Please try again later.'}
        </p>
      </div>
    );
  }

  const { courses } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-[#0f0f0f] dark:to-[#1a1a1a] transition-colors">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <section className="grid gap-8">
          <AdminCourseContainer courses={courses} />
        </section>
      </main>
    </div>
  );
}
