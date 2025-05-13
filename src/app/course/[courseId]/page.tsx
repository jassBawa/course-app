import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import EnrollButton from '@/components/courses/EnrollmentButton';
import { fetchCourse } from '@/lib/actions/dasboardActions';
import { getUserEnrollment } from '@/lib/actions/UserActions';

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const [courseResponse, enrollmentResponse] = await Promise.all([
    fetchCourse(courseId),
    getUserEnrollment(courseId),
  ]);

  if (!courseResponse.data || courseResponse.error) {
    return notFound();
  }

  const { course } = courseResponse.data;

  const isEnrolled = enrollmentResponse.data?.enrolled || false;
  const isLoggedIn = enrollmentResponse.status !== 401;

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 flex items-center gap-1 w-min"
        asChild
      >
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Courses</span>
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Content - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES?.map((category: string) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {course.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Harkirat Singh</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>40 hours</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Updated May 2024</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden lg:hidden">
            <Image
              src={course?.image || '/placeholder.svg?height=720&width=1280'}
              alt={course.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <h2 className="text-2xl font-semibold mb-4">About This Course</h2>
            <p className="text-base leading-relaxed">{course.description}</p>

            <>
              <h3 className="text-xl font-semibold mt-8 mb-4">
                What You&apos;ll Learn
              </h3>
              <ul className="space-y-2">
                {LISTINGS.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          </div>
        </div>

        {/* Course Card - Right Side */}
        <div>
          <Card className="sticky top-8 overflow-hidden">
            <div className="relative aspect-video rounded-t-lg overflow-hidden hidden lg:block">
              <Image
                src={course?.image || '/placeholder.svg?height=720&width=1280'}
                alt={course.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-6 space-y-6">
              <EnrollButton
                courseId={courseId}
                isEnrolled={isEnrolled}
                isLoggedIn={isLoggedIn}
              />

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">This course includes:</h3>
                <ul className="space-y-2 text-sm">
                  <>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span>Full lifetime access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span>Access on mobile and desktop</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span>Certificate of completion</span>
                    </li>
                  </>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const LISTINGS = [
  'Build responsive websites with HTML, CSS, and JavaScript',
  'Create dynamic web applications with React',
  'Develop backend services with Node.js and Express',
  'Work with databases like MongoDB and PostgreSQL',
  'Deploy your applications to the cloud',
];

const CATEGORIES = ['Web Development', 'Programming', 'Frontend'];
