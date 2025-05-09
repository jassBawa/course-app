'use client';

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import VideoUploader from '../admin/VideoUploader';

interface VideoModalContentProps {
  courseId: string;
}

export default function VideoModalContent({
  courseId,
}: VideoModalContentProps) {
  return (
    <div className="px-1">
      <DialogHeader className="mb-3">
        <DialogTitle>Upload New Video</DialogTitle>
        <DialogDescription className="text-sm">
          Add a new video lesson to your course
        </DialogDescription>
      </DialogHeader>
      <VideoUploader courseId={courseId} />
    </div>
  );
}
