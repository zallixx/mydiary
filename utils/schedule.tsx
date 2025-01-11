import { Homework, studyResourcesType } from '@prisma/client';
import * as React from 'react';
import {
    homeworkProps,
    itemProps,
    lessonComponentsProps,
    specificAssignmentsProps,
    weekOptionsProps,
    weekProps
} from '@/types/schedule';

const today = new Date();
const timezoneOffset = today.getTimezoneOffset() * 60000;

const todayLocal = new Date(today.getTime() - timezoneOffset);
todayLocal.setUTCHours(0, 0, 0, 0);
const dayNamesLong = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const currentYear = todayLocal.getFullYear();
const startDateDayPicker = new Date(currentYear-1, 8, 1);
const endDateDayPicker = new Date(currentYear+1, 4, 31);
const dayNamesShort = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const monthNames = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

const validateDate = (inputDate: Date): string | boolean => {
    const dayDifference = Math.round((inputDate.getTime() - todayLocal.getTime()) / (24 * 60 * 60 * 1000));

    switch (dayDifference) {
        case -2:
            return "Позавчера";
        case -1:
            return "Вчера";
        case 0:
            return "Сегодня";
        case 1:
            return "Завтра";
        case 2:
            return "Послезавтра";
        default:
            return dayNamesLong[inputDate.getUTCDay()] + ' ' + inputDate.toLocaleString("ru-RU", {month: "short", day: "numeric" });
    }
};

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

const setIndexForGrade = (item: string): string => {
    switch (item) {
        case 'Олимпиада':
            return '3';
        case 'Контрольная работа':
            return '2';
        default:
            return '';
    }
};

const currentTimeInItemRange = (itemTime: Date, itemDate: Date, duration: number): boolean => {
    return (todayLocal.getHours() >= itemTime.getHours() && todayLocal.getHours() < (itemTime.getHours() + duration * 60000)) && todayLocal.getDate() === itemDate.getDate();
};

const getLessonTime = (date: Date, duration: number): string => {
    const itemDate = new Date(date);
    return itemDate.getUTCHours().toString().padStart(2, '0') + ':' + itemDate.getUTCMinutes().toString().padStart(2, '0') + ' - ' + new Date(itemDate.getTime() + duration * 60000).getUTCHours().toString().padStart(2, '0') + ':' + new Date(itemDate.getTime() + duration * 60000).getUTCMinutes().toString().padStart(2, '0');
};

const countHomeworkWithParam = (homeworkList: Homework[], param: string): number => {
    return homeworkList.reduce((count: number, homework: Homework) => {
        switch (param) {
            case 'Test':
                // @ts-ignore
                return count + homework.attachments.filter(att => att.type === studyResourcesType.TEST).length;
            case 'Theory':
                // @ts-ignore
                return count + homework.attachments.filter(att => att.type === studyResourcesType.THEORY || att.type === studyResourcesType.PRESENTATION || att.type === studyResourcesType.VIDEO).length;
            case 'File':
                // @ts-ignore
                return count + homework.fileAtachments?.length;
            default:
                return count;
        }
    }, 0);
};

const defineEventType = (item: string): string | undefined => {
    switch (item) {
        case 'OLYMPIAD':
            return 'Олимпиада / Учебное';
        case 'LESSON':
            return 'Урок / Учебное';
        case 'EXAM':
            return 'Экзамен / Учебное';
        case 'OTHER':
            return 'Другое';
        default:
            return undefined;
    }
};

const defineAbsenceType = (item: string): string | undefined => {
    switch (item) {
        case 'UNAUTHORIZED':
            return 'Отсутствие без уведомления';
        case 'SICK':
            return 'Больничный';
        case 'AUTHORIZED':
            return 'Отсутствие с уведомлением';
        case 'EXEMPT':
            return 'Освобождение';
        default:
            return undefined;
    }
};

