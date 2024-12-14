import { lessonComponentsChild } from '@/components/diary/schedule/interfaces';
import * as React from 'react';

export default function LessonSheetAttributes({ child, isTeacher }: { child: lessonComponentsChild; isTeacher: boolean }) {
    return (
        <>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                {child.svg}
                {child.sub_title}
            </div>
            <div className="flex flex-row items-center text-black" style={!isTeacher ? {paddingLeft: 'calc(24px + 0.25rem)'} : {}}>
                {child.description}
            </div>
        </>
    );
}