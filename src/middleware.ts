import { NextRequest, NextResponse } from "next/server";
import { ROOT, ROUTES } from "./utils/routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === ROOT) {
    return NextResponse.redirect(new URL(ROUTES.COMPANY, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
