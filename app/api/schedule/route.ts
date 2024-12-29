import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { CurrentProfile } from '@/lib/auth/current-profile';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
    if (request.method !== 'POST') {
        return NextResponse.json('Метод не разрешен', { status: 405 });
    }

    const { profile } = await CurrentProfile();

    if (!profile) {
        return redirect('/sign-in');
    }

    const payload = await request.json();

    const date = payload.date;

    if (!date) {
        return NextResponse.json('Отсутствуют обязательные поля', { status: 400 });
    }

    try {
        const dateObj = new Date(date as string);
        const startOfDay = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()-1, 23, 59, 59));
        const endOfDay = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 23, 59, 59));
        const dayOfWeek = endOfDay.getUTCDay();
        const groupIds = profile.groups.map((group) => group.id);

        const scheduleForDay = await db.weeklySchedule.findMany({
            where: {
                dayOfWeek: dayOfWeek,
                groupId: {
                    in: groupIds,
                },
            },
            orderBy: {
                baseSchedule: {
                    date: 'asc',
                },
            },
            select: {
                topic: true,
                place: true,
                event_type: true,
                specificAssignment: {
                    where: {
                        profile: {
                            some: {
                                id: profile.id,
                            },
                        },
                        date: {
                            gt: startOfDay,
                            lt: endOfDay,
                        },
                    },
                    select: {
                        id: true,
                        description: true,
                        completions: {
                            where: {
                                profileId: profile.id,
                            },
                            select: {
                                id: true,
                                isCompleted: true,
                            },
                        },
                    },
                },
                baseSchedule: {
                    select: {
                        date: true,
                        duration: true,
                        room: true,
                        type: true,
                        subject: {
                            select: {
                                name: true,
                            },
                        },
                        teacher: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                absence: {
                    where: {
                        profileId: profile.id,
                        date: {
                            gt: startOfDay,
                            lt: endOfDay,
                        },
                    },
                    select: {
                        type: true,
                    },
                },
                assessment: {
                    where: {
                        profileId: profile.id,
                        date: {
                            gt: startOfDay,
                            lt: endOfDay,
                        },
                    },
                    select: {
                        comment: true,
                        category: true,
                        gradeType: true,
                        grade: true,
                    },
                },
                homework: {
                    where: {
                        groupId: {
                            in: groupIds,
                        },
                        date: {
                            gt: startOfDay,
                            lt: endOfDay,
                        },
                    },
                    select: {
                        id: true,
                        description: true,
                        fileAttachments: {
                            select: {
                                url: true,
                            },
                        },
                        attachments: {
                            select: {
                                url: true,
                                type: true,
                                name: true,
                            },
                        },
                        completions: {
                            where: {
                                profileId: profile.id,
                            },
                            select: {
                                id: true,
                                isCompleted: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json(scheduleForDay, { status: 200 });
    } catch (error) {
        return NextResponse.json('Что-то пошло не так', { status: 500 });
    }
}
