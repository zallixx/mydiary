import * as React from 'react';
import { getTodayString } from '@/utils/schedule';
import { weekProps } from '@/types/schedule';

export default function DayButton({ day, handleDayClick, selectedDay }: { day: weekProps, handleDayClick: (day: string) => void, selectedDay: string }) {
    const isToday = day.full === getTodayString();

    return (
        <button key={day.full} className={`flex flex-col items-center justify-center w-20 max-sm:w-10 h-14 rounded-lg transition-colors text-black ${
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
                <div className="w-6 h-0.5 bg-[#0a3af5] mt-1"/>
            )}
        </button>
    );
}