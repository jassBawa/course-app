import { CourseType } from '@/lib/actions/types';
import Course from './Course';

interface CourseContainerProps {
  title?: string;
  description?: string;
  courses: CourseType[];
}
export const IMAGES = [
  '/images/course-1.png',
  '/images/course-2.png',
  '/images/course-3.png',
];

export default function CourseContainer({
  title = 'Our Courses',
  description = 'Browse our selection of courses designed to help you grow your skills.',
  courses = [],
}: CourseContainerProps) {
  return (
    <section className="container px-4 py-12 mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="max-w-2xl mx-auto mt-2 text-lg text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="py-16 text-center transition-colors border rounded-lg dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No courses available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <Course
              key={index}
              {...course}
              image={IMAGES[index % IMAGES.length]}
            />
          ))}
        </div>
      )}
    </section>
  );
}
