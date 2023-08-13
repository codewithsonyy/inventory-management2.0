import {  NextRequest , NextResponse } from 'next/server';

import { getToken } from 'next-auth/jwt';

export async function middleware(req) {

  const session = await getToken({ req });

  const isAuth = !!session;
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register');

  if (isAuthPage && isAuth) {
    return NextResponse.redirect('/profile');
  }



  // If the user is authenticated and they're not trying to access an auth page, let them proceed
  if  (isAuth && !isAuthPage) {
    return NextResponse.next();
  }

  // If the user is not authenticated and they're trying to access an auth page, let them proceed
 if  (!isAuth && isAuthPage) {
    return NextResponse.next();
  }
  // else{
  //   return NextResponse.redirect('/');
  // }
}


export const config = {
  matcher: ['/profile/:path*'],
};