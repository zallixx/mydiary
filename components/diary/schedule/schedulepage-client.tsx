'use client';

import React, { useEffect, useState } from 'react';
import ScheduleDayPicker from '@/components/diary/schedule/day-picker/schedule-day-picker';
import LessonItem from '@/components/diary/schedule/lesson-item';
import { fetchSchedule } from '@/lib/fetchSchedule';
import Image from 'next/image';

export default function SchedulePageClient() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [scheduleForDay, setScheduleForDay] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        let isMounted = true;

        const fetchAndSetSchedule = async () => {
            if (!selectedDate) return;
            setLoading(true);

            const dateString = selectedDate.toISOString().split('T')[0];
            const fetchedSchedule = await fetchSchedule(dateString);

            if (isMounted) {
                setScheduleForDay(fetchedSchedule || []);
                setLoading(false);
            }
        };

        fetchAndSetSchedule();

        const interval = setInterval(fetchAndSetSchedule, 5 * 60 * 1000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [selectedDate]);

    return (
        <div className="min-h-screen flex items-start lg:pt-32 max-lg:pt-16 justify-center">
            <section className="static left-1/2 right-1/2 lg:w-[1400px] max-lg:w-[90%] max-[520px]:w-[95%] flex flex-col transition-hwp duration-500 ease-in-out">
                <ScheduleDayPicker onDateChange={handleDateChange}/>
                <div className="min-h-96 h-auto pt-2 space-y-2">
                    {loading && <p className="text-center">Загружаем...</p>}
                    {!loading && scheduleForDay.map((item, index) => (
                        // @ts-ignore
                        <LessonItem item={item} index={index} key={item.id} date={selectedDate} />
                    ))}
                    {!loading && scheduleForDay.length === 0 && (
                        <div>
                            <Image
                                src={'/no-schedule.png'}
                                alt={'Расписание отсутствует'}
                                className="pointer-events-none flex mx-auto"
                                width={250}
                                height={250}
                            />
                            <span className="text-center items-center justify-center flex">
                                Уроков и мероприятий нет
                                <Image
                                    src={'/party-popper.webp'}
                                    alt={'Ура'}
                                    className="pointer-events-none"
                                    width={30}
                                    height={30}
                                />
                            </span>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};