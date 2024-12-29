import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { CurrentProfile } from '@/lib/auth/current-profile';

export async function POST(request: Request) {
    if (request.method !== 'POST') {
        return NextResponse.json('Метод не разрешен', { status: 405 });
    }

    const { profile } = await CurrentProfile();

    if (!profile) {
        return redirect('/sign-in');
    }

    const payload = await request.json();

    if (!payload.assignment && !payload.homework) {
        return NextResponse.json('Отсутствуют обязательные поля', { status: 400 });
    }

    const assignment = payload.assignment;
    const homework = payload.homework;
    let result = null;

    if(assignment) {
        try {
            result = await db.homeworkCompletion.upsert({
                where: {
                    id: assignment.homeworkCompletion[0]?.id + "",
                    specificAssignmentId: assignment.id,
                    profileId: profile.id,
                },
                update: {
                    isCompleted: !assignment.homeworkCompletion[0]?.isCompleted,
                },
                create: {
                    specificAssignmentId: assignment.id,
                    profileId: profile.id,
                    isCompleted: true,
                }
            })
        } catch (error) {
            return NextResponse.json(error, { status: 500 });
        }
    }
    if(homework) {
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
    }
    return NextResponse.json(result, { status: 200 });
}