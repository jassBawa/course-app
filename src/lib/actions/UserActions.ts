'use server';
import { API_ENDPOINTS } from '@/config/constants';
import { fetchWithAuth } from '../fetchWithAuth';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { CourseType, VideoType } from './types';

type GetUserEnrollmentResponse = {
  data: { enrolled: boolean } | null;
  error: string | null;
  status: number;
};

export async function getUserEnrollment(
  courseId: string
): Promise<GetUserEnrollmentResponse> {
  try {
    const res = await fetchWithAuth(
      `${API_ENDPOINTS.BASE_URL}/is-user-enrolled?courseId=${courseId}`
    );

    if (res.status === 401 || res.status === 403) {
      // Not logged in or unauthorized
      return {
        data: { enrolled: false },
        error: null,
        status: res.status,
      };
    }
    // If API responds but not OK, still return error safely
    if (!res.ok) {
      return {
        data: null,
        error: `API responded with status ${res.status}`,
        status: res.status,
      };
    }

    const data = await res.json();

    return {
      data: { enrolled: data.enrolled },
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

type EnrollCourseResponse = {
  data: { message: string } | null;
  error: string | null;
  status: number;
};

export async function setCourseEnrollment(
  courseId: string
): Promise<EnrollCourseResponse> {
  try {
    const res = await fetchWithAuth(`${API_ENDPOINTS.BASE_URL}/enroll-course`, {
      method: 'POST',
      body: JSON.stringify({ courseId: courseId }),
    });

    // If API responds but not OK, still return error safely
    if (!res.ok) {
      return {
        data: null,
        error: `API responded with status ${res.status}`,
        status: res.status,
      };
    }

    const data = await res.json();

    return {
      data: { message: data.message },
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

type GetUserCoursesResponse = {
  data: { courses: CourseType[] } | null;
  error: string | null;
  status: number;
};

export async function getUserCourses(): Promise<GetUserCoursesResponse> {
  try {
    const res = await fetchWithAuth(
      `${API_ENDPOINTS.BASE_URL}/get-user-courses`
    );

    if (!res.ok) {
      return {
        data: null,
        error: `API responded with status ${res.status}`,
        status: res.status,
      };
    }

    const data = await res.json();

    return {
      data: { courses: data.courses },
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

type FetchVideosResponse = {
  data: { videos: VideoType[] } | null;
  error: string | null;
  status: number;
};

export async function fetchAllCourseVideos(
  courseId: string
): Promise<FetchVideosResponse> {
  try {
    const res = await fetchWithAuth(
      `${API_ENDPOINTS.BASE_URL}/get-videos?courseId=${courseId}`
    );

    if (!res.ok) {
      const data = await res.json();

      return {
        data: null,
        error: data.error,
        status: res.status,
      };
    }

    // Ensure valid JSON
    const data = await res.json();

    if (!data || !Array.isArray(data.videos)) {
      return {
        data: null,
        error: 'Invalid data format received from API',
        status: 500,
      };
    }

    const videos: VideoType[] = data.videos.map((item: any) =>
      unmarshall(item)
    );

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
