// @ts-nocheck
'use client';

import { currentTimeInItemRange, getLessonTime } from '@/utils/schedule';
import LessonMarks from '@/components/diary/schedule/lesson-marks';
import LessonHomework from '@/components/diary/schedule/lesson-homework';
import LessonMaterials from '@/components/diary/schedule/lesson-materials';
import LessonSheet from '@/components/diary/schedule/lesson-sheet/lesson-sheet';
import { useState } from 'react';
import LessonDrawer from '@/components/diary/schedule/lesson-drawer/lesson-drawer';
import { itemProps } from '@/types/schedule';

export default function LessonItem({ item, index, date }: { item: itemProps, index: number, date: Date }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="flex flex-col border-b rounded-2xl h-auto bg-white py-2 cursor-pointer" key={item.id} onClick={handleClick}>
                <div className="flex flex-row">
                    <div className={`h-11 w-1.5 rounded-r-full mt-1 mr-2 ${currentTimeInItemRange(item.startTime, item.endTime, date) ? 'bg-[#0a3af5]' : 'bg-[#e8e8ef]'}`}></div>
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                            <span className="text-base font-medium">{item.subject?.name || item.name}</span>
                            <span className="text-sm ml-1">{index + 1 + ' урок'}</span>
                        </div>
                        <div>
                            <span className="text-sm">
                                {getLessonTime(item.startTime, item.endTime)}
                            </span>
                        </div>
                    </div>
                    <div className="ml-auto max-h-12">
                        <LessonMarks item={item} key={item.id} />
                    </div>
                </div>
                <div className="flex flex-col mt-2 mr-2">
                    <LessonHomework item={item} key={item.id} />
                </div>
                <LessonMaterials item={item} key={item.id} />
            </div>
            {isOpen && window.innerWidth > 1400 && <LessonSheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)} item={item} date={date} />}
            {isOpen && window.innerWidth < 1400 && <LessonDrawer open={isOpen} onOpenChange={() => setIsOpen(!isOpen)} item={item} date={date} />}
        </>
    );
};