// @ts-nocheck
'use client';

import { itemProps } from '@/types/schedule';

export default function LessonHomework({item}: {item: itemProps}) {
    const specializedHomeworks = item.homework.filter(homework => homework.isSpecialized);
    const regularHomeworks = item.homework.filter(homework => !homework.isSpecialized);

    return (
        <>
            {regularHomeworks.length > 0 && (
                <div className="flex flex-row items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className={`flex-none ml-2.5 mr-1 relative ${regularHomeworks[0].completions[0]?.isCompleted ? 'text-green-600' : 'text-gray-700'}`}><path fill="currentColor" d="M13.167 14.333h-3a.833.833 0 0 1-.834-.833v-3a.666.666 0 0 0-.666-.667H7.333a.666.666 0 0 0-.666.667v3c0 .46-.373.833-.834.833h-3A.833.833 0 0 1 2 13.5V7.138a2.5 2.5 0 0 1 .953-1.965L7.69 1.44a.5.5 0 0 1 .62 0l4.737 3.733A2.5 2.5 0 0 1 14 7.137V13.5c0 .46-.373.833-.833.833"></path></svg>
                    <span className="max-[520px]:hidden">{regularHomeworks.length === 1 ? `Домашнее задание: ${regularHomeworks[0].description}` : `${regularHomeworks.length} задания`}</span>
                    <span className="flex min-[520px]:hidden">{regularHomeworks.length > 1 ? `${regularHomeworks.length} задания` : `Домашнее задание: ${regularHomeworks[0].description}`}</span>
                </div>
            )}
            {specializedHomeworks.length > 0 && (
                <div className="mt-1 flex flex-row items-center">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="16px" width="16px" className={`flex-none ml-2.5 mr-1 ${specializedHomeworks[0].completions[0]?.isCompleted ? 'text-green-600' : 'text-gray-700'}`} xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 80c-8.66 0-16.58 7.36-16 16l8 216a8 8 0 0 0 8 8h0a8 8 0 0 0 8-8l8-216c.58-8.64-7.34-16-16-16z"></path><circle cx="256" cy="416" r="16" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle></svg>
                    <span className="max-[520px]:hidden">{specializedHomeworks.length === 1 ? `Дополнительное домашнее задание: ${specializedHomeworks[0].description}` : `${specializedHomeworks.length} дополнительных заданий`}</span>
                    <span className="min-[520px]:hidden">{specializedHomeworks.length > 1 ? `${specializedHomeworks.length} дополнительных заданий` : `Дополнительное домашнее задание: ${specializedHomeworks[0].description}`}</span>
                </div>
            )}
            {regularHomeworks.length === 0 && specializedHomeworks.length === 0 && (
                <div className="flex flex-row items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="flex-none ml-2.5 mr-1 relative text-green-600"><path fill="currentColor" d="M13.167 14.333h-3a.833.833 0 0 1-.834-.833v-3a.666.666 0 0 0-.666-.667H7.333a.666.666 0 0 0-.666.667v3c0 .46-.373.833-.834.833h-3A.833.833 0 0 1 2 13.5V7.138a2.5 2.5 0 0 1 .953-1.965L7.69 1.44a.5.5 0 0 1 .62 0l4.737 3.733A2.5 2.5 0 0 1 14 7.137V13.5c0 .46-.373.833-.834.833"></path></svg>
                    <span>Домашнее задание не задано</span>
                </div>
            )}
        </>
    );
};