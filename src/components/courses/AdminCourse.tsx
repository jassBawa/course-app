'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export interface CourseProps {
  courseId: string;
  title: string;
  description: string;
  image: string; // not stored in db for now
}

export default function AdminCourse({
  courseId,
  title,
  description,
  image,
}: CourseProps) {
  return (
    <Card className="flex flex-col h-full gap-2 pt-0 overflow-hidden transition-shadow duration-300 bg-white shadow-md hover:shadow-xl dark:bg-zinc-900">
      <div className="relative w-full h-48 bg-zinc-100 dark:bg-zinc-800">
        <Image src={image} alt={title} fill className="object-cover" priority />
      </div>

      <CardHeader className="mt-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4">
          {description}
        </p>
      </CardContent>

      <CardFooter className="pt-4 border-t dark:border-zinc-700">
        <Button
          asChild
          className="w-full text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Link href={`/admin/${courseId}`}>Manage Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
