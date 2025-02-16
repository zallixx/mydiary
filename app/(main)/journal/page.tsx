import { redirect } from 'next/navigation';
import { CurrentProfile } from '@/lib/auth/current-profile';
import db from '@/lib/db';
import { ScheduleItemType } from '@prisma/client';
import SelectSchedule from '@/components/journal/select-schedule';
import SelectScheduleHeader from '@/components/journal/select-schedule-header';
import { groupScheduleItemsByDate } from '@/utils/journal';

export default async function ScheduleViewPage() {
    const { profile } = await CurrentProfile();

    if (!profile) {
        return redirect('/');
    } else if (profile.groups.length === 0 || profile.role !== 'TEACHER') {
        return redirect('/');
    }

    const targetDate = new Date();
    const nextDay = new Date(targetDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const scheduleItems = await db.scheduleItem.findMany({
        where: {
            teacherId: profile.id,
            type: ScheduleItemType.LESSON,
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
        },
        include: {
            group: true,
            subject: true,
        },
        orderBy: { startTime: 'asc' },
    });

    const scheduleItemsArray = groupScheduleItemsByDate(scheduleItems);

    return (
        <div className="container mx-auto p-4">
            <SelectScheduleHeader />
            <SelectSchedule scheduleItemsArray={scheduleItemsArray} targetDate={targetDate} />
        </div>
    );
}
