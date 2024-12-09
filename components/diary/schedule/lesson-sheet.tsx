import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { itemProps } from '@/components/diary/schedule/lesson-item';
import { validateDate, getLessonTime } from '@/components/diary/schedule/functions';
import { ReactElement } from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from '@/components/ui/scroll-area';

interface homeworkProps {
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
}

interface specificAssignmentsProps {
    description: string;
    homeworkCompletion: {
        isCompleted: boolean;
    }[];
}

export default function LessonSheet({ open, onOpenChange, item, date }: { open: boolean; onOpenChange: () => void; item: itemProps; date: Date }) {
    const lessonComponents: { title: string; children: { sub_title?: string; svg?: ReactElement; description?: string; homeworkList?: homeworkProps[]; specificAssignments?: specificAssignmentsProps[]; }[] }[] = [
        {
            title: item.event_type === 'LESSON' ? "Об уроке:" : "О мероприятии:",
            children: [
                {
                    sub_title: "Тип мероприятия",
                    svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info mr-1"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
                    description: item.event_type,
                },
                {
                    sub_title: "Дата и время проведения",
                    svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock mr-1"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                    description: date.toISOString().split('T')[0] + ' ' + new Date(item.baseSchedule.date).getUTCHours().toString().padStart(2, '0') + ':' + new Date(item.baseSchedule.date).getUTCMinutes().toString().padStart(2, '0') + ' - ' + new Date(new Date(item.baseSchedule.date).getTime() + item.baseSchedule.duration * 60000).getUTCHours().toString().padStart(2, '0') + ':' + new Date(new Date(item.baseSchedule.date).getTime() + item.baseSchedule.duration * 60000).getUTCMinutes().toString().padStart(2, '0'),
                },
                {
                    sub_title: "Место проведения",
                    svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin mr-1"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>,
                    description: item.place,
                },
            ],
        },
        {
            title: "Преподаватель:",
            children: [
                {
                    description: item.baseSchedule.teacher.name,
                },
            ],
        },
        {
            title: "Домашние задания:",
            children: [
                {
                    homeworkList: item.homework,
                },
            ]
        },
        {
            title: "Личные задания:",
            children: [
                {
                    specificAssignments: item.specificAssignment,
                },
            ]
        },
    ];

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="lg:w-[25%] bg-[#f4f4f8]">
                <SheetHeader>
                    <SheetTitle className="flex flex-col items-start justify-items-start content-start w-full bg-white pt-3 pl-2 h-[82px] shadow-lg">
                        <span className="font-semibold text-lg">
                            {item.baseSchedule.subject.name}
                        </span>
                        <span className="flex text-gray-600">
                            {validateDate(date) + ' · ' + getLessonTime(item.baseSchedule.date, item.baseSchedule.duration)}
                        </span>
                    </SheetTitle>
                    <ScrollArea className="h-[calc(100vh-82px)] overflow-y-auto">
                        <SheetDescription className="space-y-3.5 m-[16px]">
                            {lessonComponents.map((component, index) => {
                                if (component.title === "Домашние задания:" && (!component.children[0].homeworkList || component.children[0].homeworkList.length === 0)) {
                                    return null;
                                }
                                if (component.title === "Личные задания:" && (!component.children[0].specificAssignments || component.children[0].specificAssignments.length === 0)) {
                                    return null;
                                }
                                return (
                                    <span className="p-[24px] rounded-[16px] bg-white items-start justify-items-start content-start flex flex-col text-[#87879b]" key={index}>
                                        <span className="font-semibold text-lg text-black">{component.title}</span>
                                        {component.children.map((child, childIndex) => (
                                            <span key={childIndex} className={`text-base w-full ${component.title === 'Преподаватель:' || component.title === 'Домашние задания:' || component.title === 'Личные задания:' ? '' : 'pl-1'} flex flex-col`}>
                                                <span className="flex flex-row items-center">
                                                    {child.svg}
                                                    {child.sub_title}
                                                </span>
                                                <span className={`flex flex-row items-center text-black ${component.title === 'Преподаватель:' ? '' : 'pl-6'}`}>
                                                    {child.description}
                                                </span>
                                                {child.homeworkList && child.homeworkList.map((homework, homeworkIndex) => (
                                                    <span key={homeworkIndex} className="flex flex-col items-start">
                                                        <span className="flex flex-row items-center text-black">
                                                            {homework.description}
                                                        </span>
                                                        <span className={`w-full mt-[16px] mb-2 h-[48px] text-black p-[16px] rounded-[16px] flex items-center cursor-pointer ${homework.completions[0]?.isCompleted ? 'bg-[#e8f7ea]' : 'bg-[#f4f4f8]'}`}>
                                                            <Checkbox className={`h-6 w-6 mr-3 ${homework.completions[0]?.isCompleted ? 'bg-green-600 border-0 text-white' : 'text-[#ededf2]'}`} checked={homework.completions[0]?.isCompleted}/>{homework.completions[0]?.isCompleted ? 'Задания выполнены' : 'Задания не выполнены'}
                                                        </span>
                                                    </span>
                                                ))}
                                                {child.specificAssignments && child.specificAssignments.map((assignment, assignmentIndex) => (
                                                    <span key={assignmentIndex} className="flex flex-col items-start">
                                                        <span className="flex flex-row items-center text-black">
                                                            {assignment.description}
                                                        </span>
                                                        <span className={`w-full mt-[16px] h-[48px] p-[16px] rounded-[16px] flex items-center text-black cursor-pointer ${assignment.homeworkCompletion[0]?.isCompleted ? 'bg-[#e8f7ea]' : 'bg-[#f4f4f8]'}`}>
                                                            <Checkbox className={`h-6 w-6 mr-3 ${assignment.homeworkCompletion[0]?.isCompleted ? 'bg-green-600 border-0 text-white' : 'text-[#ededf2]'}`} checked={assignment.homeworkCompletion[0]?.isCompleted}/>{assignment.homeworkCompletion[0]?.isCompleted ? 'Задания выполнены' : 'Задания не выполнены'}
                                                        </span>
                                                    </span>
                                                ))}
                                            </span>
                                        ))}
                                    </span>
                                );
                            })}
                        </SheetDescription>
                    </ScrollArea>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}