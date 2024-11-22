'use client';

import { currentTimeInItemRange, getLessonTime } from '@/components/diary/schedule/functions';
import { absenceType } from '@prisma/client';
import LessonMarks from '@/components/diary/schedule/lesson-marks';
import LessonHomework from '@/components/diary/schedule/lesson-homework';
import LessonMaterials from '@/components/diary/schedule/lesson-materials';
import LessonSheet from '@/components/diary/schedule/lesson-sheet';
import { useState } from 'react';
import { useParams } from 'next/navigation';


export interface itemProps {
    id: string;
    place: string;
    event_type: string;
    baseSchedule: {
        date: Date;
        duration: number;
        teacher: {
            name: string;
        };
        subject: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    };
    specificAssignment: {
        description: string;
        homeworkCompletion: {
            isCompleted: boolean;
        }[];
    }[];
    homework: {
        id: string;
        date: Date;
        groupId: string;
        scheduleItemId: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        completions: {
            isCompleted: boolean;
        }[];
    }[];
    absence: {
        type: absenceType;
    }[];
    assessment: {
        id: string;
        grade: string;
        gradeType: string;
    }[];
}


export default function LessonItem({ item, index }: { item: itemProps, index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const params = useParams<{ diaryDay: string; }>();

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="flex flex-col border-b rounded-2xl h-auto bg-white py-2" key={item.id} onClick={handleClick}>
                <div className="flex flex-row">
                    <div className={`h-11 w-1.5 rounded-r-full mt-1 mr-2 ${currentTimeInItemRange(item.baseSchedule.date, item.baseSchedule.duration) ? 'bg-[#16a3f5]' : 'bg-[#e8e8ef]'}`}></div>
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                            <span className="text-base font-medium">{item.baseSchedule.subject.name}</span>
                            <span className="text-sm ml-1">{index + 1 + ' урок'}</span>
                        </div>
                        <div>
                            <span className="text-sm">
                                { getLessonTime(item.baseSchedule.date, item.baseSchedule.duration) }
                            </span>
                        </div>
                    </div>
                    <div className="ml-auto max-h-12">
                        <LessonMarks item={item} key={item.id} />
                    </div>
                </div>
                <div className="flex flex-row mt-2 mr-2">
                    <LessonHomework item={item} key={item.id} />
                </div>
                <LessonMaterials item={item} key={item.id} />
            </div>
            {isOpen && <LessonSheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)} item={item} params={params}/>}
        </>
    );
};