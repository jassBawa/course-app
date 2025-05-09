'use client';

import React from 'react';
import { FileVideo, Film } from 'lucide-react';
import { Button } from './button';

interface FileDropzoneProps {
  file: File | null;
  isUploading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isDragging: boolean;
  setIsDragging: (val: boolean) => void;
}

export default function FileDropzone({
  file,
  isUploading,
  onFileChange,
  onRemoveFile,
  onDrop,
  fileInputRef,
  isDragging,
  setIsDragging,
}: FileDropzoneProps) {
  return (
    <div
      onDragEnter={(e) => {
        e.preventDefault();
        if (!isUploading) setIsDragging(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (!isUploading) setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={onDrop}
      // onClick={() => fileInputRef.current?.click()}
      className={`border-2 ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      } border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-blue-500 hover:bg-blue-50`}
    >
      {!file ? (
        <>
          <FileVideo className="mx-auto h-12 w-12 text-gray-400" />
          <p className="text-sm text-gray-600 mt-2">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 mt-1">MP4 up to 200MB</p>
        </>
      ) : (
        <>
          <Film className="mx-auto h-8 w-8 text-blue-500" />
          <p className="text-sm font-medium text-gray-900 mt-2">{file.name}</p>
          <p className="text-xs text-gray-500 mt-1">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFile();
            }}
            disabled={isUploading}
          >
            Change
          </Button>
        </>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4"
        onChange={onFileChange}
        disabled={isUploading}
        className="sr-only"
      />
    </div>
  );
}
