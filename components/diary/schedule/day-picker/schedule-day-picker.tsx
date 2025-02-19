"use client";

import { useEffect, useState, useCallback } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi,
    CarouselPrevious,
    CarouselNext
} from '@/components/ui/carousel';
import { generateWeekOptions, generateWeeks, getTodayString } from '@/utils/schedule';
import TodayButton from '@/components/diary/schedule/day-picker/today-button';
import ActionButtons from '@/components/diary/schedule/day-picker/action-buttons';
import { Separator } from '@/components/ui/separator';
import DayButton from '@/components/diary/schedule/day-picker/day-button';
import ActionButtonsMb from '@/components/diary/schedule/day-picker/action-buttons-mb';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ru } from 'date-fns/locale';

interface ScheduleDayPickerProps {
    onDateChange?: (date: Date) => void;
}

export default function ScheduleDayPicker({onDateChange}: ScheduleDayPickerProps) {
    const [currentWeek, setCurrentWeek] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const [api, setApi] = useState<CarouselApi>();

    const weeks = generateWeeks();
    const weekOptions = generateWeekOptions(weeks);

    useEffect(() => {
        if (weekOptions.length > 0) {
            const today = getTodayString();
            const currentWeekIndex = weeks.findIndex(week =>
                week.some(day => day.full === today)
            );
            setCurrentWeek(currentWeekIndex.toString());
            setSelectedDay(today);
            onDateChange && onDateChange(new Date(today));
            api?.scrollTo(currentWeekIndex);
        }
    }, [api]);

    const logEvent = useCallback((api: CarouselApi) => {
        if (api) {
            const newIndex = api.selectedScrollSnap();
            setCurrentWeek(newIndex.toString());
        }
    }, []);

    useEffect(() => {
        if (api) {
            api.on('pointerDown', logEvent);
            api.on('pointerUp', logEvent);
        }
        return () => {
            if (api) {
                api.off('pointerDown', logEvent);
                api.off('pointerUp', logEvent);
            }
        };
    }, [api, logEvent]);

    const scrollToWeek = (weekIndex: number) => {
        api?.scrollTo(weekIndex);
        setCurrentWeek(weekIndex.toString());
    };

    const handleTodayClick = () => {
        const todayString = getTodayString();
        const currentWeekIndex = weeks.findIndex(week =>
            week.some(day => day.full === todayString)
        );
        if (currentWeekIndex !== -1) {
            scrollToWeek(currentWeekIndex);
            setSelectedDay(todayString);
            onDateChange && onDateChange(new Date(todayString));
        }
    };

    const handleDayClick = (day: string) => {
        setSelectedDay(day);
        onDateChange && onDateChange(new Date(day));
    };

    const handleCalendarClick = (date: Date) => {
        const dateString = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
        setSelectedDay(dateString);

        onDateChange && onDateChange(new Date(dateString));
        api?.scrollTo(weeks.findIndex(week => week.some(day => day.full === dateString)));
    }

    return (
        <div className="lg:flex lg:justify-center">
            <div className="3xl:w-full max-3xl:w-[900px] 2xl:w-[1000px] bg-white rounded-lg shadow-sm lg:px-12 max-lg:px-4 border-[1.5px] max-lg:w-full">
                <div className="lg:py-4 lg:space-y-4 max-lg:py-2">
                    <div className="flex items-center justify-between max-lg:hidden">
                        <div className="flex items-center gap-2">
                            <Select value={currentWeek} onValueChange={(value) => scrollToWeek(parseInt(value))}>
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
                            <TodayButton handleTodayClick={handleTodayClick} />
                        </div>
                        <ActionButtons dateString={selectedDay} />
                    </div>

                    <Separator className="max-lg:hidden" />

                    <div className="relative">
                        <Carousel className="w-full" setApi={setApi}>
                            <CarouselContent>
                                {weeks.map((week, weekIndex) => (
                                    <CarouselItem key={weekIndex}>
                                        <div className="flex items-center lg:justify-between max-lg:justify-evenly lg:px-4">
                                            {week.map((day) => (
                                                <DayButton day={day} handleDayClick={handleDayClick} selectedDay={selectedDay} key={day.full} />
                                            ))}
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-0 bg-white border-0 max-lg:hidden"/>
                            <CarouselNext className="right-0 bg-white border-0 max-lg:hidden"/>
                        </Carousel>
                    </div>
                </div>
            </div>
            <div className="flex mt-2 justify-between lg:hidden">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm" className="bg-white">
                            {selectedDay ? new Date(selectedDay).toLocaleString('ru', { month: 'long' }).charAt(0).toUpperCase() + new Date(selectedDay).toLocaleString('ru', { month: 'long' }).slice(1) : ''}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto">
                        <Calendar
                            mode="single"
                            selected={new Date(selectedDay)}
                            onSelect={(date) => date && handleCalendarClick(date)}
                            initialFocus
                            locale={ru}
                            weekStartsOn={1}
                            fixedWeeks
                        />
                    </PopoverContent>
                </Popover>
                <ActionButtonsMb dateString={selectedDay}/>
            </div>
        </div>
    );
};