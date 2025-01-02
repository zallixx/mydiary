import { Checkbox } from '@/components/ui/checkbox';
import * as React from 'react';
import { homeworkProps, lessonComponentsChild } from '@/types/schedule';
import { updateTaskStatus } from '@/utils/schedule';
import {updateScheduleInIndexedDB} from "@/utils/scheduleDB";

export default function LessonSheetHomework({ child, date } : { child: lessonComponentsChild, date: Date }) {
    const [homeworks, setHomeworks] = React.useState(child.homeworkList);
    const [loading, setLoading] = React.useState(false);
    const dateString = date.toISOString().split('T')[0];

    const handleUpdateStatus = async (homework: homeworkProps) => {
        setLoading(true);
        const updatedHomework = await updateTaskStatus(null, homework);
        if (updatedHomework) {
            // @ts-ignore
            setHomeworks(homeworks.map((a) => a.id === updatedHomework.id ? updatedHomework : a));
            const homeworksToSend = homeworks?.map(homework => ({ id: homework.id, isCompleted: homework.completions[0]?.isCompleted }));
            updateScheduleInIndexedDB(dateString, { homework: homeworksToSend });
            setLoading(false);
        }
    };

    return (
        <>
            {child.homeworkList && child.homeworkList.map((homework, homeworkIndex) => (
                <span key={homeworkIndex} className="flex flex-col items-start break-all break-words">
                    <span className="flex flex-row items-center text-black text-start">
                        {homework.description}
                    </span>
                    <span className={`w-full mt-[16px] mb-2 h-[48px] text-black p-[16px] rounded-[16px] flex items-center cursor-pointer 
                          ${homework.completions[0]?.isCompleted ? 'bg-[#e8f7ea]' : 'bg-[#f4f4f8]'} ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
                          onClick={() => handleUpdateStatus(homework)}
                    >
                        <Checkbox className={`h-6 w-6 mr-3 ${homework.completions[0]?.isCompleted ? 'bg-green-600 border-0 text-white' : 'text-[#ededf2]'}`} checked={homework.completions[0]?.isCompleted}/>
                        {homework.completions[0]?.isCompleted ? 'Задания выполнены' : 'Задания не выполнены'}
                    </span>
                </span>
            ))
            }
        </>
    );
}