import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host')?.split(':')[0].toLowerCase();
  if (hostname === 'sriharshaagencies.in') {
    const destination = request.nextUrl.clone();
    destination.protocol = 'https:';
    destination.hostname = 'www.sriharshaagencies.in';
    destination.port = '';
    return NextResponse.redirect(destination, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
