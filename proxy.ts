import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get("role")?.value;

  if (
    role === "employer" &&
    pathname.startsWith("/jobSeeker")
  ) {
    return NextResponse.redirect(
      new URL("/employer/feed", request.url)
    );
  }

  if (
    role === "job_seeker" &&
    pathname.startsWith("/employer")
  ) {
    return NextResponse.redirect(
      new URL("/jobSeeker/search", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/employer/:path*",
    "/jobSeeker/:path*",
  ],
};