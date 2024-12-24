import { setIndexForGrade, setPropForItem } from '@/utils/schedule';
import * as React from 'react';
import { lessonComponentsChild } from '@/types/schedule';

export default function LessonSheetAssessment({child} : {child: lessonComponentsChild}) {
    return (
        <div className="space-y-2">
            {child.assessment && child.assessment.map((assessment, assessmentIndex) => (
                <div className="flex flex-row items-center justify-start text-black">
                    <div className={`flex items-center justify-center bg-[#f4f4f8] mr-2 rounded-md w-[43px] h-[43px] font-semibold ${setPropForItem(assessment.gradeType)}`} key={assessmentIndex}>
                        <span>
                            {assessment.grade}
                            <sub className="text-[10px] align-baseline">{setIndexForGrade(assessment.gradeType)}</sub>
                        </span>
                    </div>
                    <span>
                        {assessment.gradeType}
                    </span>
                </div>
            ))}
        </div>
    );
}