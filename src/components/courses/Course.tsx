'use client';

import { Badge } from '@/components/ui/badge';
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
  image: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  tags?: string[];
}

export default function Course({
  courseId,
  title,
  description,
  image,
  level = 'Beginner',
  tags = ['html', 'css', 'js'],
}: CourseProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 pt-0">
      <div className="relative h-48 w-full">
        <Image src={image} alt={title} fill className="object-cover" priority />
        <div className="absolute bottom-2 right-2">
          <Badge className="bg-white text-black outline-purple-600 outline-2 backdrop-blur px-2 py-0.5 text-sm">
            {level}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
          {title}
        </h3>
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-[10px] font-medium px-2 py-0.5"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4">
          {description}
        </p>
      </CardContent>

      <CardFooter className="pt-4 border-t dark:border-zinc-800">
        <Button
          asChild
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
        >
          <Link href={`/course/${courseId}`}>View Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
