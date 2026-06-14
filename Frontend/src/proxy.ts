import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_KEYS, ROUTES } from './lib/constants';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;

  const protectedRoutes = [ROUTES.DASHBOARD, ROUTES.PROFILE];
  const authRoutes = [ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.VERIFY_OTP];

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Redirect to login if accessing a protected route without being authenticated
  if (isProtectedRoute && !token) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    // Remember the page they tried to visit
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing an auth route while already authenticated
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

// Config to specify matching paths
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/login',
    '/register',
    '/verify-otp',
  ],
};
