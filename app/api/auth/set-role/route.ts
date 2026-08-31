import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { role } = await request.json();

  if (role !== "employer" && role !== "job_seeker") {
    return NextResponse.json(
      { error: "Invalid role" },
      { status: 400 }
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}