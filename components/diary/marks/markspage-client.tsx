'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { Button } from '@/components/ui/button';
import { getFromIndexedDB } from '@/utils/scheduleDB';
import { setIndexForGrade, setPropForItem, validateDate } from '@/utils/schedule';
import LessonSheet from '@/components/diary/schedule/lesson-sheet/lesson-sheet';
import LessonDrawer from '@/components/diary/schedule/lesson-drawer/lesson-drawer';

export default function MarksPageClient() {
    const [assessments, setAssessments] = React.useState<Array<any>>([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [item, setItem] = React.useState({});

    React.useEffect(() => {
        const fetchAssessments = async () => {
            const today = new Date();
            const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
            const assessments = [];
            const endDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            for (let date = yesterday; date > endDate; date.setDate(date.getDate() - 1)) {
                const dateString = date.toISOString().split('T')[0];
                const assessment = await getFromIndexedDB(dateString);
                if (assessment) {
                    assessments.push({ date: new Date(dateString), items: assessment.schedule.map((scheduleItem: { assessments: any; }) => ({ ...scheduleItem, assessments: scheduleItem.assessments })).filter((item) => item.assessments.length > 0) });
                }
            }
            setAssessments(assessments);
        };
        fetchAssessments();
    }, []);

    function prepareOpen(itemDate: Date, secondItem: any) {
        setDate(itemDate);
        setItem(secondItem);
        setIsOpen(true);
    }

    return (
        <>
            <ScrollArea className="2xl:h-[calc(100vh-8rem)] max-2xl:h-[calc(100vh-8.5rem)]">
                <div className="space-y-3">
                    {assessments.map((day, dayIndex) => {
                        if (!day.items || day.items.length === 0) return null;
                        return (
                            <div key={dayIndex}>
                                <div className="mb-2">
                                    <div className="text-lg font-medium text-gray-500">{validateDate(day.date)}</div>
                                </div>
                                <div className="space-y-3">
                                    {day.items.flatMap((item) => item.assessments.map((assessment: any, subindex: number) => (
                                        <Card key={subindex} className="hover:shadow-md transition-shadow" onClick={() => prepareOpen(day.date, item)}>
                                            <CardContent className="p-4 flex items-center">
                                                <div className={`flex items-center justify-center bg-[#f4f4f8] mr-2 rounded-md w-[43px] h-[43px] font-semibold ${setPropForItem(assessment.gradeType)}`}>
                                                <span>
                                                    {assessment.grade}
                                                    <sub className="text-[10px] align-baseline">{setIndexForGrade(assessment.gradeType)}</sub>
                                                </span>
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <label className="font-medium">{item.subject.name}</label>
                                                    <div className="text-sm text-gray-500">{assessment.gradeType}</div>
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
                </div>
            </ScrollArea>
            {isOpen && window.innerWidth > 1400 && <LessonSheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)} item={item} date={date} />}
            {isOpen && window.innerWidth < 1400 && <LessonDrawer open={isOpen} onOpenChange={() => setIsOpen(!isOpen)} item={item} date={date} />}
        </>
    );
}