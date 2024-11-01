'use client';

import { currentTimeInItemRange } from '@/components/diary/schedule/functions';
import { absenceType } from '@prisma/client';
import LessonMarks from "@/components/diary/schedule/lesson-marks";
import LessonHomework from "@/components/diary/schedule/lesson-homework";
import LessonMaterials from "@/components/diary/schedule/lesson-materials";

export interface itemProps {
    id: string;
    baseSchedule: {
        date: Date;
        duration: number;
        teacher: {};
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
    return (
        <div className="flex flex-col border-b rounded-2xl h-auto bg-white py-2" key={item.id}>
            <div className="flex flex-row">
                <div className={`h-11 w-1.5 rounded-r-full mt-1 mr-2 ${currentTimeInItemRange(item.baseSchedule.date) ? 'bg-[#16a3f5]' : 'bg-[#e8e8ef]'}`}></div>
                <div className="flex flex-col">
                    <div className="flex flex-row items-center">
                        <span className="text-base font-medium">{item.baseSchedule.subject.name}</span>
                        <span className="text-sm ml-1">{index + 1 + ' урок'}</span>
                    </div>
                    <div>
                        <span className="text-sm">
                            {item.baseSchedule.date.getUTCHours().toString().padStart(2, '0') + ':' + item.baseSchedule.date.getUTCMinutes().toString().padStart(2, '0') + ' - ' + new Date(item.baseSchedule.date.getTime() + item.baseSchedule.duration * 60000).getUTCHours().toString().padStart(2, '0') + ':' + new Date(item.baseSchedule.date.getTime() + item.baseSchedule.duration * 60000).getUTCMinutes().toString().padStart(2, '0')}
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
    );
};