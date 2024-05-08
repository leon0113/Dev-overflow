import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isDashboardRoute = createRouteMatcher(['/ask-question(.*)']);

export default clerkMiddleware((auth, req) => {

    // Restrict dashboard routes to signed in users
    if (isDashboardRoute(req)) auth().protect();
});

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

