'use server';
import { CourseType, VideoType } from './types';
import { API_ENDPOINTS } from '@/config/constants';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

type FetchCoursesResponse = {
  data: { courses: CourseType[] } | null;
  error: string | null;
  status: number;
};

/**
 * Fetch all courses from the upstream API and validate the response.
 * Returns a typed object with a list of courses or throws an error.
 */
export async function fetchAllCourses(): Promise<FetchCoursesResponse> {
  try {
    const res = await fetch(`${API_ENDPOINTS.BASE_URL}/get-courses`, {
      next: {
        tags: ['courses'],
      },
    });

    if (!res.ok) {
      throw new Error(`Upstream API error with status ${res.status}`);
    }

    const data = await res.json();

    const rawCourses = Array.isArray(data.courses) ? data.courses : [];

    const courses: CourseType[] = rawCourses.map((item: any) =>
      unmarshall(item)
    );

    return {
      data: { courses },
      error: null,
      status: 200,
    };
  } catch (error) {
    console.error('Error in fetchAllCourses:', error);
    return {
      data: null,
      error: 'Internal server error',
      status: 500,
    };
  }
}

type FetchVideosResponse = {
  data: { videos: VideoType[] } | null;
  error: string | null;
  status: number;
};

export async function fetchAllCourseVideos(
  courseId: string
): Promise<FetchVideosResponse> {
  try {
    const res = await fetch(
      `${API_ENDPOINTS.BASE_URL}/get-videos?courseId=${courseId}`
    );

    if (!res.ok) {
      throw new Error(`Upstream API error with status ${res.status}`);
    }

    const data = await res.json();

    const rawVideos = Array.isArray(data.videos) ? data.videos : [];

    const videos: VideoType[] = rawVideos.map((item: any) => unmarshall(item));

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
    const token = (await cookies()).get('token')?.value;

    const res = await fetch(`${API_ENDPOINTS.BASE_URL}/create-course`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Upstream API error with status ${res.status}`);
    }

    revalidateTag('courses');
    const data = await res.json();
    const { message, courseId } = data;
    console.log(data);
    // const rawVideos = Array.isArray(data.videos) ? data.videos : [];

    // const videos: VideoType[] = rawVideos.map((item: any) => unmarshall(item));

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
    const token = (await cookies()).get('token')?.value;

    const res = await fetch(`${API_ENDPOINTS.BASE_URL}/create-course-video`, {
      method: 'POST',
      body: JSON.stringify({ title, courseId, fileType }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
