import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VideoType } from '@/lib/actions/types';
import Image from 'next/image';
import { Button } from '../ui/button';

function VideoListItem({
  video,
  onClick,
}: {
  video: VideoType;
  onClick: (e: VideoType) => void;
}) {
  return (
    <Card className="relative p-0 overflow-hidden transition-shadow bg-white border rounded-lg dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
      {/* Video Image */}
      <div className="relative w-full h-48 bg-gray-200">
        <Image
          src={'/images/video-cover.png'}
          alt={video.title}
          fill
          className="object-cover w-full h-full"
        />
        <h4 className="absolute max-w-full px-4 py-2 text-lg font-bold text-center text-white truncate transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:max-w-xs md:max-w-sm lg:max-w-md">
          {video?.title}
        </h4>
      </div>

      {/* Card Content */}
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Resolutions */}
          <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Resolutions:</span>
            <div className="flex space-x-2">
              {/* Loop over resolutions and display the quality */}
              {Object.keys(video.resolutions).map((quality) => (
                <Badge
                  key={quality}
                  variant="outline"
                  className="text-sm font-semibold text-indigo-600 dark:text-indigo-400"
                >
                  {quality}
                </Badge>
              ))}
            </div>
          </div>

          {/* Uploaded At */}
          <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Uploaded At:</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(video.uploadedAt).toLocaleDateString()}
            </span>
          </div>

          <Button
            className="w-full font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={() => onClick(video)}
          >
            Play
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default VideoListItem;
