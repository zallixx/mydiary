'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import {
    generateWeekOptions,
    generateWeeks,
    getTodayString
} from '@/utils/schedule';

export default function SelectScheduleHeader() {
    const [currentWeek, setCurrentWeek] = useState("");
    const weeks = generateWeeks();
    const weekOptions = generateWeekOptions(weeks);

    useEffect(() => {
        if (weekOptions.length > 0) {
            const today = getTodayString();
            const currentWeekIndex = weeks.findIndex(week =>
                week.some(day => day.full === today)
            );
            setCurrentWeek(currentWeekIndex.toString());
        }
    }, []);

    return (
        <div className="flex flex-row justify-between max-2xm:justify-end items-end mb-2">
            <span className="max-sm:text-base text-2xl font-bold max-2xm:hidden">Расписание</span>
            <Select value={currentWeek} onValueChange={setCurrentWeek}>
                <SelectTrigger className="w-[220px] bg-white">
                    <SelectValue>{weekOptions[parseInt(currentWeek)]?.label}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {weekOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}