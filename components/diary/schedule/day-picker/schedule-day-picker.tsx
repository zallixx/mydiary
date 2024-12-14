"use client";
import * as React from 'react';
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
import { generateWeekOptions, generateWeeks, getTodayString } from '@/components/diary/schedule/functions';
import TodayButton from '@/components/diary/schedule/day-picker/today-button';
import ActionButtons from '@/components/diary/schedule/day-picker/action-buttons';
import { Separator } from '@/components/ui/separator';
import DayButton from '@/components/diary/schedule/day-picker/day-button';

interface ScheduleDayPickerProps {
    onDateChange?: (date: Date) => void;
}

export default function ScheduleDayPicker({onDateChange}: ScheduleDayPickerProps) {
    const [currentWeek, setCurrentWeek] = React.useState("");
    const [selectedDay, setSelectedDay] = React.useState("");
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        })
    }, [api]);

    const weeks = generateWeeks();
    const weekOptions = generateWeekOptions(weeks);

    React.useEffect(() => {
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

    return (
        <div>
            <div className="w-full bg-white rounded-lg shadow-sm lg:px-12 max-lg:px-4">
                <div className="lg:py-4 lg:space-y-4 max-lg:py-2">
                    <div className="flex items-center justify-between max-lg:hidden">
                        <div className="flex items-center gap-2">
                            <Select value={currentWeek} onValueChange={(value) => scrollToWeek(parseInt(value))}>
                                <SelectTrigger className="w-[200px] bg-white">
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
                        <ActionButtons />
                    </div>

                    <Separator className="max-lg:hidden" />

                    <div className="relative">
                        <Carousel className="w-full" setApi={setApi}>
                            <CarouselContent>
                                {weeks.map((week, weekIndex) => (
                                    <CarouselItem key={weekIndex}>
                                        <div className="flex items-center lg:justify-between max-lg:justify-evenly lg:px-4">
                                            {week.map((day) => (
                                                <DayButton day={day} handleDayClick={handleDayClick} selectedDay={selectedDay} />
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
        </div>
    );
};