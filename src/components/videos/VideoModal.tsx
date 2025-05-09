import { useRef, useEffect } from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
import { VideoType } from '@/lib/actions/types';

// Import the videojs-quality-selector plugin
// If you don't have this installed, run: npm install --save videojs-hls-quality-selector
import 'videojs-hls-quality-selector';

interface VideoModalProps {
  video: VideoType;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef(null);
  const playerRef = useRef<Player | null>(null);
  // const [, setCurrentQuality] = useState<string>('auto');

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isOpen && videoRef.current && !playerRef.current) {
      timeout = setTimeout(() => {
        if (videoRef.current) {
          // Initialize the player
          playerRef.current = videojs(videoRef.current, {
            controls: true,
            responsive: true,
            fluid: true,
            html5: {
              hls: {
                enableLowInitialPlaylist: true,
                smoothQualityChange: true,
                overrideNative: true,
              },
            },
            sources: [
              {
                src: video.masterPlaylistUrl,
                type: 'application/x-mpegURL',
              },
            ],
          });

          // Add the quality selector plugin when player is ready
          playerRef.current.on('ready', function () {
            if (playerRef.current) {
              // Register the plugin
              // @ts-expect-error Hls-quality sector
              playerRef.current.hlsQualitySelector({
                displayCurrentQuality: true,
              });

              // // Listen for quality change events
              // playerRef.current.on(
              //   'qualitySelected',
              //   function (event, quality) {
              //     // setCurrentQuality(quality.label || 'auto');
              //   }
              // );
            }
          });

          // Other event listeners
          playerRef.current.on('waiting', () => {
            videojs.log('player is waiting');
          });

          playerRef.current.on('dispose', () => {
            videojs.log('player will dispose');
          });
        }
      }, 100); // Delay to ensure modal is fully in the DOM
    }

    return () => {
      clearTimeout(timeout);
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [isOpen, video.masterPlaylistUrl]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl px-4"
        onClick={(e) => e.stopPropagation()} // prevent close on video click
      >
        <div className="relative">
          <video
            ref={videoRef}
            className="rounded-lg video-js vjs-big-play-centered"
          />
        </div>
      </div>
    </div>
  );
}
