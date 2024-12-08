'use client';

import React, {useEffect, useState} from 'react';
import ScheduleDayPicker from '@/components/diary/schedule/schedule-day-picker';
import LessonItem from '@/components/diary/schedule/lesson-item';

export default function SchedulePageClient() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [scheduleForDay, setScheduleForDay] = useState([]);

    useEffect(() => {
        if (selectedDate) {
            fetchScheduleForDay(selectedDate).then((data) => setScheduleForDay(data));
        }
    }, [selectedDate]);

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    return (
        <div className="min-h-screen flex items-start lg:pt-32 max-lg:pt-16 justify-center">
            <section className="static left-1/2 right-1/2 lg:w-[1400px] max-lg:w-[90%] max-[520px]:w-[95%] flex flex-col transition-hwp duration-500 ease-in-out">
                <ScheduleDayPicker onDateChange={handleDateChange}/>
                <div className="min-h-96 h-auto pt-2 space-y-2">
                    {scheduleForDay.map((item, index) => (
                        // @ts-ignore
                        <LessonItem item={item} index={index} key={item.id}/>
                    ))}
                </div>
            </section>
        </div>
    );
};

const fetchScheduleForDay = async (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    const response = await fetch('/api/schedule/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({date: dateString}),
    });
    const data = await response.json();
    return data;
};