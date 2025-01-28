import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Prevent logged-in users from accessing sign-in/signup pages
  if (token && url.pathname.startsWith('/sign-in')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
