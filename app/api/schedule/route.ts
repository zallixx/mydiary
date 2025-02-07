import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { CurrentProfile } from '@/lib/auth/current-profile';
import { redirect } from 'next/navigation';
import { RRule } from 'rrule';

export async function POST(request: Request) {
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
        const targetDate = new Date(date);
        const nextDay = new Date(targetDate.getTime() + 24 * 60 * 60 * 1000);
        const groupIds = profile.groups.map((group) => group.id);

        const schedule = await db.scheduleItem.findMany({
            where: {
                OR: [
                    {
                        recurring: false,
                        startTime: {
                            gte: targetDate,
                            lt: nextDay,
                        },
                    },
                    {
                        recurring: true,
                        startTime: {
                            lte: targetDate,
                        },
                    },
                ],
                groupId: {
                    in: groupIds,
                },
            },
            select: {
                teacher: {
                    select: {
                        name: true,
                        surname: true,
                    },
                },
                subject: {
                    select: {
                        name: true,
                    },
                },
                topic: true,
                type: true,
                room: true,
                startTime: true,
                endTime: true,
                recurring: true,
                recurrenceRule: true,
                absences: {
                    where: {
                        profileId: profile.id,
                        date: {
                            gte: targetDate,
                            lt: nextDay,
                        },
                    },
                    select: {
                        type: true,
                    },
                },
                assessments: {
                    where: {
                        profileId: profile.id,
                        date: {
                            gte: targetDate,
                            lt: nextDay,
                        }
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
                        OR: [
                            {
                                isSpecialized: false,
                            },
                            {
                                isSpecialized: true,
                                assignees: {
                                    some: {
                                        id: profile.id,
                                    },
                                },
                            },
                        ],
                        date: {
                            gte: targetDate,
                            lt: nextDay,
                        },
                    },
                    select: {
                        id: true,
                        description: true,
                        isSpecialized: true,
                        attachments: {
                            select: {
                                url: true,
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
                    }
                },
            },
        });

        function isOccurrenceOnDate(scheduleItem: any, date: Date) {
            const eventDate = new Date(scheduleItem.startTime);
            if (!scheduleItem.recurring || !scheduleItem.recurrenceRule) {
                return eventDate >= date && eventDate < nextDay;
            }

            const rule = RRule.fromString(scheduleItem.recurrenceRule);
            const ruleWithStart = new RRule({
                ...rule.options,
                dtstart: new Date(scheduleItem.startTime),
            });

            const occurrences = ruleWithStart.between(
                targetDate,
                nextDay,
                true
            );

            return occurrences.length > 0;
        }


        const filteredSchedule = schedule.filter((scheduleItem) => isOccurrenceOnDate(scheduleItem, targetDate));

        return NextResponse.json(filteredSchedule, { status: 200 });
    } catch (error) {
        return NextResponse.json('Что-то пошло не так', { status: 500 });
    }
}
