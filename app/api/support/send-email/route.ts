import { NextResponse, NextRequest } from 'next/server';
import CurrentProfile from '@/lib/current-profile';
import { auth } from '@clerk/nextjs/server';
import db from '@/lib/db';
import { mailOptions, transporter } from '@/lib/nodemailer';


export async function POST(request: NextRequest) {
    if(request.method !== 'POST') {
        return NextResponse.json('Method not allowed', { status: 405 });
    }

    const profile = await CurrentProfile();

    if(!profile) {
        return auth().redirectToSignIn();
    }

    if (profile.role !== 'ADMIN' && profile.role !== 'DEVELOPER') {
        return NextResponse.json('Unauthorized', { status: 401 });
    }

    const payload = await request.json();

    if(!payload.answer || !payload.profileEmail || !payload.supportMessageId) {
        return NextResponse.json('Missing required fields', { status: 400 });
    }

    await db.supportMessage.update({
        where: {
            id: payload.supportMessageId,
        },
        data: {
            answer: payload.answer
        }
    });

    try {
        const htmlContent = `
            <div>
                <h3>Ответ от технической поддержки:</h3>
                <p>${payload.answer}</p>
            </div>
        `;
        await transporter.sendMail({
            ...mailOptions,
            to: payload.profileEmail,
            subject: `Ответ от технической поддержки`,
            text: payload.answer,
            html: htmlContent,
        });

        return NextResponse.json('OK', { status: 200 });
    } catch (error) {
        return NextResponse.json('Something went wrong', { status: 500 });
    }
}