'use client';

import {
    currentTimeInItemRange,
    getLessonTime,
    validateDate
} from '@/utils/schedule';
import {
    Card,
    CardContent
} from '@/components/ui/card';
import { useRouter } from 'next/navigation'

export default function SelectSchedule({scheduleItemsArray, targetDate}: { scheduleItemsArray: any[], targetDate: Date }) {
    const router = useRouter()

    return (
        <div className="grid grid-cols-5 gap-4">
            {scheduleItemsArray.map((day) => (
                <div key={day.date} className="space-y-2">
                    <div className="text-center bg-white py-1 rounded border">
                        <div className="text-sm font-medium">{validateDate(new Date(day.date))}</div>
                    </div>
                    {day.lessons.map((lesson: any) => (
                        <Card key={lesson.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push(`/journal/${lesson.id}`)}>
                            <CardContent className="p-0 pt-0 pr-2 pb-2 w-full">
                                <div className="flex flex-row w-full">
                                    <div className={`h-11 w-1.5 rounded-r-full mt-2 mr-1 ${currentTimeInItemRange(lesson.startTime, lesson.endTime, targetDate) ? 'bg-[#0a3af5]' : 'bg-[#e8e8ef]'}`}></div>
                                    <div className="flex justify-between items-start mt-2 w-full">
                                        <div className="flex-col">
                                            <div className="text-sm font-medium">{lesson.subject.name}</div>
                                            <div className="text-xs text-blue-500">{lesson.group.name}</div>
                                        </div>
                                        <div className="flex mt-1 text-xs text-gray-500">{getLessonTime(lesson.startTime, lesson.endTime)}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ))}
        </div>
    );
}