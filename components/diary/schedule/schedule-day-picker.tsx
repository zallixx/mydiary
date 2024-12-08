"use client";
import * as React from 'react';
import { Download, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

const getTodayString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

interface ScheduleDayPickerProps {
    onDateChange?: (date: Date) => void
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

    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const monthNames = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const generateWeeks = (startDate: Date, endDate: Date) => {
        const weeks = [];
        let currentDate = new Date(startDate);
        const day = currentDate.getDay();
        const diff = currentDate.getDate() - day + 1;
        currentDate = new Date(currentDate.setDate(diff));

        while (currentDate <= endDate) {
            const week = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date(currentDate);
                week.push({
                    short: dayNames[i],
                    num: date.getDate().toString().padStart(2, '0'),
                    full: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
                    month: date.getMonth(),
                    year: date.getFullYear()
                });
                currentDate.setDate(currentDate.getDate() + 1);
            }
            weeks.push(week);
        }
        return weeks;
    };

    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 8, 1); // 1 сентября
    const endDate = new Date(currentYear + 1, 4, 31); // 31 амя
    const weeks = generateWeeks(startDate, endDate);

    const weekOptions = weeks.map((week, index) => {
        const startDay = week[0];
        const endDay = week[6];
        const optionValue = index.toString();
        const optionLabel = startDay.month === endDay.month
            ? `${startDay.num}-${endDay.num} ${monthNames[startDay.month]}`
            : `${startDay.num} ${monthNames[startDay.month]} - ${endDay.num} ${monthNames[endDay.month]}`;
        return { value: optionValue, label: optionLabel };
    });

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
        }
    };

    const handleDayClick = (day: string) => {
        setSelectedDay(day);
        onDateChange && onDateChange(new Date(day));
    };

    return (
        <>
            {window.innerWidth > 1400 &&
                <div className="w-full bg-white rounded-lg shadow-sm px-12">
                    <div className="py-4 space-y-4">
                        <div className="flex items-center justify-between">
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
                                <Button variant="outline" size="sm" onClick={handleTodayClick} className="bg-white">
                                    Сегодня
                                </Button>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                    <Settings className="h-4 w-4"/>
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Download className="h-4 w-4"/>
                                </Button>
                                <Button className="bg-[#4c6ef5] hover:bg-[#4c6ef5]/90">
                                    <Plus className="h-4 w-4 mr-2 text -white"/>
                                    Создать
                                </Button>
                            </div>
                        </div>

                        <div className="h-px bg-border w-full"/>

                        <div className="relative">
                            <Carousel className="w-full" setApi={setApi}>
                                <CarouselContent>
                                    {weeks.map((week, weekIndex) => (
                                        <CarouselItem key={weekIndex}>
                                            <div className="flex items-center justify-between px-4">
                                                {week.map((day) => {
                                                    const isToday = day.full === getTodayString();
                                                    return (
                                                        <button
                                                            key={day.full}
                                                            className={`flex flex-col items-center justify-center w-20 h-14 rounded-lg transition-colors text-black ${
                                                                selectedDay === day.full
                                                                    ? "border-[0.4px]"
                                                                    : "hover:text-accent-foreground hover:bg-[#f1f4ff]"
                                                            }`}
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
                                                    )
                                                })}
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-0 bg-white border-0"/>
                                <CarouselNext className="right-0 bg-white border-0"/>
                            </Carousel>
                        </div>
                    </div>
                </div>
            }
            {window.innerWidth <= 1400 &&
                <div className="w-full bg-white shadow-sm px-4 lg:hidden rounded-2xl">
                    <div className="py-2">
                        <Carousel className="w-full" setApi={setApi}>
                            <CarouselContent>
                                {weeks.map((week, weekIndex) => (
                                    <CarouselItem key={weekIndex}>
                                        <div className="flex items-center justify-evenly">
                                            {week.map((day) => {
                                                const isToday = day.full === new Date().toISOString().split('T')[0];
                                                return (
                                                    <button
                                                        key={day.full}
                                                        className={`flex flex-col items-center justify-center w-10 h-14 rounded-lg transition-colors text-black ${
                                                            selectedDay === day.full
                                                                ? "border-[0.4px]"
                                                                : "hover:text-accent-foreground hover:bg-[#f1f4ff]"
                                                        }`}
                                                        onClick={() => handleDayClick(day.full)}
                                                    >
                                                        <span className={`text-xs ${selectedDay === day.full ? '' : 'text-muted-foreground'}`}>
                                                            {day.short}
                                                        </span>
                                                        <span className={`text-sm font-medium ${selectedDay === day.full ? '' : 'text-foreground'}`}>
                                                            {day.num}
                                                        </span>
                                                        {isToday && (
                                                            <div className="w-4 h-0.5 bg-blue-500 mt-1"/>
                                                        )}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
            }
        </>
    );
};