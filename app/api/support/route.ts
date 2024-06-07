import { NextResponse } from 'next/server';
import CurrentProfile from '@/lib/current-profile';
import { auth } from '@clerk/nextjs/server';
import db from '@/lib/db';

export async function POST(request: Request) {
    if(request.method !== 'POST') {
        return NextResponse.json('Method not allowed', { status: 405 });
    }

    const profile = await CurrentProfile();

    if(!profile) {
        return auth().redirectToSignIn();
    }

    const payload = await request.json();

    if(!payload.city || !payload.problemName || !payload.problemDescription) {
        return NextResponse.json('Missing required fields', { status: 400 });
    }

    const SupportMessage = await db.supportMessage.create({
        data: {
            profileId: profile.id,
            city: payload.city,
            problemName: payload.problemName,
            problemDescription: payload.problemDescription
        }
    });

    if(!SupportMessage) {
        return NextResponse.json('Something went wrong', { status: 500 });
    }

    return NextResponse.json('OK', { status: 200 });
}