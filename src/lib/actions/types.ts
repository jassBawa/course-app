export interface CourseType {
  courseId: string;
  title: string;
  description: string;
  createdAt: string;
  image: string;
}

export interface VideoResolution {
  resolution: string;
  url: string;
}

export interface Resolutions {
  [quality: string]: VideoResolution;
}

export interface VideoType {
  title: string;
  videoId: string;
  courseId: string;
  originalKey: string;
  masterPlaylistUrl: string;
  uploadedAt: string;
  resolutions: Resolutions;
}
