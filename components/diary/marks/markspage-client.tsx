// @ts-nocheck
'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { getFromIndexedDB } from '@/utils/scheduleDB';
import LessonSheet from '@/components/diary/schedule/lesson-sheet/lesson-sheet';
import LessonDrawer from '@/components/diary/schedule/lesson-drawer/lesson-drawer';
import TitleForDay from '@/components/diary/marks/title-for-day';
import MarksForDay from '@/components/diary/marks/marks-for-day';

export default function MarksPageClient() {
    const [assessments, setAssessments] = React.useState<Array<any>>([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [item, setItem] = React.useState({});

    React.useEffect(() => {
        const fetchAssessments = async () => {
            const today = new Date();
            const yesterday = new Date(today.getTime() + 24 * 60 * 60 * 1000);
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
                                <TitleForDay date={day.date} />
                                <MarksForDay day={day} prepareOpen={prepareOpen} />
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