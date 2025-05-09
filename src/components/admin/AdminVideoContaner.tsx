'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { VideoType } from '@/lib/actions/types';
import { useState } from 'react';
import { VideoContainer } from '../videos';
import CreateVideoModal from './CreateVideoModal';

function AdminVideoContainer({
  videos = [],
  courseId,
}: {
  videos: VideoType[];
  courseId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add New Video</Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl w-full">
            <CreateVideoModal courseId={courseId} />
          </DialogContent>
        </Dialog>
      </div>

      <VideoContainer videos={videos} />
    </div>
  );
}

export default AdminVideoContainer;
