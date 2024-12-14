import { Checkbox } from '@/components/ui/checkbox';
import * as React from 'react';
import { lessonComponentsChild } from '@/components/diary/schedule/interfaces';

export default function LessonSheetAssignment({child} : {child: lessonComponentsChild}) {
    return (
        <>
            {child.specificAssignments && child.specificAssignments.map((assignment, assignmentIndex) => (
                <span key={assignmentIndex} className="flex flex-col items-start break-all break-words text-start">
                    <span className="flex flex-row items-center text-black">
                        {assignment.description}
                    </span>
                    <span className={`w-full mt-[16px] h-[48px] p-[16px] rounded-[16px] flex items-center text-black cursor-pointer ${assignment.homeworkCompletion[0]?.isCompleted ? 'bg-[#e8f7ea]' : 'bg-[#f4f4f8]'}`}>
                        <Checkbox
                            className={`h-6 w-6 mr-3 ${assignment.homeworkCompletion[0]?.isCompleted ? 'bg-green-600 border-0 text-white' : 'text-[#ededf2]'}`}
                            checked={assignment.homeworkCompletion[0]?.isCompleted}/>{assignment.homeworkCompletion[0]?.isCompleted ? 'Задания выполнены' : 'Задания не выполнены'}
                    </span>
                </span>
            ))}
        </>
    );
};