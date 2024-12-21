import * as React from 'react';
import { getTodayString } from '@/components/diary/schedule/functions';
import { weekProps } from '@/components/diary/schedule/interfaces';

export default function DayButton({ day, handleDayClick, selectedDay }: { day: weekProps, handleDayClick: (day: string) => void, selectedDay: string }) {
    const isToday = day.full === getTodayString();

    return (
        <button key={day.full} className={`flex flex-col items-center justify-center w-20 max-lg:w-10 h-14 rounded-lg transition-colors text-black ${
            selectedDay === day.full ? "border-[0.4px]" : "hover:text-accent-foreground hover:bg-[#f1f4ff]"}`}
            onClick={() => handleDayClick(day.full)}
        >
            <span className={`text-xs ${selectedDay === day.full ? '' : 'text-muted-foreground'}`}>
                {day.short}
            </span>
            <span className={`text-sm font-medium ${selectedDay === day.full ? '' : 'text-foreground'}`}>
                {day.num}
            </span>
            {isToday && (
                <div className="w-6 h-0.5 bg-blue-500 mt-1"/>
            )}
        </button>
    );
}