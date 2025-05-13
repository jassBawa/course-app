'use server';
import { revalidateTag } from 'next/cache';
import { fetchWithAuth } from '../fetchWithAuth';
import { API_ENDPOINTS } from '@/config/constants';
import { VideoType } from './types';

type createCourseResponse = {
  data: { message: string; courseId: string } | null;
  error: string | null;
  status: number;
};

export async function createCourse({
  title,
  description,
}: {
  title: string;
  description: string;
}): Promise<createCourseResponse> {
  try {
    const res = await fetchWithAuth(`${API_ENDPOINTS.BASE_URL}/create-course`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
    });

    if (!res.ok) {
      throw new Error(`Upstream API error with status ${res.status}`);
    }

    revalidateTag('courses');
    const data = await res.json();
    const { message, courseId } = data;
    console.log(data);

    return {
      data: { message, courseId },
      error: null,
      status: 200,
    };
  } catch (error) {
    console.error('Error in fetchallvideos:', error);
    return {
      data: null,
      error: 'Internal server error',
      status: 500,
    };
  }
}

type CreateCourseVideoResponse = {
  data: { uploadUrl: string; key: string } | null;
  error: string | null;
  status: number;
};

export async function createCourseVideo(
  title: string,
  courseId: string,
  fileType: string
): Promise<CreateCourseVideoResponse> {
  try {
    const res = await fetchWithAuth(
      `${API_ENDPOINTS.BASE_URL}/create-course-video`,
      {
        method: 'POST',
        body: JSON.stringify({ title, courseId, fileType }),
      }
    );

    if (!res.ok) {
      throw new Error(`Upstream API error with status ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    const { uploadUrl, key } = data;

    return {
      data: { uploadUrl, key },
      error: null,
      status: 200,
    };
  } catch (error) {
    console.error('Error in fetchallvideos:', error);
    return {
      data: null,
      error: 'Internal server error',
      status: 500,
    };
  }
}

type GetCourseVideosResponse = {
  data: { videos: VideoType[] } | null;
  error: string | null;
  status: number;
};

export async function getAdminCourseVideos(
  courseId: string
): Promise<GetCourseVideosResponse> {
  try {
    const res = await fetchWithAuth(
      `${API_ENDPOINTS.BASE_URL}/get-admin-videos?courseId=${courseId}`
    );

    const data = await res.json();
    if (!res.ok) {
      return {
        error: data.error,
        data: null,
        status: res.status,
      };
    }

    const { videos } = data;
    return {
      data: { videos },
      error: null,
      status: 200,
    };
  } catch (error) {
    console.error('Error in fetchallvideos:', error);
    return {
      data: null,
      error: 'Internal server error',
      status: 500,
    };
  }
}
