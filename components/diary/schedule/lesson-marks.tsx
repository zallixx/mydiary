// @ts-nocheck
'use client';

import { itemProps } from '@/types/schedule';
import { setIndexForGrade } from '@/utils/schedule';

const setPropForItem = (item: string): string => {
    switch (item) {
        case 'UNAUTHORIZED':
            return 'text-[#dc143c]';
        case 'SICK':
            return 'text-[#15b1d4]';
        case 'Контрольная работа':
            return 'border border-[#dc143c]';
        default:
            return '';
    }
};

export default function LessonMarks({item}: {item: itemProps}) {
    return (
        <>
            {item.assessments && (
                <div className="flex flex-row">
                    {item.absences[0]?.type !== "NONE" && item.absences[0] ? (
                        <>
                            <div className="flex flex-col">
                                {item.assessments.slice(0, 1).map((assessment, assessmentIndex) => (
                                    <div className={`flex items-center justify-center bg-[#f4f4f8] mr-2 rounded-md w-[43px] h-[43px] font-semibold ${setPropForItem(assessment.gradeType)}`} key={assessmentIndex}>
                                        <span>
                                            {assessment.grade}
                                            <sub className="text-[10px] align-baseline">{setIndexForGrade(assessment.gradeType)}</sub>
                                        </span>
                                    </div>
                                ))}
                                {item.assessments.length > 1 && (
                                    <span className="flex text-[12px] ml-1">
                                        еще {item.assessments.length - 1}
                                    </span>
                                )}
                            </div>
                            <div className={`flex items-center justify-center bg-[#f4f4f8] mr-2 rounded-md w-[43px] h-[43px] font-semibold ${setPropForItem(item.absences[0]?.type)}`}>
                                <span>
                                    Н
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                {item.assessments.slice(0, 2).map((assessment, assessmentIndex) => (
                                    <div className={`flex items-center justify-items-center justify-center bg-[#f4f4f8] mr-2 rounded-md w-[43px] h-[43px] font-semibold ${setPropForItem(assessment.gradeType)}`} key={assessmentIndex}>
                                        <span>
                                            {assessment.grade}
                                            <sub className="text-[10px] align-baseline">{setIndexForGrade(assessment.gradeType)}</sub>
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {item.assessments.length > 2 && (
                                <span className="flex text-[12px] ml-auto mr-3">
                                    еще {item.assessments.length - 2}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}