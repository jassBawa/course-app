'use client';

import React, { useState } from 'react';
import AdminCourse from './AdminCourse';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import CreateCourseModalContent from '../admin/CreateCourseModal';
import { IMAGES } from './CourseContainer';
import { CourseType } from '@/lib/actions/types';

interface CourseContainerProps {
  courses: CourseType[];
}

export default function AdminCourseContainer({
  courses = [],
}: CourseContainerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <section className="container px-4 py-12 mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Your Created Courses
        </h2>
        <p className="max-w-2xl mx-auto mt-2 text-lg text-gray-600 dark:text-gray-400">
          Add new courses with the button below. To manage videos, select a
          course from the list.
        </p>
        <div className="mt-6">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="text-white bg-indigo-600 hover:bg-indigo-700">
                + Add New Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <CreateCourseModalContent onClose={handleClose} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="py-16 text-center transition-colors border rounded-lg bg-gray-50 dark:bg-zinc-900">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No courses available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <AdminCourse
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
