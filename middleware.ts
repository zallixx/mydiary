import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth/current-profile';

const publicRoutes = ['/sign-up', '/sign-in'];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const headers = req.headers.get('cookie');
    const isPublicRoute = publicRoutes.includes(path);

    if (!headers) {
        if (isPublicRoute) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    if(headers) {
        if (!isPublicRoute) {
            return NextResponse.next();
        }
        const { activated } = await verifySession();
        if (activated) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
