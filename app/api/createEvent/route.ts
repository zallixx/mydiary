import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { CurrentProfile } from '@/lib/auth/current-profile';
import { redirect } from 'next/navigation';
import { ScheduleItemType } from '@prisma/client';

export async function POST(req: Request) {
    const { profile } = await CurrentProfile();

    if (!profile) {
        return redirect('/auth');
    }

    const payload = await req.json();
    if (!payload.name || !payload.description || !payload.startDateTime || !payload.endDateTime || !payload.place) {
        return NextResponse.json('Отсутствуют обязательные поля', { status: 400 });
    }

    try {
        await db.group.upsert({
            where: {
                name: profile.id,
            },
            update: {
                scheduleItems: {
                    create: {
                        type: ScheduleItemType.EVENT,
                        name: payload.name,
                        topic: payload.description,
                        startTime: payload.startDateTime,
                        endTime: payload.endDateTime,
                        room: payload.place,
                        recurring: payload.recurring,
                        recurrenceRule: payload.recurrenceRule,
                        teacherId: profile.id,
                    },
                },
            },
            create: {
                name: profile.id,
                scheduleItems: {
                    create: {
                        type: ScheduleItemType.EVENT,
                        name: payload.name,
                        topic: payload.description,
                        startTime: payload.startDateTime,
                        endTime: payload.endDateTime,
                        room: payload.place,
                        recurring: payload.recurring,
                        recurrenceRule: payload.recurrenceRule,
                        teacherId: profile.id,
                    },
                },
                students: {
                    connect: [{ id: profile.id }],
                },
            }
        });
    } catch (error) {
        return NextResponse.json('Что-то пошло не так...', { status: 500 });
    }

    return NextResponse.json('OK');
}