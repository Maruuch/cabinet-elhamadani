import { NextResponse } from 'next/server'

const locales = ['ar', 'fr']

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Redirect root to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/ar', request.url))
  }

  // Redirect paths without locale prefix to /ar
  const hasLocale = locales.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  )
  if (!hasLocale) {
    return NextResponse.redirect(new URL(`/ar${pathname}`, request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
