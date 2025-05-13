'use server';
import { API_ENDPOINTS } from '@/config/constants';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { CourseType } from './types';

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

type FetchCourseResponse = {
  data: { course: CourseType } | null;
  error: string | null;
  status: number;
};

export async function fetchCourse(
  courseId: string
): Promise<FetchCourseResponse> {
  try {
    const res = await fetch(
      `${API_ENDPOINTS.BASE_URL}/get-course?courseId=${courseId}`
    );

    if (!res.ok) {
      throw new Error(`Upstream API error with status ${res.status}`);
    }

    const data = await res.json();

    return {
      data: { course: data },
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
