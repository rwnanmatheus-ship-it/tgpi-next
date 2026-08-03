import { NextResponse } from "next/server";

/**
 * Next.js 16 proxy entrypoint.
 *
 * Route access remains unchanged for this release. Authentication and premium
 * entitlements continue to be enforced by the existing application guards and
 * server-side billing controls.
 */
export function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
