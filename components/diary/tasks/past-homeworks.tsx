'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { getFromIndexedDB, updateScheduleInIndexedDB } from '@/utils/scheduleDB';
import { updateTaskStatus, validateDate } from '@/utils/schedule';
import { homeworkProps } from '@/types/schedule';
import LessonDrawer from '@/components/diary/schedule/lesson-drawer/lesson-drawer';
import LessonSheet from '@/components/diary/schedule/lesson-sheet/lesson-sheet';

export default function PastHomeworks() {
    const [pastHomeworks, setPastHomeworks] = React.useState<Array<any>>([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [item, setItem] = React.useState({});

    React.useEffect(() => {
        const fetchPastHomeworks = async () => {
            const today = new Date();
            const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
            const pastHomeworks = [];
            const endDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            for (let date = yesterday; date > endDate; date.setDate(date.getDate() - 1)) {
                const dateString = date.toISOString().slice(0, 10);
                const homework = await getFromIndexedDB(dateString);
                if (homework) {
                    pastHomeworks.push({ date: new Date(dateString), items: homework.schedule.map((scheduleItem: { homework: any; }) => ({ ...scheduleItem, homework: scheduleItem.homework })) });
                }
            }
            setPastHomeworks(pastHomeworks);
        };
        fetchPastHomeworks();
    }, []);

    const handleUpdateStatus = async (homework: homeworkProps, date: Date) => {
        const updatedHomework = await updateTaskStatus(homework);
        const dateString = date.toISOString().split('T')[0];
        if (updatedHomework) {
            // @ts-ignore
            setPastHomeworks(pastHomeworks.map((a) => a.id === updatedHomework.id ? updatedHomework : a));
            await updateScheduleInIndexedDB(dateString, updatedHomework);
        }
    };

    function prepareOpen(itemDate: Date, secondItem: any) {
        setDate(itemDate);
        setItem(secondItem);
        setIsOpen(true);
    }

    return (
        <>
            <ScrollArea className="2xl:h-[calc(100vh-8rem)] max-2xl:h-[calc(100vh-12rem)]">
                <div className="space-y-3">
                    {pastHomeworks.map((day, dayIndex) => {
                        if (!day.items || day.items.length === 0) return null;
                        return (
                            <div key={dayIndex}>
                                <div className="mb-2">
                                    <div className="text-lg font-medium text-gray-500">{validateDate(day.date)}</div>
                                </div>
                                <div className="space-y-3">
                                    {day.items.flatMap((item) => item.homework.map((homework: any, subindex: number) => (
                                        <Card key={subindex} className="hover:shadow-md transition-shadow">
                                            <CardContent className="p-4 flex items-center" onClick={() => prepareOpen(day.date, item)}>
                                                <div className="flex items-start rounded-lg flex-1">
                                                    <Checkbox
                                                        className={`h-6 w-6 mr-3 ${homework.completions[0]?.isCompleted ? 'bg-green-600 border-0 text-white' : 'text-[#ededf2]'}`}
                                                        checked={homework.completions[0]?.isCompleted}
                                                        onClick={(event) => (handleUpdateStatus(homework, day.date) && event.stopPropagation())}/>
                                                    <div className="flex-1 space-y-1">
                                                        <div className="flex items-center justify-between">
                                                            <label className="font-medium">{item.subject.name}</label>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{homework.description}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon">
                                                    <ChevronRight className="h-4 w-4"/>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    )))}
                                </div>
                            </div>
                        );
                    })}
                    {(pastHomeworks.length === 0) || pastHomeworks.every((day) => !day.items || day.items.length === 0) && (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-muted-foreground">Домашние задания не найдены</p>
                        </div>
                    )}
                </div>
            </ScrollArea>
            {isOpen && window.innerWidth > 1400 && <LessonSheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)} item={item} date={date} />}
            {isOpen && window.innerWidth < 1400 && <LessonDrawer open={isOpen} onOpenChange={() => setIsOpen(!isOpen)} item={item} date={date} />}
        </>
    );
}