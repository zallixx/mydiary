// @ts-nocheck
import { Card, CardContent } from '@/components/ui/card';
import { setIndexForGrade, setPropForItem } from '@/utils/schedule';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function MarksForDay({ day, prepareOpen }: { day: any, prepareOpen: Function }) {
    return (
        <div className="space-y-3">
            {day.items.flatMap((item) => item.assessments.map((assessment: any, subindex: number) => (
                <Card key={subindex} className="hover:shadow-md transition-shadow" onClick={() => prepareOpen(day.date, item)}>
                    <CardContent className="p-4 flex items-center">
                        <div className={`flex items-center justify-center bg-[#f4f4f8] mr-2 rounded-md w-[43px] h-[43px] font-semibold ${setPropForItem(assessment.gradeType)}`}>
                            <span>
                                {assessment.grade}
                                <sub className="text-[10px] align-baseline">{setIndexForGrade(assessment.gradeType)}</sub>
                            </span>
                        </div>
                        <div className="ml-3 flex-1">
                            <label className="font-medium">{item.subject?.name || item.name}</label>
                            <div className="text-sm text-gray-500">{assessment.gradeType}</div>
                        </div>
                        <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4"/>
                        </Button>
                    </CardContent>
                </Card>
            )))}
        </div>
    );
}