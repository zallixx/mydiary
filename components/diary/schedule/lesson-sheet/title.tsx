import { getLessonTime, validateDate } from '@/components/diary/schedule/functions';
import { SheetTitle } from '@/components/ui/sheet';
import * as React from 'react';
import { itemProps } from '@/components/diary/schedule/interfaces';

export default function LessonSheetTitle({ item, date }: { item: itemProps; date: Date }) {
    return (
        <SheetTitle className="flex flex-col items-start justify-items-start content-start w-full bg-white pt-3 pl-2 h-[82px] shadow-lg">
            <span className="font-semibold text-lg">
                {item.baseSchedule.subject.name}
            </span>
            <span className="flex text-gray-600">
                {validateDate(date) + ' · ' + getLessonTime(item.baseSchedule.date, item.baseSchedule.duration)}
            </span>
        </SheetTitle>
    );
}