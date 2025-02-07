// @ts-nocheck
import { Checkbox } from '@/components/ui/checkbox';
import * as React from 'react';
import { lessonComponentsChild, specificAssignmentsProps } from '@/types/schedule';
import { updateTaskStatus } from '@/utils/schedule';
import {updateScheduleInIndexedDB} from "@/utils/scheduleDB";

export default function LessonSheetAssignment({ child, date } : { child: lessonComponentsChild, date: Date }) {
    const [assignments, setAssignments] = React.useState(child.specificAssignments);
    const [loading, setLoading] = React.useState(false);
    const dateString = date.toISOString().split('T')[0];

    const handleUpdateStatus = async (assignment: specificAssignmentsProps) => {
        setLoading(true);
        const updatedAssignment = await updateTaskStatus(assignment);
        if (updatedAssignment) {
            setAssignments(assignments.map((a) => a.id === updatedAssignment.id ? updatedAssignment : a));
            await updateScheduleInIndexedDB(dateString, updatedAssignment);
            setLoading(false);
        }
    };

    return (
        <>
            {child.specificAssignments && child.specificAssignments.map((assignment, assignmentIndex) => (
                <span key={assignmentIndex} className="flex flex-col items-start break-all break-words text-start">
                    <span className="flex flex-row items-center text-black">
                        {assignment.description}
                    </span>
                    <span className={`w-full mb-2 h-[48px] p-[16px] rounded-[16px] flex items-center text-black cursor-pointer
                        ${assignment.completions[0]?.isCompleted ? 'bg-[#e8f7ea]' : 'bg-[#f4f4f8]'} ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
                        onClick={() => handleUpdateStatus(assignment)}
                    >
                        <Checkbox
                            className={`h-6 w-6 mr-3 ${assignment.completions[0]?.isCompleted ? 'bg-green-600 border-0 text-white' : 'text-[#ededf2]'}`}
                            checked={assignment.completions[0]?.isCompleted}
                        />
                        {assignment.completions[0]?.isCompleted ? 'Задания выполнены' : 'Задания не выполнены'}
                    </span>
                </span>
            ))}
        </>
    );
};