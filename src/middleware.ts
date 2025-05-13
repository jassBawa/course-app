import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const pathname = req.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith('/admin');
  const isDashboardRoute = pathname.startsWith('/dashboard');

  if (!token && (isDashboardRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (token && isAdminRoute) {
    try {
      // Cognito ID tokens are JWTs — decode without verifying signature here (middleware can't use secrets)
      const payload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString()
      );

      const groups = payload['cognito:groups'] || [];

      if (!groups.includes('admin')) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch (err) {
      console.error('Invalid token:', err);
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
