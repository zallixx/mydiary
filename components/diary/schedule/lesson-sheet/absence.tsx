import { defineAbsenceType, setPropForItem } from '@/utils/schedule';
import * as React from 'react';
import { lessonComponentsChild } from '@/types/schedule';

export default function LessonSheetAbsence({child} : {child: lessonComponentsChild}) {
    return (
        <>
            {child.absence && child.absence.map((absence, absenceIndex) => (
                <div className="flex flex-row items-center justify-start text-black" key={absenceIndex}>
                    <div className={`flex items-center justify-center bg-[#f4f4f8] mr-2 rounded-md w-[43px] h-[43px] font-semibold ${setPropForItem(absence.type)}`}>
                        <span>
                            Н
                        </span>
                    </div>
                    <span>
                        { defineAbsenceType(absence.type) }
                    </span>
                </div>
            ))}
        </>
    );
}