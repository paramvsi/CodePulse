/**
 * Clerk Authentication Middleware
 *
 * NOTE: This file is intentionally named middleware.ts (not proxy.ts)
 * - Clerk requires Edge runtime, which middleware.ts provides
 * - Next.js 16's proxy.ts uses Node.js runtime (incompatible with Clerk)
 * - The deprecation warning is expected and safe to ignore for Clerk auth
 *
 * @see https://clerk.com/docs/quickstarts/nextjs
 */

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/demo(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