const createLessonComponents = (item: itemProps): lessonComponentsProps[] => {
    return [
        {
            title: item.event_type === 'LESSON' ? "Об уроке:" : "О мероприятии",
            children: [
                {
                    sub_title: "Тип мероприятия",
                    svg: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info mr-1">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 16v-4"/>
                            <path d="M12 8h.01"/>
                        </svg>
                    ),
                    description: defineEventType(item.event_type),
                },
                {
                    sub_title: "Место проведения",
                    svg: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin mr-1">
                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                    ),
                    description: item.place + '',
                },
            ],
        },
        {
            title: "Преподаватель",
            children: [
                {
                    description: item.baseSchedule.teacher.name,
                },
            ],
        },
        {
            title: "Домашние задания",
            children: [
                {
                    homeworkList: item.homework,
                },
            ]
        },
        {
            title: "Личные задания",
            children: [
                {
                    specificAssignments: item.specificAssignment,
                },
            ]
        },
        {
            title: "Результаты урока",
            children: [
                {
                    assessment: item.assessment,
                },
            ]
        },
        {
            title: "Пропуск",
            children: [
                {
                    absence: item.absence,
                }
            ]
        }
    ];
};

const getTodayString = (): string => {
    return `${todayLocal.getFullYear()}-${String(todayLocal.getMonth() + 1).padStart(2, '0')}-${String(todayLocal.getDate()).padStart(2, '0')}`;
};

const generateWeeks = (): weekProps[][] => {
    if (typeof window !== 'undefined') {
        const cachedWeeks = localStorage.getItem(`weeks_${currentYear}`);
        if (cachedWeeks) {
            return JSON.parse(cachedWeeks);
        }
    }

    const weeks = [];
    let currentDate = new Date(startDateDayPicker);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + 1;
    currentDate = new Date(currentDate.setDate(diff));

    while (currentDate <= endDateDayPicker) {
        const week = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentDate);
            week.push({
                short: dayNamesShort[i],
                num: date.getDate().toString().padStart(2, '0'),
                full: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
                month: date.getMonth(),
                year: date.getFullYear()
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        weeks.push(week);
    }

    if (typeof window !== 'undefined') {
        localStorage.setItem(`weeks_${currentYear}`, JSON.stringify(weeks));
    }

    return weeks;
};

const generateWeekOptions = (weeks: weekProps[][]): weekOptionsProps[] => {
    if (typeof window !== 'undefined') {
        const cachedOptions = localStorage.getItem(`weekOptions_${currentYear}`);
        if (cachedOptions) {
            return JSON.parse(cachedOptions);
        }
    }

    const weekOptions = weeks.map((week, index) => {
        const startDay = week[0];
        const endDay = week[6];
        const optionValue = index.toString();
        const optionLabel = startDay.month === endDay.month
            ? `${startDay.num}-${endDay.num} ${monthNames[startDay.month]}`
            : `${startDay.num} ${monthNames[startDay.month]} - ${endDay.num} ${monthNames[endDay.month]}`;
        return {value: optionValue, label: optionLabel};
    });

    if (typeof window !== 'undefined') {
        localStorage.setItem(`weekOptions_${currentYear}`, JSON.stringify(weekOptions));
    }

    return weekOptions;
};

async function updateTaskStatus(assignment: specificAssignmentsProps | null, homework: homeworkProps | null) {
    try {
        const response = await fetch('/api/updateTaskStatus/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ assignment, homework }),
        });
        if (response.ok) {
            const data = await response.json();
            if (assignment) {
                assignment.completions[0] = data;
                return assignment;
            }
            if (homework) {
                homework.completions[0] = data;
                return homework;
            }
        }
    } catch (error) {
        console.log(error);
    }
    return null;
}

export { validateDate, setPropForItem, setIndexForGrade, currentTimeInItemRange, countHomeworkWithParam, getLessonTime, defineEventType, defineAbsenceType, createLessonComponents, getTodayString, generateWeeks, generateWeekOptions, updateTaskStatus };