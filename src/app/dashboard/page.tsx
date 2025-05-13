import { CourseContainer } from '@/components/courses';
import { getUserCourses } from '@/lib/actions/UserActions';
import { notFound } from 'next/navigation';

export default async function Home() {
  const { data, error } = await getUserCourses();

  if (!data || error) {
    return notFound();
  }

  const { courses } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-[#0f0f0f] dark:to-[#1a1a1a] transition-colors">
      <main className="px-4 pb-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <section className="grid gap-8">
          <CourseContainer
            courses={courses}
            title="Your courses"
            getCta={(course) => ({
              href: `/dashboard/${course.courseId}`,
              label: 'Continue Learning',
            })}
          />
        </section>
      </main>
    </div>
  );
}
