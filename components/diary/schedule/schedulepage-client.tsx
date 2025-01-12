'use client';

import React, { useEffect, useState } from 'react';
import ScheduleDayPicker from '@/components/diary/schedule/day-picker/schedule-day-picker';
import LessonItem from '@/components/diary/schedule/lesson-item';
import { fetchSchedule } from '@/lib/fetchSchedule';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { validateDate } from '@/utils/schedule';

export default function SchedulePageClient() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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
        <div className="min-h-screen flex items-start max-2xm:pt-16 2xm:pt-8 justify-center">
            <section className="static left-1/2 right-1/2 3xl:w-[1400px] 2xl:w-[1000px] flex flex-col transition-hwp duration-500 max-lg:w-[95%] ease-in-out">
                <span className="text-2xl font-bold mb-4 max-sm:hidden">Расписание на {validateDate(selectedDate)}</span>
                <ScheduleDayPicker onDateChange={handleDateChange} />
                <div className="min-h-96 h-auto pt-2 space-y-2">
                    {loading && (
                        <div>
                            {[...Array(3)].map((_, index) => ( /* TODO: Refactor */
                                <div className="flex flex-col border-b rounded-2xl h-[98px] bg-white py-2 px-4 mb-2" key={index}>
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Skeleton className="h-6 w-24 bg-gray-200"/> {/* Название предмета */}
                                                <Skeleton className="h-6 w-8 bg-gray-200"/> {/* Номер урока */}
                                            </div>
                                            <Skeleton className="h-4 w-24 bg-gray-200"/> {/* Время */}
                                            <div className="flex items-center gap-2">
                                                <Skeleton className="h-5 w-48 bg-gray-200"/> {/* Домашка */}
                                            </div>
                                        </div>
                                        <Skeleton className="h-8 w-8 rounded-lg bg-gray-200"/> {/* Оценка */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {!loading && scheduleForDay.map((item, index) => (
                        // @ts-ignore
                        <LessonItem item={item} index={index} key={item.id} date={selectedDate} />
                    ))}
                    {!loading && scheduleForDay.length === 0 && (
                        <span className="text-center items-center justify-center flex">
                            Уроков и мероприятий нет
                            <Image
                                src={'/party-popper.webp'}
                                alt={'Уроков и мероприятий нет'}
                                className="pointer-events-none"
                                width={30}
                                height={30}
                            />
                        </span>
                    )}
                </div>
            </section>
        </div>
    );
};