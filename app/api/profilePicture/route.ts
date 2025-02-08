import { CurrentProfile } from '@/lib/auth/current-profile';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import db from '@/lib/db';

export const POST = async (req: Request) => {
    const { profile } = await CurrentProfile();

    if (!profile) {
        return redirect('/auth');
    }

    const payload = await req.json();

    if (!payload.fileUrl) {
        return NextResponse.json('Нет ссылки файла', { status: 400 });
    }

    try {
        await db.profile.update({
            where: {
                id: profile.id,
            },
            data: {
                image: payload.fileUrl
            }
        });
    } catch (error) {
        return NextResponse.json('Что-то пошло не так...', { status: 500 });
    }

    return NextResponse.json('OK');
}