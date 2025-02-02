import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { CurrentProfile } from '@/lib/auth/current-profile';

export async function POST(request: Request) {
    const { profile } = await CurrentProfile();

    if (!profile) {
        return redirect('/sign-in');
    }

    const payload = await request.json();

    if (!payload.homework) {
        return NextResponse.json('Отсутствуют обязательные поля', { status: 400 });
    }

    const homework = payload.homework;
    let result = null;

    try {
        result = await db.homeworkCompletion.upsert({
            where: {
                id: homework.completions[0]?.id + "",
                homeworkId: homework.id,
                profileId: profile.id,
            },
            update: {
                isCompleted: !homework.completions[0]?.isCompleted,
            },
            create: {
                homeworkId: homework.id,
                profileId: profile.id,
                isCompleted: true,
            }
        })
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
    return NextResponse.json(result, { status: 200 });
}