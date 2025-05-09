'use client';
import { VideoType } from '@/lib/actions/types';
import VideoListItem from './VideoListItem';
import { VideoModal } from './VideoModal';
import { useState } from 'react';

export default function VideoContainer({
  videos = [],
}: {
  videos: VideoType[];
}) {
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoClick = (video: VideoType) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };
  if (videos.length === 0) {
    return <div>No videos available for this course</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {videos.map((video) => (
        <VideoListItem
          key={video.videoId}
          video={video}
          onClick={handleVideoClick}
        />
      ))}

      {selectedVideo && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          video={selectedVideo}
        />
      )}
    </div>
  );
}
