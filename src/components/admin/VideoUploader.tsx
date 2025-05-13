'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { createCourseVideo } from '@/lib/actions/adminActions';
import { AlertCircle, Info, Upload } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import FileDropzone from '../ui/FileDropzone';

const MAX_FILE_SIZE = 200 * 1024 * 1024;

interface VideoUploaderProps {
  courseId: string;
}

export default function VideoUploader({ courseId }: VideoUploaderProps) {
  const [videoTitle, setVideoTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetState = useCallback(() => {
    setStatus('');
    setProgress(0);
    setError(null);
  }, []);

  const validateFile = useCallback((file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) return 'File size exceeds 200MB limit';
    if (file.type !== 'video/mp4') return 'Only MP4 files are supported';
    if (!file.name.toLowerCase().endsWith('.mp4'))
      return 'Only .mp4 extensions allowed';
    return null;
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      resetState();
      const selectedFile = e.target.files?.[0] || null;
      if (!selectedFile) return setFile(null);

      const validationError = validateFile(selectedFile);
      if (validationError) {
        setError(validationError);
        setFile(null);
        e.target.value = '';
        return;
      }

      setFile(selectedFile);
    },
    [resetState, validateFile]
  );

  const handleUpload = useCallback(async () => {
    if (!file || !courseId) {
      setError('Missing file or course');
      return;
    }

    try {
      resetState();
      setIsUploading(true);
      setStatus('Preparing upload...');

      const { data } = await createCourseVideo(videoTitle, courseId, file.type);
      if (!data) {
        setError('Failed to get upload URL');
        return;
      }
      const { uploadUrl, key } = data;
      setStatus('Uploading video to S3...');

      // Create a promise for the XHR upload instead of returning it
      const uploadPromise = new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', uploadUrl);
        xhr.setRequestHeader('Content-Type', file.type);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
            setStatus(`Uploading: ${percent}%`);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            setStatus(`Upload successful! File key: ${key}`);
            toast.success('Upload successful!');
            setTimeout(() => {
              toast.info(
                'Video will be available after transcoding this depends on length and size of video'
              );
            }, 300);
            resolve();
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        };

        xhr.onerror = () => reject(new Error('Network error during upload'));
        xhr.onabort = () => reject(new Error('Upload was aborted'));

        xhr.send(file);
      });

      // Wait for the upload to complete
      await uploadPromise;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      setStatus('Upload failed');
      throw err; // Re-throw to be caught in handleSubmit
    } finally {
      setIsUploading(false);
    }
  }, [file, courseId, resetState, videoTitle]);

  const handleSubmit = async () => {
    if (!videoTitle.trim()) return toast.error('Enter a video title');
    if (!file) return toast.error('Select a video file');
    if (!courseId) return toast.error('Select a course');
    try {
      await handleUpload();
      setVideoTitle('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      // Error is already handled in handleUpload
      console.error('Upload failed:', error);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      resetState();
      const droppedFile = e.dataTransfer.files?.[0];
      if (!droppedFile) return;

      const validationError = validateFile(droppedFile);
      if (validationError) {
        setError(validationError);
        return;
      }

      setFile(droppedFile);
    },
    [resetState, validateFile]
  );

  return (
    <div className="space-y-4">
      {/* Title input and file dropzone in a row */}
      <div className="flex flex-col gap-4">
        <div className="flex-1 space-y-1">
          <Label htmlFor="video-title">Video Title *</Label>
          <Input
            id="video-title"
            placeholder="Enter video title"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            disabled={isUploading}
          />
        </div>

        <div className="flex-1">
          <FileDropzone
            file={file}
            isUploading={isUploading}
            onFileChange={handleFileChange}
            onRemoveFile={() => {
              setFile(null);
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            onDrop={handleDrop}
            fileInputRef={fileInputRef}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          />
        </div>
      </div>

      {/* Progress bar (only shown when uploading) */}
      {isUploading && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-medium text-gray-700">{status}</span>
            <span className="font-bold text-blue-600">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200" />
          <p className="text-xs text-gray-500 italic">
            Please don&apos;t close this window during upload
          </p>
        </div>
      )}

      {/* Error alert (only shown when there's an error) */}
      {error && (
        <Alert variant="destructive" className="py-2">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span className="font-medium">{error}</span>
          </div>
        </Alert>
      )}

      {/* Upload button and info note inline */}
      <div className="flex flex-col items-center gap-4">
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Important</AlertTitle>
          <AlertDescription className="text-blue-700">
            Only MP4 files up to 200MB are supported. After upload, the video
            will be transcoded which may take several minutes.
          </AlertDescription>
        </Alert>
        <Button
          onClick={handleSubmit}
          disabled={!file || !videoTitle.trim() || isUploading}
          className="flex-shrink-0"
        >
          {isUploading ? (
            <span className="flex items-center gap-1 animate-pulse">
              ⏳ Uploading...
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Upload size={16} /> Upload Video
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
