// utils/fetchWithAuth.ts
import { cookies } from 'next/headers';

/**
 * A utility function to perform fetch requests with optional authorization.
 * If a token is found in cookies, it adds the Authorization header.
 *
 * @param url - The endpoint URL.
 * @param options - Fetch options (method, body, headers, etc.).
 * @returns A Promise resolving to the Fetch API Response object.
 */
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = (await cookies()).get('token')?.value;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(url, {
    ...options,
    headers,
  });
}
