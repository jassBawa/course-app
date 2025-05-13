'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockKeyhole } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { setCourseEnrollment } from '@/lib/actions/UserActions';

interface EnrollButtonProps {
  courseId: string;
  isEnrolled: boolean;
  isLoggedIn: boolean;
}

export default function EnrollButton({
  courseId,
  isEnrolled,
  isLoggedIn,
}: EnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  console.log(isEnrolled);

  const handleEnroll = async () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=/course/${courseId}`);
      return;
    }

    setIsLoading(true);
    try {
      // Here you would implement the enrollment API call
      const { error } = await setCourseEnrollment(courseId);

      // Simulate API call
      if (error) {
        toast.error(error);
        return;
      }

      toast('Successfully enrolled!', {
        description: 'You now have access to all course materials.',
      });
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Enrollment failed', {
        description:
          'There was an error enrolling in this course. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueLearning = () => {
    router.push(`/dashboard/${courseId}/`);
  };

  if (isEnrolled) {
    return (
      <Button className="w-full" size="lg" onClick={handleContinueLearning}>
        Continue Learning
      </Button>
    );
  }

  return (
    <Button
      className="w-full"
      size="lg"
      onClick={handleEnroll}
      disabled={isLoading}
    >
      {isLoading ? (
        'Processing...'
      ) : isLoggedIn ? (
        'Enroll Now'
      ) : (
        <>
          <LockKeyhole className="mr-2 h-4 w-4" />
          Sign in to Enroll
        </>
      )}
    </Button>
  );
}
