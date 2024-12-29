import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
} from '@/components/ui/sheet';
import { createLessonComponents } from '@/utils/schedule';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as React from 'react';
import { itemProps } from '@/types/schedule';
import LessonSheetTitle from '@/components/diary/schedule/lesson-sheet/title';
import LessonSheetHomework from '@/components/diary/schedule/lesson-sheet/homework';
import LessonSheetAssignment from '@/components/diary/schedule/lesson-sheet/assignment';
import LessonSheetAssessment from '@/components/diary/schedule/lesson-sheet/assessment';
import LessonSheetAbsence from '@/components/diary/schedule/lesson-sheet/absence';
import LessonSheetAttributes from "@/components/diary/schedule/lesson-sheet/attributes";

export default function LessonSheet({ open, onOpenChange, item, date }: { open: boolean; onOpenChange: () => void; item: itemProps; date: Date }) {
    const lessonComponents = createLessonComponents(item);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="lg:w-[25%] bg-[#f4f4f8]">
                <SheetHeader>
                    <LessonSheetTitle item={item} date={date} />
                    <ScrollArea className="h-[calc(100vh-82px)] overflow-y-auto">
                        <SheetDescription className="space-y-3.5 m-[16px]">
                            {lessonComponents.map((component, index) => {
                                if ((component.title === "Домашние задания" && (!component.children[0].homeworkList || component.children[0].homeworkList.length === 0)) ||
                                    (component.title === "Личные задания" && (!component.children[0].specificAssignments || component.children[0].specificAssignments.length === 0)) ||
                                    (component.title === "Результаты урока" && (!component.children[0].assessment || component.children[0].assessment.length === 0)) ||
                                    (component.title === "Результаты урока" && (!component.children[0].assessment || component.children[0].assessment.length === 0)) ||
                                    (component.title === "Пропуск" && (!component.children[0].absence || component.children[0].absence.length === 0))
                                )  {
                                    return null;
                                }
                                return (
                                    <span className="p-[24px] rounded-[16px] bg-white items-start justify-items-start content-start flex flex-col text-[#87879b]" key={index}>
                                        <span className="font-semibold text-lg text-black">{component.title}</span>
                                        {component.children.map((child, childIndex) => (
                                            <span key={childIndex} className="text-base w-full flex flex-col">
                                                <LessonSheetAttributes child={child} isTeacher={component.title === 'Преподаватель'} />
                                                <LessonSheetHomework child={child} />
                                                <LessonSheetAssignment child={child} />
                                                <LessonSheetAssessment child={child} />
                                                <LessonSheetAbsence child={child} />
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