import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_ROUTES, ROOT } from "./utils/routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === ROOT) {
    return NextResponse.redirect(new URL(PUBLIC_ROUTES[0], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
