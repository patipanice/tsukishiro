import { NextResponse, NextRequest } from 'next/server'
// import { authenticate } from 'auth-provider'
 
export function middleware(request: NextRequest) {
  const isAuthenticated = false

  // If the user is authenticated, continue as normal
  if (isAuthenticated) {
    return NextResponse.next()
  }
 
  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL('/signin', request.url))
}
 
export const config = {
  matcher: ['/profile/:path*', '/dashboard/:path*'],  // กำหนดเส้นทางที่ middleware ใช้
  // matcher: [
  //   /*
  //    * Match all request paths except for the ones starting with:
  //    * - api (API routes)
  //    * - _next/static (static files)
  //    * - _next/image (image optimization files)
  //    * - favicon.ico (favicon file)
  //    */
  //   '/((?!api|_next/static|_next/image|favicon.ico).*)',
  // ],
}