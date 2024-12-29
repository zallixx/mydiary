'use client';

import { countHomeworkWithParam } from '@/utils/schedule';
import { itemProps } from '@/types/schedule';

export default function LessonMaterials({item}: {item: itemProps}) {
    return (
        <>
            <div className="flex flex-row text-sm ml-3.5 mt-0.5 break-all space-x-1">
                {countHomeworkWithParam(item.homework, 'Test') > 0 && (
                    <span className="text-[#fd7e14]">{countHomeworkWithParam(item.homework, 'Test')} выполнить</span>
                )}
                {countHomeworkWithParam(item.homework, 'Theory') > 0 && (
                    <span className="text-[#cc4bdb]">{countHomeworkWithParam(item.homework, 'Theory')} изучить</span>
                )}
            </div>
            <div className="text-sm ml-3.5 break-all">
                {countHomeworkWithParam(item.homework, 'File') > 0 && (
                    <span className="text-indigo-700">Учитель прикрепил файлы к заданию</span>
                )}
            </div>
        </>
    );
}