import { Checkbox } from '@/components/ui/checkbox';
import * as React from 'react';
import { lessonComponentsChild } from '@/components/diary/schedule/interfaces';

export default function LessonSheetHomework({child} : {child: lessonComponentsChild}) {
    return (
        <>
            {child.homeworkList && child.homeworkList.map((homework, homeworkIndex) => (
                <span key={homeworkIndex} className="flex flex-col items-start break-all break-words">
                    <span className="flex flex-row items-center text-black text-start">
                        {homework.description}
                    </span>
                    <span className={`w-full mt-[16px] mb-2 h-[48px] text-black p-[16px] rounded-[16px] flex items-center cursor-pointer ${homework.completions[0]?.isCompleted ? 'bg-[#e8f7ea]' : 'bg-[#f4f4f8]'}`}>
                        <Checkbox className={`h-6 w-6 mr-3 ${homework.completions[0]?.isCompleted ? 'bg-green-600 border-0 text-white' : 'text-[#ededf2]'}`}
                                  checked={homework.completions[0]?.isCompleted}/>{homework.completions[0]?.isCompleted ? 'Задания выполнены' : 'Задания не выполнены'}
                    </span>
                </span>
            ))
            }
        </>
    );
}