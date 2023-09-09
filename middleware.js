import { NextResponse } from "next/server";

export const config = {
  matcher: ["/api/product:path*", "/api/action:path*"],
};

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  const token = requestHeaders.get("auth-token");

  if (!token) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "No user token available" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }
  try {
    return NextResponse.next();
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "authentication failed" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }
}
