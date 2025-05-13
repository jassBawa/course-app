'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockKeyhole } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { setCourseEnrollment } from '@/lib/actions/UserActions';
import { useAuth } from 'react-oidc-context';

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
  const auth = useAuth();

  const handleEnroll = async () => {
    if (!isLoggedIn) {
      auth.signinRedirect().catch((error) => {
        console.error('Sign-in error:', error);
      });
      return;
    }

    setIsLoading(true);

    // Here you would implement the enrollment API call
    const { error, data } = await setCourseEnrollment(courseId);

    // Simulate API call
    if (error) {
      toast.error(error);
      return;
    }

    if (data?.message) {
      toast('Successfully enrolled!', {
        description: 'You now have access to all course materials.',
      });
    }
    router.refresh();
    setIsLoading(false);
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
