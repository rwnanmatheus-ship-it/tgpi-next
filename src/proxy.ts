import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isDiscoveryLocale, studyRequestLanguage } from "@/lib/discovery";

// Authentication context is attached here. Authorization is intentionally
// enforced at each protected layout, page and route handler on the server.
export default clerkMiddleware((_auth, request) => {
  const headers = new Headers(request.headers);
  headers.delete("x-tgpi-discovery-locale");
  const match = /^\/discover\/([^/]+)\/?$/.exec(request.nextUrl.pathname);
  if (match && isDiscoveryLocale(match[1])) headers.set("x-tgpi-discovery-locale", match[1]);
  const studyLanguage = studyRequestLanguage(request.nextUrl.pathname);
  if (studyLanguage) headers.set("x-tgpi-discovery-locale", studyLanguage);
  return NextResponse.next({ request: { headers } });
}, {
  signInUrl: "/sign-in",
  signUpUrl: "/sign-up",
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|mp4|vtt|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
