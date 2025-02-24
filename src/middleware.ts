import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_ROUTES, ROOT } from "./utils/routes";

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken");

  const { pathname } = request.nextUrl;

  if (pathname === ROOT) {
    return NextResponse.redirect(new URL(PUBLIC_ROUTES[0], request.nextUrl));
  }

  const isPublicRoute = PUBLIC_ROUTES.find((route) =>
    pathname.startsWith(route),
  );

  if (!refreshToken && !isPublicRoute)
    return NextResponse.redirect(new URL(PUBLIC_ROUTES[0], request.nextUrl));

  return NextResponse.next();
}

export const config = {
  // Match all URLs EXCEPT:
  // URLs starting with /api/
  // URLs starting with /_next/
  // URLs starting with /static/
  // URLs for files with extensions (like images, fonts, etc.)
  matcher: ["/((?!api|_next|static|.*\\..*).*)"],
};
