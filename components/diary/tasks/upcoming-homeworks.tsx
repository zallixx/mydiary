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
import { getFromIndexedDB } from '@/utils/scheduleDB';
import { validateDate } from '@/utils/schedule';

export default function UpcomingHomeworks() {
    const [homeworks, setHomeworks] = React.useState<Array<any>>([]);

    React.useEffect(
        () => {
            const fetchHomeworks = async () => {
                const today = new Date();
                const homeworks = [];
                for (let i = 0; i < 8; i++) {
                    const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
                    const dateString = date.toISOString().slice(0, 10);
                    const homework = await getFromIndexedDB(dateString);
                    if (homework) {
                        homeworks.push({ date: new Date(dateString), items: homework.schedule.map((scheduleItem: { homework: any; }) => ({ ...scheduleItem, homework: scheduleItem.homework })) });
                    }
                }
                setHomeworks(homeworks);
            };
            fetchHomeworks();
        },
        []
    );

    return (
        <ScrollArea className="2xl:h-[calc(100vh-8rem)] max-2xl:h-[calc(100vh-12rem)]">
            {homeworks.map((day, dayIndex) => {
                if (!day.items || day.items.length === 0) return null;
                return (
                    <Card key={dayIndex} className="mb-4">
                        <CardHeader>
                            <CardTitle>{validateDate(day.date)}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {day.items[0].homework.map((homework: any, index: number) => (
                                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-muted">
                                    <Checkbox
                                        className={`h-6 w-6 mr-3 ${homework.completions[0]?.isCompleted ? 'bg-green-600 border-0 text-white' : 'text-[#ededf2]'}`}
                                        checked={homework.completions[0]?.isCompleted}/>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <label
                                                className="font-medium">{day.items[0].baseSchedule.subject.name}</label>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{homework.description}</p>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <ChevronRight className="h-4 w-4"/>
                                    </Button>
                                </div>
                            ))}
                            {day.items[0].specificAssignment.map((specificAssignment: any) => (
                                <div key={specificAssignment.id} className="flex items-start space-x-4 p-4 rounded-lg bg-muted">
                                    <Checkbox
                                        className={`h-6 w-6 mr-3 ${specificAssignment.completions[0]?.isCompleted ? 'bg-green-600 border-0 text-white' : 'text-[#ededf2]'}`}
                                        checked={specificAssignment.completions[0]?.isCompleted}/>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <label
                                                className="font-medium">{day.items[0].baseSchedule.subject.name}</label>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{specificAssignment.description}</p>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <ChevronRight className="h-4 w-4"/>
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                );
            })}
            {(homeworks.length === 0) || homeworks.every((day) => !day.items || day.items.length === 0) && (
                <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Домашние задания не найдены</p>
                </div>
            )}
        </ScrollArea>
    );
}