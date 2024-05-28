import { NextResponse } from 'next/server';
import CurrentProfile from '@/lib/current-profile';
import { auth } from '@clerk/nextjs/server';
import db from '@/lib/db';

export async function POST(request: Request) {
    if(request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    const profile = await CurrentProfile();

    if(!profile) {
        return auth().redirectToSignIn();
    }

    const payload = await request.json();

    if(!payload.city || !payload.topic || !payload.description) {
        return NextResponse.json('Missing required fields', { status: 400 });
    }

    const SupportMessage = await db.supportMessage.create({
        data: {
            profileId: profile.id,
            problemName: payload.topic,
            message: payload.description
        }
    });

    if(!SupportMessage) {
        return NextResponse.json('Something went wrong', { status: 500 });
    }

    return NextResponse.json(SupportMessage, { status: 200 });
}